import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ApiError,
  getPlayer,
  getPlayerStatsLogsByPlayer,
  getSportBySlug,
  getTournamentBySlug
} from '@gochamps/api-client';
import { notFound } from 'next/navigation';
import PlayerPage, { generateMetadata, revalidate } from './page';
import { SITE_URL } from '@/src/seo/metadata';

jest.mock('@gochamps/api-client', () => ({
  ...jest.requireActual('@gochamps/api-client'),
  getPlayer: jest.fn(),
  getPlayerStatsLogsByPlayer: jest.fn(),
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
          (message, [name, value]) => message.replace(`{${name}}`, String(value)),
          messageAt(dictionary, key) as string
        ),
      { raw: (key: string) => messageAt(dictionary, key) }
    );
  }
}));

const getPlayerMock = getPlayer as jest.Mock;
const getTournamentBySlugMock = getTournamentBySlug as jest.Mock;
const getSportBySlugMock = getSportBySlug as jest.Mock;
const getLogsMock = getPlayerStatsLogsByPlayer as jest.Mock;

const team = (id: string, name: string) => ({
  id,
  name,
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: []
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

const sportStatistic = (slug: string) => ({
  slug,
  name: slug,
  level: 'game',
  scope: 'aggregate',
  valueType: 'calculated'
});

const sport = (overrides = {}) => ({
  slug: 'basketball_5x5',
  name: 'Basquete 5x5',
  playerStatistics: [sportStatistic('points'), sportStatistic('rebounds')],
  ...overrides
});

const phase = (id: string, title: string, order: number) => ({
  id,
  title,
  type: 'elimination',
  order,
  isInProgress: false
});

const log = (phaseId: string, stats: Record<string, string>) => ({
  id: `log-${phaseId}-${Object.values(stats).join('-')}`,
  gameId: 'g',
  phaseId,
  playerId: 'p1',
  teamId: 't2',
  tournamentId: 'tour1',
  stats
});

const tournament = (overrides = {}) => ({
  id: 'tour1',
  name: 'Torneio Teste',
  slug: 'torneio-teste',
  logoUrl: '',
  sportSlug: 'basketball_5x5',
  sportName: 'Basquete 5x5',
  playerStats: [playerStat('points', 'Pontos'), playerStat('rebounds', 'Rebotes')],
  scoreboardSetting: { liveSiteUpdate: 'full-live-update' },
  teams: [team('t1', 'Time A'), team('t2', 'Time B')],
  players: [],
  phases: [phase('ph1', 'Classificação', 1), phase('ph2', 'Playoff', 2)],
  ...overrides
});

const withGames = () =>
  getLogsMock.mockResolvedValue([
    log('ph1', { points: '10' }),
    log('ph1', { points: '12' }),
    log('ph2', { points: '20' })
  ]);

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
    getLogsMock.mockResolvedValue([]);
  });

  it('renders the player name in the banner', async () => {
    await renderPage();

    expect(
      screen.getByRole('heading', { name: 'Jogador Um' })
    ).toBeInTheDocument();
  });

  it('trails a breadcrumb ending on the player profile', async () => {
    await renderPage();

    const crumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(crumb).getByRole('link', { name: 'Torneio Teste' })).toHaveAttribute(
      'href',
      expect.stringContaining('/org/torneio-teste')
    );
    expect(crumb).toHaveTextContent('Perfil do jogador');
  });

  it('names the team and games played in the banner subtitle', async () => {
    withGames();

    await renderPage();

    expect(screen.getByTestId('player-banner')).toHaveTextContent(
      'Time B · 3 jogos disputados'
    );
  });

  it('links the pill to the full athlete profile on the CMS', async () => {
    await renderPage();

    expect(
      screen.getByRole('link', { name: 'Ver perfil de atleta completo' })
    ).toHaveAttribute('href', expect.stringContaining('/org/torneio-teste/Player/p1'));
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
    expect(
      screen.getByRole('navigation', { name: 'Breadcrumb' })
    ).toHaveTextContent('Campeonato');
  });

  it('revalidates the page instead of rendering it per request', () => {
    expect(revalidate).toBeGreaterThan(0);
  });
});

describe('PlayerPage stats table', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPlayerMock.mockResolvedValue(player('p1', 'Jogador Um'));
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getSportBySlugMock.mockResolvedValue(sport());
    getLogsMock.mockResolvedValue([]);
  });

  it('asks for the player game logs by player id', async () => {
    await renderPage();

    expect(getLogsMock).toHaveBeenCalledWith('p1');
  });

  it('sums each stat per phase with a total row', async () => {
    withGames();

    await renderPage();

    const rows = within(screen.getByTestId('player-stats')).getAllByRole('row');
    // header + Classificação + Playoff + Total
    expect(rows).toHaveLength(4);
    expect(rows[1]).toHaveTextContent('Classificação');
    expect(rows[1]).toHaveTextContent('22');
    expect(rows[3]).toHaveTextContent('Total');
    expect(rows[3]).toHaveTextContent('42');
  });

  it('switches the phase rows to per game averages', async () => {
    withGames();

    await renderPage();
    await userEvent.click(screen.getByRole('button', { name: 'Por jogo' }));

    // Classificação: 22 points over 2 games.
    expect(
      within(screen.getByTestId('player-stats')).getAllByRole('row')[1]
    ).toHaveTextContent('11.0');
  });

  it('spells out every abbreviation once the glossary is open', async () => {
    withGames();

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

  it('shows a muted message instead of the table when the player never played', async () => {
    await renderPage();

    expect(
      screen.getByText('Sem estatísticas para este atleta ainda.')
    ).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});

describe('generateMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPlayerMock.mockResolvedValue(player('p1', 'Jogador Um'));
    getTournamentBySlugMock.mockResolvedValue(tournament());
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
