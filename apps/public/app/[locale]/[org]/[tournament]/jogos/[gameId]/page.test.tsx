import { render, screen } from '@testing-library/react';
import {
  ApiError,
  getGame,
  getPlayerStatsLogsByGame,
  getSportBySlug,
  getTeamStatsLogsByGame,
  getTournamentBySlug
} from '@gochamps/api-client';
import { notFound } from 'next/navigation';
import GamePage, { generateMetadata, revalidate } from './page';
import { SITE_URL } from '@/src/seo/metadata';
import messages from '@/messages/pt.json';

jest.mock('@gochamps/api-client', () => ({
  ...jest.requireActual('@gochamps/api-client'),
  getGame: jest.fn(),
  getPlayerStatsLogsByGame: jest.fn(),
  getSportBySlug: jest.fn(),
  getTeamStatsLogsByGame: jest.fn(),
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

const getGameMock = getGame as jest.Mock;
const getTournamentBySlugMock = getTournamentBySlug as jest.Mock;
const getPlayerStatsLogsByGameMock = getPlayerStatsLogsByGame as jest.Mock;
const getTeamStatsLogsByGameMock = getTeamStatsLogsByGame as jest.Mock;
const getSportBySlugMock = getSportBySlug as jest.Mock;

const team = (id: string, name: string) => ({
  id,
  name,
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: []
});

const game = (overrides = {}) => ({
  id: 'g1',
  assets: [],
  homeTeam: team('t1', 'Time Casa'),
  awayTeam: team('t2', 'Time Visitante'),
  homeScore: 82,
  awayScore: 74,
  datetime: '2026-08-01T23:00:00Z',
  location: 'Ginásio Municipal',
  city: 'São Paulo',
  isFinished: true,
  awayPlaceholder: '',
  homePlaceholder: '',
  info: '',
  number: '1',
  phaseId: 'ph1',
  youTubeCode: '',
  liveState: '',
  resultType: '',
  ...overrides
});

const params = Promise.resolve({
  locale: 'pt',
  org: 'org',
  tournament: 'torneio',
  gameId: 'g1'
});

const renderPage = async () => render(await GamePage({ params }));

const parsedStructuredData = (container: HTMLElement) =>
  JSON.parse(
    container.querySelector('script[type="application/ld+json"]')
      ?.textContent || 'null'
  );

describe('GamePage', () => {
  beforeEach(() => {
    getGameMock.mockReset();
    getTournamentBySlugMock.mockReset();
    getPlayerStatsLogsByGameMock.mockReset();
    getTeamStatsLogsByGameMock.mockReset();
    getSportBySlugMock.mockReset();
    getGameMock.mockResolvedValue(game());
    getTournamentBySlugMock.mockResolvedValue({
      id: 'tour1',
      name: 'Liga Teste',
      slug: 'torneio',
      logoUrl: '',
      teams: [],
      sportSlug: '',
      sportName: '',
      playerStats: [],
      players: [],
      scoreboardSetting: { liveSiteUpdate: 'full-live-update' }
    });
    // No box score by default: most tests are not about it, and the API
    // never carries logs for a game with none recorded yet.
    getPlayerStatsLogsByGameMock.mockResolvedValue([]);
    getTeamStatsLogsByGameMock.mockResolvedValue([]);
    getSportBySlugMock.mockResolvedValue(null);
  });

  it('renders both teams, the score and the venue', async () => {
    await renderPage();

    expect(screen.getByText('Time Casa')).toBeInTheDocument();
    expect(screen.getByText('Time Visitante')).toBeInTheDocument();
    expect(screen.getByTestId('home-score')).toHaveTextContent('82');
    expect(screen.getByTestId('away-score')).toHaveTextContent('74');
    expect(
      screen.getByText('Ginásio Municipal — São Paulo')
    ).toBeInTheDocument();
    expect(screen.getByText('01/08/2026, 20:00')).toBeInTheDocument();
  });

  it('reads each score out with the team it belongs to', async () => {
    await renderPage();

    expect(screen.getByLabelText('Time Casa: 82')).toBeInTheDocument();
    expect(screen.getByLabelText('Time Visitante: 74')).toBeInTheDocument();
  });

  it('serves the page from cache for a short window', () => {
    expect(revalidate).toBe(30);
  });

  it('links back to the tournament here, not across to the CMS', async () => {
    await renderPage();

    const link = screen.getByRole('link', { name: 'Liga Teste' });
    expect(link.getAttribute('href')).toBe('/pt/org/torneio');
  });

  it('still renders the game when the tournament cannot be loaded', async () => {
    getTournamentBySlugMock.mockRejectedValue(new Error('offline'));

    await renderPage();

    expect(
      screen.getByRole('link', { name: messages.game.backToTournament })
    ).toBeInTheDocument();
    expect(screen.getByText('Time Casa')).toBeInTheDocument();
  });

  it('names an undecided side by its bracket placeholder', async () => {
    getGameMock.mockResolvedValue(
      game({
        awayTeam: team('', ''),
        awayPlaceholder: 'Vencedor do jogo 3'
      })
    );

    await renderPage();

    expect(screen.getByText('Vencedor do jogo 3')).toBeInTheDocument();
  });

  it('marks a game in progress as live', async () => {
    getGameMock.mockResolvedValue(game({ liveState: 'in_progress' }));

    await renderPage();

    expect(screen.getByText(messages.game.live)).toBeInTheDocument();
  });

  it('renders the broadcast when the game has one', async () => {
    getGameMock.mockResolvedValue(game({ youTubeCode: 'abc123' }));

    await renderPage();

    expect(
      screen.getByTitle(messages.game.videoTitle).getAttribute('src')
    ).toBe('https://www.youtube.com/embed/abc123');
  });

  it('links to the FIBA scoresheet and box score when the game has them', async () => {
    getGameMock.mockResolvedValue(
      game({
        assets: [
          { id: 'a1', type: 'fiba-scoresheet', url: 'https://x/sumula.pdf' },
          { id: 'a2', type: 'fiba-boxscore', url: 'https://x/boxscore.pdf' }
        ]
      })
    );

    await renderPage();

    const scoresheetLink = screen.getByRole('link', {
      name: messages.game.assetFibaScoresheet
    });
    expect(scoresheetLink.getAttribute('href')).toBe('https://x/sumula.pdf');

    const boxscoreLink = screen.getByRole('link', {
      name: messages.game.assetFibaBoxscore
    });
    expect(boxscoreLink.getAttribute('href')).toBe('https://x/boxscore.pdf');
  });

  it('shows no asset links when the game has none', async () => {
    await renderPage();

    expect(
      screen.queryByText(messages.game.assetFibaScoresheet)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(messages.game.assetFibaBoxscore)
    ).not.toBeInTheDocument();
  });

  it('renders a 404 for a game that does not exist', async () => {
    getGameMock.mockRejectedValue(new ApiError({ status: 404, data: 'nope' }));

    await expect(renderPage()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('lets any other API failure surface instead of reporting a 404', async () => {
    getGameMock.mockRejectedValue(new ApiError({ status: 500, data: 'boom' }));

    await expect(renderPage()).rejects.toThrow('API error with status 500');
  });

  it('describes the game to search engines as a SportsEvent', async () => {
    const { container } = await renderPage();

    expect(parsedStructuredData(container)).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'SportsEvent',
      name: 'Time Casa x Time Visitante',
      url: `${SITE_URL}/pt/org/torneio/jogos/g1`,
      startDate: '2026-08-01T23:00:00Z',
      location: {
        '@type': 'Place',
        name: 'Ginásio Municipal — São Paulo'
      },
      homeTeam: { '@type': 'SportsTeam', name: 'Time Casa' },
      awayTeam: { '@type': 'SportsTeam', name: 'Time Visitante' }
    });
  });
});

describe('GamePage box score', () => {
  const playerStat = (slug: string, title: string) => ({
    id: `stat-${slug}`,
    title,
    slug,
    visibility: 'public'
  });

  const playerLog = (
    playerId: string,
    teamId: string,
    stats: Record<string, string>
  ) => ({
    id: `log-${playerId}`,
    gameId: 'g1',
    phaseId: 'ph1',
    playerId,
    teamId,
    tournamentId: 'tour1',
    stats
  });

  beforeEach(() => {
    getGameMock.mockReset();
    getTournamentBySlugMock.mockReset();
    getPlayerStatsLogsByGameMock.mockReset();
    getTeamStatsLogsByGameMock.mockReset();
    getSportBySlugMock.mockReset();
    getGameMock.mockResolvedValue(game());
    getTournamentBySlugMock.mockResolvedValue({
      id: 'tour1',
      name: 'Liga Teste',
      slug: 'torneio',
      logoUrl: '',
      teams: [],
      sportSlug: '',
      sportName: '',
      playerStats: [playerStat('points', 'Pontos')],
      players: [
        { id: 'p1', name: 'Ana Silva', shirtName: 'Ana', teamId: 't1' },
        { id: 'p2', name: 'Bia Souza', shirtName: '', teamId: 't2' }
      ],
      scoreboardSetting: { liveSiteUpdate: 'full-live-update' }
    });
    getSportBySlugMock.mockResolvedValue(null);
  });

  it('renders each side of a finished game with logs', async () => {
    getPlayerStatsLogsByGameMock.mockResolvedValue([
      playerLog('p1', 't1', { points: '20' }),
      playerLog('p2', 't2', { points: '15' })
    ]);
    getTeamStatsLogsByGameMock.mockResolvedValue([]);

    await renderPage();

    expect(screen.getByTestId('box-score')).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.getByText('Bia Souza')).toBeInTheDocument();
    expect(screen.getByText(messages.boxScore.title)).toBeInTheDocument();
  });

  it('hides the box score when a finished game has no logs', async () => {
    getPlayerStatsLogsByGameMock.mockResolvedValue([]);
    getTeamStatsLogsByGameMock.mockResolvedValue([]);

    await renderPage();

    expect(screen.queryByTestId('box-score')).not.toBeInTheDocument();
  });

  it('hides the box score of a live game the tournament does not fully publish', async () => {
    getGameMock.mockResolvedValue(game({ liveState: 'in_progress' }));
    getTournamentBySlugMock.mockResolvedValue({
      id: 'tour1',
      name: 'Liga Teste',
      slug: 'torneio',
      logoUrl: '',
      teams: [],
      sportSlug: '',
      sportName: '',
      playerStats: [playerStat('points', 'Pontos')],
      players: [],
      scoreboardSetting: { liveSiteUpdate: 'team-score-live-update' }
    });
    getPlayerStatsLogsByGameMock.mockResolvedValue([
      playerLog('p1', 't1', { points: '20' })
    ]);
    getTeamStatsLogsByGameMock.mockResolvedValue([]);

    await renderPage();

    expect(screen.queryByTestId('box-score')).not.toBeInTheDocument();
  });

  it('shows the box score of a live game the tournament fully publishes', async () => {
    getGameMock.mockResolvedValue(game({ liveState: 'in_progress' }));
    getPlayerStatsLogsByGameMock.mockResolvedValue([
      playerLog('p1', 't1', { points: '20' })
    ]);
    getTeamStatsLogsByGameMock.mockResolvedValue([]);

    await renderPage();

    expect(screen.getByTestId('box-score')).toBeInTheDocument();
  });
});

describe('GamePage metadata', () => {
  beforeEach(() => {
    getGameMock.mockReset();
    getGameMock.mockResolvedValue(game());
  });

  it('titles the page with both teams and points the canonical at this game', async () => {
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe('Time Casa x Time Visitante');
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/pt/org/torneio/jogos/g1`
    );
    expect(metadata.alternates?.languages?.en).toBe(
      `${SITE_URL}/en/org/torneio/jogos/g1`
    );
    expect(metadata.description).toContain('Time Casa x Time Visitante');
    expect(metadata.robots).toBeUndefined();
  });

  it('tells robots not to index a game that does not exist', async () => {
    getGameMock.mockRejectedValue(new ApiError({ status: 404, data: 'nope' }));

    const metadata = await generateMetadata({ params });

    expect(metadata.robots).toEqual({ index: false });
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/pt/org/torneio/jogos/g1`
    );
  });
});
