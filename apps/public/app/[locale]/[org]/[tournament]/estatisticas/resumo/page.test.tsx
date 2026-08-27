import { render, screen, within } from '@testing-library/react';
import {
  ApiError,
  getFixedPlayerStatsTablesByFilter,
  getTournamentBySlug
} from '@gochamps/api-client';
import { notFound } from 'next/navigation';
import PlayerStatsSummaryPage, { generateMetadata, revalidate } from './page';
import { SITE_URL } from '@/src/seo/metadata';

jest.mock('@gochamps/api-client', () => ({
  ...jest.requireActual('@gochamps/api-client'),
  getFixedPlayerStatsTablesByFilter: jest.fn(),
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
          (message, [name, value]) => message.replace(`{${name}}`, value),
          messageAt(dictionary, key) as string
        ),
      { raw: (key: string) => messageAt(dictionary, key) }
    );
  }
}));

const getTournamentBySlugMock = getTournamentBySlug as jest.Mock;
const getFixedPlayerStatsTablesByFilterMock =
  getFixedPlayerStatsTablesByFilter as jest.Mock;

const team = (id: string, name: string, overrides = {}) => ({
  id,
  name,
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: [],
  ...overrides
});

const player = (id: string, name: string, teamId: string, overrides = {}) => ({
  id,
  name,
  shirtName: '',
  shirtNumber: '',
  teamId,
  photoUrl: '',
  licenseNumber: '',
  ...overrides
});

const playerStat = (id: string, title: string) => ({
  id,
  title,
  slug: title.toLowerCase(),
  visibility: 'public'
});

const fixedStatsTable = (id: string, statId: string, overrides = {}) => ({
  id,
  statId,
  playerStats: [],
  ...overrides
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
  tournament: 'torneio-teste'
});

const renderPage = async () => render(await PlayerStatsSummaryPage({ params }));

describe('PlayerStatsSummaryPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getFixedPlayerStatsTablesByFilterMock.mockResolvedValue([]);
  });

  it('renders a leaderboard card title and a ranked entry player, team and value', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        players: [player('p1', 'Camisa Um', 't1')],
        playerStats: [playerStat('stat1', 'Pontos')]
      })
    );
    getFixedPlayerStatsTablesByFilterMock.mockResolvedValue([
      fixedStatsTable('ft1', 'stat1', {
        playerStats: [{ id: 'r1', playerId: 'p1', value: '22' }]
      })
    ]);

    await renderPage();

    const card = screen.getByTestId('leaderboard-card');
    expect(within(card).getByText('Pontos')).toBeInTheDocument();
    expect(within(card).getByText('Camisa Um')).toBeInTheDocument();
    expect(within(card).getByText('Time A')).toBeInTheDocument();
    expect(within(card).getByText('22')).toBeInTheDocument();
  });

  it('asks for the fixed stats tables of the tournament', async () => {
    await renderPage();

    expect(getFixedPlayerStatsTablesByFilterMock).toHaveBeenCalledWith({
      tournamentId: 'tour1'
    });
  });

  it('links each ranked entry to its player page', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        players: [player('p1', 'Camisa Um', 't1')],
        playerStats: [playerStat('stat1', 'Pontos')]
      })
    );
    getFixedPlayerStatsTablesByFilterMock.mockResolvedValue([
      fixedStatsTable('ft1', 'stat1', {
        playerStats: [{ id: 'r1', playerId: 'p1', value: '22' }]
      })
    ]);

    await renderPage();

    expect(screen.getByRole('link', { name: 'Camisa Um' })).toHaveAttribute(
      'href',
      '/pt/org/torneio-teste/jogadores/p1'
    );
  });

  it('renders a stale entry (no matching player) as plain text, not an empty link', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        players: [],
        playerStats: [playerStat('stat1', 'Pontos')]
      })
    );
    getFixedPlayerStatsTablesByFilterMock.mockResolvedValue([
      fixedStatsTable('ft1', 'stat1', {
        playerStats: [{ id: 'r1', playerId: 'stale', value: '22' }]
      })
    ]);

    await renderPage();

    expect(
      screen.queryByRole('link', { name: '' })
    ).not.toBeInTheDocument();
    expect(screen.queryAllByRole('link')).toHaveLength(2);
  });

  it('renders the player column header label', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        players: [player('p1', 'Camisa Um', 't1')],
        playerStats: [playerStat('stat1', 'Pontos')]
      })
    );
    getFixedPlayerStatsTablesByFilterMock.mockResolvedValue([
      fixedStatsTable('ft1', 'stat1', {
        playerStats: [{ id: 'r1', playerId: 'p1', value: '22' }]
      })
    ]);

    await renderPage();

    expect(screen.getByText('Jogador')).toBeInTheDocument();
  });

  it('renders the empty state when there are no fixed stats tables', async () => {
    await renderPage();

    expect(screen.queryByTestId('leaderboard-card')).not.toBeInTheDocument();
    expect(
      screen.getByText('Sem estatísticas para este campeonato ainda.')
    ).toBeInTheDocument();
  });

  it('links back to the full stats table page', async () => {
    await renderPage();

    expect(screen.getByRole('link', { name: 'Ver tabela completa' })).toHaveAttribute(
      'href',
      '/pt/org/torneio-teste/estatisticas'
    );
  });

  it('renders a 404 when the tournament does not exist', async () => {
    getTournamentBySlugMock.mockRejectedValue(
      new ApiError({ status: 404, data: null })
    );

    await expect(renderPage()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('revalidates the page instead of rendering it per request', () => {
    expect(revalidate).toBeGreaterThan(0);
  });
});

describe('generateMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getTournamentBySlugMock.mockResolvedValue(tournament());
  });

  it('titles the page with the tournament and canonicalizes the locale url', async () => {
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toContain('Torneio Teste');
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/pt/org/torneio-teste/estatisticas/resumo`
    );
    expect(metadata.robots).toBeUndefined();
  });

  it('keeps a missing tournament out of the index', async () => {
    getTournamentBySlugMock.mockRejectedValue(
      new ApiError({ status: 404, data: null })
    );

    const metadata = await generateMetadata({ params });

    expect(metadata.robots).toEqual({ index: false });
  });
});
