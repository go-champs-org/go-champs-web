import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ApiError,
  getAggregatedPlayerStatsByFilter,
  getPlayer,
  getSportBySlug,
  getTournamentBySlug
} from '@gochamps/api-client';
import { notFound } from 'next/navigation';
import PlayerPage, { generateMetadata, revalidate } from './page';
import { SITE_URL } from '@/src/seo/metadata';

jest.mock('@gochamps/api-client', () => ({
  ...jest.requireActual('@gochamps/api-client'),
  getAggregatedPlayerStatsByFilter: jest.fn(),
  getPlayer: jest.fn(),
  getSportBySlug: jest.fn(),
  getTournamentBySlug: jest.fn()
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  })
}));

interface Messages {
  [key: string]: string | Messages;
}

// The team namespace nests the column abbreviations, so the stand-in has to
// walk a dotted key the way next-intl does, and answer `raw` with the node it
// lands on rather than a formatted string.
const messageAt = (dictionary: Messages, key: string): unknown =>
  key
    .split('.')
    .reduce<unknown>((node, part) => (node as Messages)[part], dictionary);

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async (input: string | { namespace: string }) => {
    const namespace = typeof input === 'string' ? input : input.namespace;
    const dictionary = (require('@/messages/pt.json') as Messages)[
      namespace
    ] as Messages;

    return Object.assign(
      (key: string, values?: Record<string, string>) =>
        Object.entries(values || {}).reduce(
          (message, [name, value]) => message.replace(`{${name}}`, value),
          messageAt(dictionary, key) as string
        ),
      { raw: (key: string) => messageAt(dictionary, key) }
    );
  }
}));

const getPlayerMock = getPlayer as jest.Mock;
const getTournamentBySlugMock = getTournamentBySlug as jest.Mock;
const getSportBySlugMock = getSportBySlug as jest.Mock;
const getAggregatedPlayerStatsByFilterMock =
  getAggregatedPlayerStatsByFilter as jest.Mock;

const team = (id: string, name: string, overrides = {}) => ({
  id,
  name,
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: [],
  ...overrides
});

const player = (id: string, name: string, overrides = {}) => ({
  id,
  name,
  shirtName: '',
  shirtNumber: '',
  teamId: 't2',
  photoUrl: '',
  licenseNumber: '',
  ...overrides
});

const playerStat = (slug: string, title: string) => ({
  id: `stat-${slug}`,
  title,
  slug,
  visibility: 'public'
});

const sportStatistic = (slug: string, scope: string) => ({
  slug,
  name: slug,
  level: 'tournament',
  scope,
  valueType: 'calculated'
});

const sport = (overrides = {}) => ({
  slug: 'basketball_5x5',
  name: 'Basquete 5x5',
  playerStatistics: [
    sportStatistic('points', 'aggregate'),
    sportStatistic('rebounds', 'aggregate'),
    sportStatistic('points_per_game', 'per_game')
  ],
  ...overrides
});

const statsLog = (playerId: string, stats: Record<string, string>) => ({
  id: `log-${playerId}`,
  playerId,
  stats
});

const tournament = (overrides = {}) => ({
  id: 'tour1',
  name: 'Torneio Teste',
  slug: 'torneio-teste',
  logoUrl: '',
  sportSlug: 'basketball_5x5',
  sportName: 'Basquete 5x5',
  playerStats: [],
  scoreboardSetting: { liveSiteUpdate: 'full-live-update' },
  teams: [team('t1', 'Time A'), team('t2', 'Time B')],
  players: [],
  ...overrides
});

const params = Promise.resolve({
  locale: 'pt',
  org: 'org',
  tournament: 'torneio-teste',
  playerId: 'p1'
});

const renderPage = async () => render(await PlayerPage({ params }));

describe('PlayerPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPlayerMock.mockResolvedValue(player('p1', 'Jogador Um'));
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getSportBySlugMock.mockResolvedValue(sport());
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([]);
  });

  it('renders the player name in the banner', async () => {
    await renderPage();

    expect(
      screen.getByRole('heading', { name: 'Jogador Um' })
    ).toBeInTheDocument();
  });

  it('links back to the tournament page on the CMS', async () => {
    await renderPage();

    expect(screen.getByRole('link', { name: 'Torneio Teste' })).toHaveAttribute(
      'href',
      expect.stringContaining('/org/torneio-teste')
    );
  });

  it('shows the team, shirt number and shirt name in the subtitle', async () => {
    getPlayerMock.mockResolvedValue(
      player('p1', 'Jogador Um', { shirtNumber: '23', shirtName: 'JU' })
    );

    await renderPage();

    expect(screen.getByTestId('player-banner')).toHaveTextContent(
      'Time B | #23 | JU'
    );
  });

  it('renders no subtitle line for a player with nothing to show in it', async () => {
    getPlayerMock.mockResolvedValue(
      player('p1', 'Jogador Um', { teamId: 'unknown-team' })
    );

    await renderPage();

    expect(screen.queryByTestId('player-shirt-line')).not.toBeInTheDocument();
  });

  it('renders a photo when the player has one', async () => {
    getPlayerMock.mockResolvedValue(
      player('p1', 'Jogador Um', { photoUrl: 'https://cdn/p1.png' })
    );

    await renderPage();

    expect(
      within(screen.getByTestId('player-banner')).getByRole('presentation')
    ).toHaveAttribute('src', 'https://cdn/p1.png');
  });

  it('renders an initial avatar instead of a broken image when there is no photo', async () => {
    await renderPage();

    expect(
      within(screen.getByTestId('player-banner')).queryByRole('presentation')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('player-banner')).toHaveTextContent('J');
  });

  it('links each social handle the player filled in', async () => {
    getPlayerMock.mockResolvedValue(
      player('p1', 'Jogador Um', { instagram: 'jogador.um', twitter: 'jum' })
    );

    await renderPage();

    const links = within(screen.getByTestId('player-social-links')).getAllByRole(
      'link'
    );
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://instagram.com/jogador.um');
    expect(links[1]).toHaveAttribute('href', 'https://twitter.com/jum');
  });

  it('renders no social row when the player filled in no handle', async () => {
    await renderPage();

    expect(
      screen.queryByTestId('player-social-links')
    ).not.toBeInTheDocument();
  });

  it('renders a 404 when the player does not exist', async () => {
    getPlayerMock.mockRejectedValue(new ApiError({ status: 404, data: null }));

    await expect(renderPage()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('still renders the player when the tournament cannot be found', async () => {
    getTournamentBySlugMock.mockRejectedValue(
      new ApiError({ status: 404, data: null })
    );

    await renderPage();

    expect(
      screen.getByRole('heading', { name: 'Jogador Um' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voltar para o campeonato' })).toBeInTheDocument();
  });

  it('revalidates the page instead of rendering it per request', () => {
    expect(revalidate).toBeGreaterThan(0);
  });
});

describe('PlayerPage aggregated stats', () => {
  const withPlayerStats = () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        playerStats: [
          playerStat('points', 'Pontos'),
          playerStat('rebounds', 'Rebotes'),
          playerStat('points_per_game', 'Pontos por jogo')
        ]
      })
    );
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([
      statsLog('p1', { points: '18', rebounds: '7', points_per_game: '9.5' })
    ]);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getPlayerMock.mockResolvedValue(player('p1', 'Jogador Um'));
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getSportBySlugMock.mockResolvedValue(sport());
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([]);
  });

  it('asks for the aggregated stats of that player alone', async () => {
    await renderPage();

    expect(getAggregatedPlayerStatsByFilterMock).toHaveBeenCalledWith({
      tournamentId: 'tour1',
      playerId: 'p1'
    });
  });

  it('renders a tile for each visible statistic, abbreviated by the sport', async () => {
    withPlayerStats();

    await renderPage();

    const tiles = screen.getByTestId('player-stat-tiles');
    expect(tiles).toHaveTextContent('PTS');
    expect(tiles).toHaveTextContent('18');
    expect(tiles).toHaveTextContent('REB');
    expect(tiles).toHaveTextContent('7');
  });

  it('switches the tiles to the per game averages', async () => {
    withPlayerStats();

    await renderPage();
    await userEvent.click(screen.getByRole('button', { name: 'Por jogo' }));

    const tiles = screen.getByTestId('player-stat-tiles');
    expect(tiles).toHaveTextContent('9.5');
    expect(tiles).not.toHaveTextContent('18');
  });

  it('offers no scope filter to a tournament that publishes a single scope', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({ playerStats: [playerStat('points', 'Pontos')] })
    );
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([
      statsLog('p1', { points: '18' })
    ]);

    await renderPage();

    expect(
      screen.queryByTestId('player-stats-scope')
    ).not.toBeInTheDocument();
  });

  it('keeps the glossary closed until the visitor asks for it', async () => {
    withPlayerStats();

    await renderPage();

    expect(screen.getByTestId('player-stats-glossary')).not.toBeVisible();
  });

  it('spells out every abbreviation once the glossary is open', async () => {
    withPlayerStats();

    await renderPage();
    await userEvent.click(screen.getByRole('button', { name: 'Glossário' }));

    const glossary = screen.getByTestId('player-stats-glossary');
    expect(glossary).toBeVisible();
    expect(
      within(glossary)
        .getAllByRole('listitem')
        .map(item => item.textContent)
    ).toEqual(['PTS - Pontos', 'REB - Rebotes']);
  });

  it('shows a muted message instead of the island when the player has no log', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({ playerStats: [playerStat('points', 'Pontos')] })
    );

    await renderPage();

    expect(
      screen.getByText('Sem estatísticas para este atleta ainda.')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('player-stat-tiles')).not.toBeInTheDocument();
  });

  it('shows the muted message when the tournament has no statistic catalogue', async () => {
    // A log with a real number, but a tournament that names no statistic at
    // all: there is no column left for the island to switch between.
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([
      statsLog('p1', { points: '18' })
    ]);

    await renderPage();

    expect(
      screen.getByText('Sem estatísticas para este atleta ainda.')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('player-stat-tiles')).not.toBeInTheDocument();
  });

  it('shows the muted message instead of the island when the tournament cannot be found', async () => {
    getTournamentBySlugMock.mockRejectedValue(
      new ApiError({ status: 404, data: null })
    );

    await renderPage();

    expect(
      screen.getByText('Sem estatísticas para este atleta ainda.')
    ).toBeInTheDocument();
  });
});

describe('generateMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPlayerMock.mockResolvedValue(player('p1', 'Jogador Um'));
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getSportBySlugMock.mockResolvedValue(sport());
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([]);
  });

  it('titles the page with the player and canonicalizes the locale url', async () => {
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toContain('Jogador Um');
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/pt/org/torneio-teste/jogadores/p1`
    );
    expect(metadata.robots).toBeUndefined();
  });

  it('keeps a missing player out of the index', async () => {
    getPlayerMock.mockRejectedValue(new ApiError({ status: 404, data: null }));

    const metadata = await generateMetadata({ params });

    expect(metadata.robots).toEqual({ index: false });
  });
});
