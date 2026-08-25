import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ApiError,
  getAggregatedPlayerStatsByFilter,
  getGamesByFilter,
  getSportBySlug,
  getTournamentBySlug
} from '@gochamps/api-client';
import { notFound } from 'next/navigation';
import TeamPage, { generateMetadata, revalidate } from './page';
import { SITE_URL } from '@/src/seo/metadata';

jest.mock('@gochamps/api-client', () => ({
  ...jest.requireActual('@gochamps/api-client'),
  getAggregatedPlayerStatsByFilter: jest.fn(),
  getGamesByFilter: jest.fn(),
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

const getTournamentBySlugMock = getTournamentBySlug as jest.Mock;
const getGamesByFilterMock = getGamesByFilter as jest.Mock;
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

const game = (id: string, datetime: string, overrides = {}) => ({
  id,
  datetime,
  homeTeam: team('t2', 'Time B'),
  awayTeam: team('t1', 'Time A'),
  homePlaceholder: '',
  awayPlaceholder: '',
  homeScore: 0,
  awayScore: 0,
  info: '',
  isFinished: false,
  location: '',
  city: '',
  number: '',
  phaseId: 'ph1',
  youTubeCode: '',
  liveState: '',
  resultType: '',
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
  teamId: 't2'
});

const renderPage = async () => render(await TeamPage({ params }));

describe('TeamPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getGamesByFilterMock.mockResolvedValue([]);
    getSportBySlugMock.mockResolvedValue(sport());
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([]);
  });

  it('renders the team name from the tournament roster', async () => {
    await renderPage();

    expect(screen.getByText('Time B')).toBeInTheDocument();
  });

  it('links back to the tournament page on the CMS', async () => {
    await renderPage();

    expect(screen.getByRole('link', { name: 'Torneio Teste' })).toHaveAttribute(
      'href',
      expect.stringContaining('/org/torneio-teste')
    );
  });

  it('renders the coaching staff', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        teams: [
          team('t2', 'Time B', {
            coaches: [{ id: 'c1', name: 'Treinador Um', type: 'head_coach' }]
          })
        ]
      })
    );

    await renderPage();

    expect(screen.getByText('Treinador Um')).toBeInTheDocument();
  });

  it('renders no label element for a coach type it cannot label', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        teams: [
          team('t2', 'Time B', {
            coaches: [{ id: 'c1', name: 'Preparador', type: 'strength_coach' }]
          })
        ]
      })
    );

    await renderPage();

    const coachRow = screen.getByText('Preparador').closest('li');
    expect(coachRow?.children).toHaveLength(1);
  });

  it('renders the roster of that team, in shirt number order', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        players: [
          player('p10', 'Camisa Dez', { shirtNumber: '10' }),
          player('p4', 'Camisa Quatro', { shirtNumber: '4' }),
          player('other', 'Jogador do Time A', { teamId: 't1' })
        ]
      })
    );

    await renderPage();

    const rosterNames = screen
      .getAllByTestId('roster-player-name')
      .map(cell => cell.textContent);
    expect(rosterNames).toEqual(['Camisa Quatro', 'Camisa Dez']);
    expect(screen.queryByText('Jogador do Time A')).not.toBeInTheDocument();
  });

  it('omits the roster section when the team has no players', async () => {
    await renderPage();

    expect(screen.queryByTestId('roster')).not.toBeInTheDocument();
  });

  it('renders a 404 when the tournament has no team with that id', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({ teams: [team('t1', 'Time A')] })
    );

    await expect(renderPage()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('renders a 404 when the tournament does not exist', async () => {
    getTournamentBySlugMock.mockRejectedValue(
      new ApiError({ status: 404, data: null })
    );

    await expect(renderPage()).rejects.toThrow('NEXT_NOT_FOUND');
  });

  it('asks for every game the team plays, at home or away', async () => {
    await renderPage();

    expect(getGamesByFilterMock).toHaveBeenCalledWith({
      or: [{ home_team_id: 't2' }, { away_team_id: 't2' }]
    });
  });

  it('renders the games grouped by date, most recent day first', async () => {
    getGamesByFilterMock.mockResolvedValue([
      game('g1', '2026-08-12T21:00:00Z'),
      game('g2', '2026-08-20T22:00:00Z')
    ]);

    await renderPage();

    const days = screen
      .getAllByTestId('games-day')
      .map(day => day.textContent || '');
    expect(days).toHaveLength(2);
    expect(days[0]).toContain('20 de agosto de 2026');
    expect(days[1]).toContain('12 de agosto de 2026');
  });

  it('links each game to its page and shows the opponents and the score', async () => {
    getGamesByFilterMock.mockResolvedValue([
      game('g1', '2026-08-12T21:00:00Z', { homeScore: 88, awayScore: 74 })
    ]);

    await renderPage();

    const link = screen.getByTestId('game-row');
    expect(link).toHaveAttribute(
      'href',
      '/pt/org/torneio-teste/jogos/g1'
    );
    expect(link.textContent).toContain('Time A');
    expect(link.textContent).toContain('88');
    expect(link.textContent).toContain('74');
  });

  it('shows the crest of each side that has one', async () => {
    getGamesByFilterMock.mockResolvedValue([
      game('g1', '2026-08-12T21:00:00Z', {
        homeTeam: team('t2', 'Time B', { logoUrl: 'https://cdn/b.png' }),
        awayTeam: team('t1', 'Time A', { logoUrl: 'https://cdn/a.png' })
      })
    ]);

    await renderPage();

    const crests = within(screen.getByTestId('game-row')).getAllByRole(
      'presentation'
    );
    expect(crests.map(crest => crest.getAttribute('src'))).toEqual([
      'https://cdn/b.png',
      'https://cdn/a.png'
    ]);
  });

  // A team without a logo leaves the name alone rather than a broken image.
  it('renders no crest for a team without a logo', async () => {
    getGamesByFilterMock.mockResolvedValue([
      game('g1', '2026-08-12T21:00:00Z', {
        homeTeam: team('t2', 'Time B', { logoUrl: 'https://cdn/b.png' })
      })
    ]);

    await renderPage();

    expect(
      within(screen.getByTestId('game-row')).getAllByRole('presentation')
    ).toHaveLength(1);
  });

  it('marks the side that won the game', async () => {
    getGamesByFilterMock.mockResolvedValue([
      game('g1', '2026-08-12T21:00:00Z', {
        homeScore: 60,
        awayScore: 75,
        isFinished: true
      })
    ]);

    await renderPage();

    const row = within(screen.getByTestId('game-row'));
    expect(row.getByText('Vencedor').parentElement).toHaveTextContent(
      'Time A'
    );
  });

  it('marks the side a walkover was awarded to', async () => {
    getGamesByFilterMock.mockResolvedValue([
      game('g1', '2026-08-12T21:00:00Z', {
        resultType: 'home_team_walkover',
        isFinished: false
      })
    ]);

    await renderPage();

    const row = within(screen.getByTestId('game-row'));
    expect(row.getByText('Vencedor').parentElement).toHaveTextContent(
      'Time B'
    );
  });

  it('marks no winner while the game is undecided', async () => {
    getGamesByFilterMock.mockResolvedValue([
      game('g1', '2026-08-12T21:00:00Z', {
        homeScore: 60,
        awayScore: 75,
        isFinished: false
      }),
      game('g2', '2026-08-13T21:00:00Z', {
        homeScore: 70,
        awayScore: 70,
        isFinished: true
      })
    ]);

    await renderPage();

    expect(screen.queryByText('Vencedor')).not.toBeInTheDocument();
  });

  it('names an undecided opponent instead of leaving the row blank', async () => {
    getGamesByFilterMock.mockResolvedValue([
      game('g1', '2026-08-12T21:00:00Z', {
        awayTeam: team('', ''),
        awayPlaceholder: ''
      })
    ]);

    await renderPage();

    expect(screen.getByTestId('game-row').textContent).toContain('A definir');
  });

  // The roster is the page; an API that cannot answer the schedule must not
  // take it down with it.
  it('still renders the roster when the games request fails', async () => {
    getGamesByFilterMock.mockRejectedValue(new Error('network'));
    getTournamentBySlugMock.mockResolvedValue(
      tournament({ players: [player('p10', 'Camisa Dez', { shirtNumber: '10' })] })
    );

    await renderPage();

    expect(screen.getByTestId('roster')).toBeInTheDocument();
    expect(screen.queryByTestId('games')).not.toBeInTheDocument();
  });

  it('omits the games section when the team has no games', async () => {
    await renderPage();

    expect(screen.queryByTestId('games')).not.toBeInTheDocument();
  });

  it('revalidates the page instead of rendering it per request', () => {
    expect(revalidate).toBeGreaterThan(0);
  });
});

describe('TeamPage roster stats', () => {
  const withRosterStats = () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        players: [
          player('p4', 'Camisa Quatro', { shirtNumber: '4' }),
          player('p10', 'Camisa Dez', { shirtNumber: '10' })
        ],
        playerStats: [
          playerStat('points', 'Pontos'),
          playerStat('rebounds', 'Rebotes'),
          playerStat('points_per_game', 'Pontos por jogo')
        ]
      })
    );
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([
      statsLog('p4', { points: '10', rebounds: '8', points_per_game: '5.25' }),
      statsLog('p10', { points: '22', rebounds: '3', points_per_game: '11' })
    ]);
  };

  const rosterCells = (playerName: string) =>
    within(screen.getByText(playerName).closest('tr') as HTMLElement)
      .getAllByRole('cell')
      .map(cell => cell.textContent);

  const rosterOrder = () =>
    screen.getAllByTestId('roster-player-name').map(cell => cell.textContent);

  beforeEach(() => {
    jest.clearAllMocks();
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getGamesByFilterMock.mockResolvedValue([]);
    getSportBySlugMock.mockResolvedValue(sport());
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([]);
  });

  it('asks for the aggregated stats of that team alone', async () => {
    await renderPage();

    expect(getAggregatedPlayerStatsByFilterMock).toHaveBeenCalledWith({
      tournamentId: 'tour1',
      teamId: 't2'
    });
  });

  it('heads every column of the scope with the abbreviation of the sport', async () => {
    withRosterStats();

    await renderPage();

    const headers = within(screen.getByTestId('roster'))
      .getAllByRole('columnheader')
      .map(header => header.textContent);
    expect(headers).toEqual(['Nº', 'Nome', 'PTS', 'REB']);
  });

  it('renders the numbers of each player next to his name', async () => {
    withRosterStats();

    await renderPage();

    expect(rosterCells('Camisa Quatro')).toEqual(['4', 'Camisa Quatro', '10', '8']);
  });

  it('keeps a player the stats endpoint returned nothing for', async () => {
    withRosterStats();
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([
      statsLog('p4', { points: '10', rebounds: '8' })
    ]);

    await renderPage();

    expect(rosterCells('Camisa Dez')).toEqual(['10', 'Camisa Dez', '-', '-']);
  });

  it('ranks the roster by the column whose header was clicked', async () => {
    withRosterStats();

    await renderPage();
    await userEvent.click(screen.getByRole('button', { name: /Pontos/ }));

    expect(rosterOrder()).toEqual(['Camisa Dez', 'Camisa Quatro']);
  });

  it('turns the ranking around on a second click of the same column', async () => {
    withRosterStats();

    await renderPage();
    const pointsHeader = screen.getByRole('button', { name: /Pontos/ });
    await userEvent.click(pointsHeader);
    await userEvent.click(pointsHeader);

    expect(rosterOrder()).toEqual(['Camisa Quatro', 'Camisa Dez']);
  });

  it('switches the columns to the per game averages', async () => {
    withRosterStats();

    await renderPage();
    await userEvent.click(screen.getByRole('button', { name: 'Por jogo' }));

    expect(rosterCells('Camisa Quatro')).toEqual(['4', 'Camisa Quatro', '5.3']);
  });

  it('keeps the glossary closed until the visitor asks for it', async () => {
    withRosterStats();

    await renderPage();

    expect(screen.getByTestId('stats-glossary')).not.toBeVisible();
  });

  it('spells out every abbreviation once the glossary is open', async () => {
    withRosterStats();

    await renderPage();
    await userEvent.click(screen.getByRole('button', { name: 'Glossário' }));

    const glossary = screen.getByTestId('stats-glossary');
    expect(glossary).toBeVisible();
    expect(within(glossary).getAllByRole('listitem').map(item => item.textContent)).toEqual([
      'PTS - Pontos',
      'REB - Rebotes'
    ]);
  });

  it('offers no scope filter to a tournament that publishes a single scope', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        players: [player('p4', 'Camisa Quatro', { shirtNumber: '4' })],
        playerStats: [playerStat('points', 'Pontos')]
      })
    );

    await renderPage();

    expect(screen.queryByTestId('stats-scope')).not.toBeInTheDocument();
  });

  it('still lists the roster when the sport catalogue is unreachable', async () => {
    withRosterStats();
    getSportBySlugMock.mockRejectedValue(new Error('offline'));

    await renderPage();

    expect(rosterOrder()).toEqual(['Camisa Quatro', 'Camisa Dez']);
  });
});

describe('TeamPage tabs', () => {
  const withRosterAndGames = () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        players: [player('p10', 'Camisa Dez', { shirtNumber: '10' })]
      })
    );
    getGamesByFilterMock.mockResolvedValue([
      game('g1', '2026-08-12T21:00:00Z')
    ]);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.history.replaceState(null, '', '/');
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getGamesByFilterMock.mockResolvedValue([]);
    getSportBySlugMock.mockResolvedValue(sport());
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([]);
  });

  it('puts the tabs inside the banner, next to the logo and the name', async () => {
    withRosterAndGames();

    await renderPage();

    const banner = screen.getByTestId('team-banner');
    expect(within(banner).getByRole('heading', { name: 'Time B' })).toBeInTheDocument();
    expect(within(banner).getByRole('tablist')).toBeInTheDocument();
  });

  it('counts the games and the wins in the banner highlights', async () => {
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getGamesByFilterMock.mockResolvedValue([
      game('won', '2026-08-12T21:00:00Z', {
        homeScore: 80,
        awayScore: 70,
        isFinished: true
      }),
      game('lost', '2026-08-20T22:00:00Z', {
        homeScore: 60,
        awayScore: 75,
        isFinished: true
      })
    ]);

    await renderPage();

    const highlights = screen.getByTestId('team-highlights');

    expect(
      within(highlights).getByText('Jogos').closest('div')
    ).toHaveTextContent('2Jogos');
    expect(
      within(highlights).getByText('Vitórias').closest('div')
    ).toHaveTextContent('1Vitórias');
  });

  // A team with no players, no staff and no games is still a team: the banner
  // is the page, and nothing below it has to render.
  it('renders the banner for a team with nothing to show', async () => {
    await renderPage();

    expect(screen.getByTestId('team-banner')).toBeInTheDocument();
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
  });

  it('opens on the roster and keeps the games panel hidden', async () => {
    withRosterAndGames();

    await renderPage();

    expect(screen.getByRole('tab', { name: 'Elenco' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByTestId('roster')).toBeVisible();
    expect(screen.getByTestId('games')).not.toBeVisible();
  });

  it('swaps the panels when the games tab is clicked', async () => {
    withRosterAndGames();

    await renderPage();
    await userEvent.click(screen.getByRole('tab', { name: 'Jogos' }));

    expect(screen.getByTestId('games')).toBeVisible();
    expect(screen.getByTestId('roster')).not.toBeVisible();
  });

  // The CMS team view hands out #roster / #games links; they have to keep
  // landing on the tab they name.
  it('opens on the tab named in the url hash', async () => {
    withRosterAndGames();
    window.history.replaceState(null, '', '#games');

    await renderPage();

    expect(screen.getByTestId('games')).toBeVisible();
    expect(screen.getByTestId('roster')).not.toBeVisible();
  });

  it('leaves the clicked tab in the url so it can be shared', async () => {
    withRosterAndGames();

    await renderPage();
    await userEvent.click(screen.getByRole('tab', { name: 'Jogos' }));

    expect(window.location.hash).toBe('#games');
  });

  // A team with games but no roster has nothing to switch between.
  it('renders no tablist when the team has a single section', async () => {
    getGamesByFilterMock.mockResolvedValue([
      game('g1', '2026-08-12T21:00:00Z')
    ]);

    await renderPage();

    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    // Nothing labels a panel when no tab bar was rendered, so the block keeps
    // no tab semantics either.
    expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
    expect(screen.getByTestId('games')).toBeVisible();
  });
});

describe('generateMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getGamesByFilterMock.mockResolvedValue([]);
    getSportBySlugMock.mockResolvedValue(sport());
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([]);
  });

  it('titles the page with the team and canonicalizes the locale url', async () => {
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toContain('Time B');
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/pt/org/torneio-teste/times/t2`
    );
    expect(metadata.robots).toBeUndefined();
  });

  it('keeps a missing team out of the index', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({ teams: [team('t1', 'Time A')] })
    );

    const metadata = await generateMetadata({ params });

    expect(metadata.robots).toEqual({ index: false });
  });
});
