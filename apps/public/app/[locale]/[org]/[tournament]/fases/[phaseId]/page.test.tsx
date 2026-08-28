import { render, screen } from '@testing-library/react';
import PhasePage from './page';
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
        noGames: 'Nenhum jogo nesta fase',
        team: 'Time'
      },
      game: {
        undecidedTeam: 'A definir',
        unknownTournament: 'campeonato'
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

describe('PhasePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const emptyTeam = (id: string, name: string) => ({
    id,
    name,
    logoUrl: '',
    triCode: '',
    primaryColor: '',
    coaches: []
  });

  it('renders the phase name and games grouped by date', async () => {
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      id: 'ph1',
      title: 'Fase de Grupos',
      type: 'elimination',
      order: 1,
      isInProgress: false,
      draws: [],
      eliminationStats: [],
      eliminations: []
    });
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue({
      id: 'tour1',
      name: 'Torneio Teste',
      slug: 'tour',
      teams: [],
      phases: [{ id: 'ph1', title: 'Fase de Grupos', type: 'elimination', order: 1, isInProgress: false }]
    });
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([
      {
        id: 'g1',
        homeTeam: {
          id: 't1',
          name: 'Time A',
          logoUrl: '',
          triCode: '',
          primaryColor: '',
          coaches: []
        },
        awayTeam: {
          id: 't2',
          name: 'Time B',
          logoUrl: '',
          triCode: '',
          primaryColor: '',
          coaches: []
        },
        homeScore: 1,
        awayScore: 0,
        datetime: '2026-08-01T20:00:00Z',
        location: '',
        city: '',
        isFinished: true,
        awayPlaceholder: '',
        homePlaceholder: '',
        info: '',
        number: '1',
        phaseId: 'ph1',
        youTubeCode: '',
        liveState: '',
        resultType: ''
      }
    ]);

    const jsx = await PhasePage({
      params: Promise.resolve({
        locale: 'pt',
        org: 'org',
        tournament: 'tour',
        phaseId: 'ph1'
      })
    });
    render(jsx);

    expect(screen.getByText('Fase de Grupos')).toBeInTheDocument();
    expect(screen.getByText('Time A')).toBeInTheDocument();
    expect(screen.getByText('Time B')).toBeInTheDocument();
  });

  it('renders a standings table per group for an elimination-type phase, and tabs across tournament phases', async () => {
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      id: 'ph1',
      title: 'Classificação',
      type: 'elimination',
      order: 1,
      isInProgress: true,
      draws: [],
      eliminationStats: [
        {
          id: 'stat1',
          title: 'PTS',
          teamStatSource: 'fiba_group_points',
          rankingOrder: 1,
          rankingCriteria: 'overall'
        },
        {
          id: 'stat2',
          title: 'VIT H2H',
          teamStatSource: 'wins',
          rankingOrder: 2,
          rankingCriteria: 'head_to_head'
        }
      ],
      eliminations: [
        {
          id: 'group-a',
          order: 1,
          title: 'Grupo A',
          info: '',
          teamStats: [
            {
              id: 'ts1',
              teamId: 't1',
              placeholder: '',
              stats: { stat1: 3, stat2: 1 },
              rankingCriteriaUsed: null,
              rankingStatUsed: ''
            }
          ]
        }
      ]
    });
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue({
      id: 'tour1',
      name: 'Torneio Teste',
      slug: 'tour',
      teams: [emptyTeam('t1', 'Time A')],
      phases: [
        { id: 'ph1', title: 'Classificação', type: 'elimination', order: 1, isInProgress: true },
        { id: 'ph2', title: 'Playoffs', type: 'draw', order: 2, isInProgress: false }
      ]
    });
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([]);

    const jsx = await PhasePage({
      params: Promise.resolve({
        locale: 'pt',
        org: 'org',
        tournament: 'tour',
        phaseId: 'ph1'
      })
    });
    render(jsx);

    expect(screen.getByText('Grupo A')).toBeInTheDocument();
    expect(screen.getByText('Time A')).toBeInTheDocument();
    expect(screen.getByText('PTS')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    // head_to_head-criteria stats are internal tie-breakers, not displayed columns.
    expect(screen.queryByText('VIT H2H')).not.toBeInTheDocument();
    // Tabs link across every phase of the tournament.
    expect(screen.getByRole('link', { name: 'Playoffs' })).toHaveAttribute(
      'href',
      '/pt/org/tour/fases/ph2'
    );
  });

  it('renders a bracket round per draw for a draw-type phase', async () => {
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      id: 'ph2',
      title: 'Playoffs',
      type: 'draw',
      order: 2,
      isInProgress: false,
      draws: [
        {
          id: 'round1',
          order: 1,
          title: 'Final',
          matches: [
            {
              id: 'match1',
              firstTeamId: 't1',
              firstTeamPlaceholder: '',
              firstTeamScore: '2',
              secondTeamId: '',
              secondTeamPlaceholder: 'Vencedor B',
              secondTeamScore: '0',
              name: '',
              info: ''
            }
          ]
        }
      ],
      eliminationStats: [],
      eliminations: []
    });
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue({
      id: 'tour1',
      name: 'Torneio Teste',
      slug: 'tour',
      teams: [emptyTeam('t1', 'Time A')],
      phases: [{ id: 'ph2', title: 'Playoffs', type: 'draw', order: 2, isInProgress: false }]
    });
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([]);

    const jsx = await PhasePage({
      params: Promise.resolve({
        locale: 'pt',
        org: 'org',
        tournament: 'tour',
        phaseId: 'ph2'
      })
    });
    render(jsx);

    expect(screen.getByText('Final')).toBeInTheDocument();
    expect(screen.getByText('Time A')).toBeInTheDocument();
    expect(screen.getByText('Vencedor B')).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === '2 x 0')
    ).toBeInTheDocument();
  });
});
