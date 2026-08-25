import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ApiError,
  getGamesByFilter,
  getTournamentBySlug
} from '@gochamps/api-client';
import { notFound } from 'next/navigation';
import TeamPage, { generateMetadata, revalidate } from './page';
import { SITE_URL } from '@/src/seo/metadata';

jest.mock('@gochamps/api-client', () => ({
  ...jest.requireActual('@gochamps/api-client'),
  getGamesByFilter: jest.fn(),
  getTournamentBySlug: jest.fn()
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  })
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async (input: string | { namespace: string }) => {
    const namespace = typeof input === 'string' ? input : input.namespace;
    const dictionary = (
      require('@/messages/pt.json') as Record<string, Record<string, string>>
    )[namespace];

    return (key: string, values?: Record<string, string>) =>
      Object.entries(values || {}).reduce(
        (message, [name, value]) => message.replace(`{${name}}`, value),
        dictionary[key]
      );
  }
}));

const getTournamentBySlugMock = getTournamentBySlug as jest.Mock;
const getGamesByFilterMock = getGamesByFilter as jest.Mock;

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
    expect(screen.getByTestId('games')).toBeVisible();
  });
});

describe('generateMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getTournamentBySlugMock.mockResolvedValue(tournament());
    getGamesByFilterMock.mockResolvedValue([]);
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
