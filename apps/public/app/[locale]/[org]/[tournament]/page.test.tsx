import TournamentPage, { generateMetadata } from './page';
import * as apiClient from '@gochamps/api-client';

jest.mock('@gochamps/api-client');

const notFound = jest.fn(() => {
  throw new Error('NEXT_NOT_FOUND');
});

jest.mock('next/navigation', () => ({
  notFound: () => notFound()
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
    const messages: Record<string, Messages> = {
      phase: {
        unknownPhase: 'fase',
        unknownTournament: 'campeonato',
        noGames: 'Nenhum jogo nesta fase',
        team: 'Time',
        breadcrumbHome: 'Home',
        active: 'Campeonato ativo',
        athletesCount: 'Atletas cadastrados',
        teamsCount: 'Times',
        phasesCount: 'Fases',
        gamesTitle: 'Partidas',
        previousDay: 'Dia anterior',
        nextDay: 'Próximo dia'
      },
      game: {
        undecidedTeam: 'A definir',
        winner: 'Vencedor'
      },
      metadata: {
        phaseTitle: 'Fase: {phase}',
        phaseDescription: 'Acompanhe os jogos da fase {phase}'
      }
    };

    const dictionary = messages[namespace] || {};

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

const phase = (id: string, title: string, order: number, isInProgress = false) => ({
  id,
  title,
  type: 'elimination',
  order,
  isInProgress
});

const tournamentWith = (phases: ReturnType<typeof phase>[]) => ({
  id: 'tour1',
  name: 'Torneio Teste',
  slug: 'tour',
  teams: [],
  players: [],
  organization: { id: '', name: '', slug: '', logoUrl: '' },
  phases
});

// loadTournament is wrapped in React's cache(), which memoizes per argument
// for the life of the module here — so every test uses its own slug rather
// than silently reading the previous test's tournament.
const paramsFor = (tournament: string) =>
  Promise.resolve({ locale: 'pt', org: 'org', tournament });


describe('TournamentPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([]);
  });

  it('renders the phase in progress, so the bare tournament URL lands on it', async () => {
    const running = phase('ph2', 'Playoffs', 2, true);
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue(
      tournamentWith([phase('ph1', 'Fase de Grupos', 1), running])
    );
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      ...running,
      draws: [],
      eliminationStats: [],
      eliminations: []
    });

    // What this route decides is which phase to hand to PhaseView; rendering
    // it is PhaseView's job, covered by _phase/PhaseView.test.tsx.
    const element = await TournamentPage({ params: paramsFor('in-progress') });

    expect(element.props.routeParams.phaseId).toBe('ph2');
  });

  it('falls back to the first phase the API returned, as the CMS does', async () => {
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue(
      tournamentWith([phase('ph2', 'Playoffs', 2), phase('ph1', 'Fase de Grupos', 1)])
    );
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      ...phase('ph2', 'Playoffs', 2),
      draws: [],
      eliminationStats: [],
      eliminations: []
    });

    const element = await TournamentPage({ params: paramsFor('no-running') });

    expect(element.props.routeParams.phaseId).toBe('ph2');
  });

  it('is a 404 for a tournament with no phases, rather than an empty shell', async () => {
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue(
      tournamentWith([])
    );

    await expect(
      TournamentPage({ params: paramsFor('phaseless') })
    ).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });
});

describe('generateMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('describes the default phase', async () => {
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue(
      tournamentWith([phase('ph1', 'Fase de Grupos', 1)])
    );
    (apiClient.getPhase as jest.Mock).mockResolvedValue(
      phase('ph1', 'Fase de Grupos', 1)
    );

    const metadata = await generateMetadata({ params: paramsFor('meta-title') });

    expect(metadata.title).toBe('Fase: Fase de Grupos');
  });

  it('keeps the canonical on the tournament URL, not the phase it renders', async () => {
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue(
      tournamentWith([phase('ph1', 'Fase de Grupos', 1)])
    );
    (apiClient.getPhase as jest.Mock).mockResolvedValue(
      phase('ph1', 'Fase de Grupos', 1)
    );

    const metadata = await generateMetadata({ params: paramsFor('meta-canonical') });

    expect(metadata.alternates?.canonical).toContain('/org/meta-canonical');
    expect(metadata.alternates?.canonical).not.toContain('/fases/');
  });

  it('falls back to translated placeholders when the tournament cannot be found', async () => {
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue(null);
    (apiClient.getPhase as jest.Mock).mockResolvedValue(null);

    const metadata = await generateMetadata({ params: paramsFor('meta-missing') });

    expect(metadata.title).toBe('Fase: fase');
  });
});
