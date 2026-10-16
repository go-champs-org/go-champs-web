import { generateMetadata } from './page';
import * as apiClient from '@gochamps/api-client';

jest.mock('@gochamps/api-client');

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

describe('generateMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('falls back to translated placeholders, not raw lookup errors, when the phase or tournament cannot be found', async () => {
    (apiClient.getPhase as jest.Mock).mockResolvedValue(null);
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue(null);

    const metadata = await generateMetadata({
      params: Promise.resolve({
        locale: 'pt',
        org: 'org',
        tournament: 'tour',
        phaseId: 'missing'
      })
    });

    expect(metadata.title).toBe('Fase: fase');
  });
});
