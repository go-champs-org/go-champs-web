import { render, screen, within } from '@testing-library/react';
import {
  ApiError,
  getAggregatedPlayerStatsByFilter,
  getSportBySlug,
  getTournamentBySlug
} from '@gochamps/api-client';
import { notFound } from 'next/navigation';
import PlayerStatsPage, { generateMetadata, revalidate } from './page';
import { SITE_URL } from '@/src/seo/metadata';

jest.mock('@gochamps/api-client', () => ({
  ...jest.requireActual('@gochamps/api-client'),
  getAggregatedPlayerStatsByFilter: jest.fn(),
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
          (message, [name, value]) => message.replace(`{${name}}`, value),
          messageAt(dictionary, key) as string
        ),
      { raw: (key: string) => messageAt(dictionary, key) }
    );
  }
}));

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
    sportStatistic('rebounds', 'aggregate')
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
  tournament: 'torneio-teste'
});

const renderPage = async () => render(await PlayerStatsPage({ params }));

describe('PlayerStatsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getSportBySlugMock.mockResolvedValue(sport());
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([]);
  });

  it('renders a visible player, team and stat value from the tournament roster', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        players: [player('p1', 'Camisa Um', 't1')],
        playerStats: [playerStat('points', 'Pontos')]
      })
    );
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([
      statsLog('p1', { points: '15' })
    ]);

    await renderPage();

    const row = within(screen.getByText('Camisa Um').closest('tr') as HTMLElement);
    expect(row.getByText('Camisa Um')).toBeInTheDocument();
    expect(row.getByText('Time A')).toBeInTheDocument();
    expect(row.getByText('15')).toBeInTheDocument();
  });

  it('asks for every log in the tournament, with no team or player filter', async () => {
    await renderPage();

    expect(getAggregatedPlayerStatsByFilterMock).toHaveBeenCalledWith({
      tournamentId: 'tour1'
    });
  });

  it('links each player to his player page', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({ players: [player('p1', 'Camisa Um', 't1')] })
    );
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([
      statsLog('p1', {})
    ]);

    await renderPage();

    expect(screen.getByRole('link', { name: 'Camisa Um' })).toHaveAttribute(
      'href',
      '/pt/org/torneio-teste/jogadores/p1'
    );
  });

  it('renders the empty state when the tournament has no players', async () => {
    await renderPage();

    expect(screen.queryByTestId('roster-player-name')).not.toBeInTheDocument();
    expect(
      screen.getByText('Sem estatísticas para este campeonato ainda.')
    ).toBeInTheDocument();
  });

  it('links back to the tournament page on the CMS', async () => {
    await renderPage();

    expect(screen.getByRole('link', { name: 'Torneio Teste' })).toHaveAttribute(
      'href',
      expect.stringContaining('/org/torneio-teste')
    );
  });

  it('links to the summary page', async () => {
    await renderPage();

    expect(screen.getByRole('link', { name: 'Ver líderes' })).toHaveAttribute(
      'href',
      '/pt/org/torneio-teste/estatisticas/resumo'
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
      `${SITE_URL}/org/torneio-teste/estatisticas`
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
