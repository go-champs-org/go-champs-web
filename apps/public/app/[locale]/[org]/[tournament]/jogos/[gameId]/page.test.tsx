import { render, screen } from '@testing-library/react';
import { ApiError, getGame, getTournamentBySlug } from '@gochamps/api-client';
import { notFound } from 'next/navigation';
import GamePage, { generateMetadata } from './page';
import { SITE_URL } from '../../../../../../src/seo/metadata';
import messages from '../../../../../../messages/pt.json';

jest.mock('@gochamps/api-client', () => ({
  ...jest.requireActual('@gochamps/api-client'),
  getGame: jest.fn(),
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
      require('../../../../../../messages/pt.json') as Record<
        string,
        Record<string, string>
      >
    )[namespace];

    return (key: string, values?: Record<string, string>) =>
      Object.entries(values || {}).reduce(
        (message, [name, value]) => message.replace(`{${name}}`, value),
        dictionary[key]
      );
  }
}));

const getGameMock = getGame as jest.Mock;
const getTournamentBySlugMock = getTournamentBySlug as jest.Mock;

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

describe('GamePage', () => {
  beforeEach(() => {
    getGameMock.mockReset();
    getTournamentBySlugMock.mockReset();
    getGameMock.mockResolvedValue(game());
    getTournamentBySlugMock.mockResolvedValue({
      id: 'tour1',
      name: 'Liga Teste',
      slug: 'torneio',
      logoUrl: '',
      teams: []
    });
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

  it('links back to the tournament on the CMS, with an absolute URL', async () => {
    await renderPage();

    const link = screen.getByRole('link', { name: 'Liga Teste' });
    expect(link.getAttribute('href')).toMatch(/^https?:\/\/.*\/org\/torneio$/);
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

  it('renders a 404 for a game that does not exist', async () => {
    getGameMock.mockRejectedValue(new ApiError({ status: 404, data: 'nope' }));

    await expect(renderPage()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('lets any other API failure surface instead of reporting a 404', async () => {
    getGameMock.mockRejectedValue(new ApiError({ status: 500, data: 'boom' }));

    await expect(renderPage()).rejects.toThrow('API error with status 500');
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
  });
});
