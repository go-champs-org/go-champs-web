import { render, screen } from '@testing-library/react';
import { PhaseView } from './PhaseView';
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
        nextDay: 'Próximo dia',
        advancedStats: 'Estatísticas avançadas',
        summaryStats: 'Líderes de estatísticas',
        highlights: 'Destaques',
        seeAll: 'Ver todos',
        scopeAggregate: 'Totais',
        scopePerGame: 'Por jogo',
        highlightsScope: 'Estatísticas',
        highlightsPrevious: 'Destaques anteriores',
        highlightsNext: 'Mais destaques',
        highlightTitles: { field_goal_percentage: '% 2 Pontos' }
      },
      team: {
        statDescriptions: { points: 'Pontos', rebounds: 'Rebotes' }
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

describe('PhaseView', () => {
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

  const emptyOrganization = () => ({ id: '', name: '', slug: '', logoUrl: '' });

  it('renders the phase name and the games sidebar for its day', async () => {
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
      players: [],
      organization: emptyOrganization(),
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
        location: 'Ginásio Municipal',
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

    const jsx = await PhaseView({
      routeParams: {
        locale: 'pt',
        org: 'org',
        tournament: 'tour',
        phaseId: 'ph1'
      }
    });
    render(jsx);

    expect(screen.getByText('Fase de Grupos')).toBeInTheDocument();
    expect(screen.getByText('Time A')).toBeInTheDocument();
    expect(screen.getByText('Time B')).toBeInTheDocument();
    expect(screen.getByText('Partidas')).toBeInTheDocument();
    expect(screen.getByText('Ginásio Municipal')).toBeInTheDocument();
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
      players: [],
      organization: emptyOrganization(),
      phases: [
        { id: 'ph1', title: 'Classificação', type: 'elimination', order: 1, isInProgress: true },
        { id: 'ph2', title: 'Playoffs', type: 'draw', order: 2, isInProgress: false }
      ]
    });
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([]);

    const jsx = await PhaseView({
      routeParams: {
        locale: 'pt',
        org: 'org',
        tournament: 'tour',
        phaseId: 'ph1'
      }
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
      '/org/tour/stage/ph2'
    );
    // A team in the standings is the way into its page, as it is on the CMS.
    expect(screen.getByRole('link', { name: 'Time A' })).toHaveAttribute(
      'href',
      '/org/tour/team/t1'
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
      players: [],
      organization: emptyOrganization(),
      phases: [{ id: 'ph2', title: 'Playoffs', type: 'draw', order: 2, isInProgress: false }]
    });
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([]);

    const jsx = await PhaseView({
      routeParams: {
        locale: 'pt',
        org: 'org',
        tournament: 'tour',
        phaseId: 'ph2'
      }
    });
    render(jsx);

    expect(screen.getByText('Final')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Time A' })).toHaveAttribute(
      'href',
      '/org/tour/team/t1'
    );
    // A slot still waiting on another match names no team, so it links nowhere.
    expect(screen.getByText('Vencedor B')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Vencedor B' })
    ).not.toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === '2 x 0')
    ).toBeInTheDocument();
  });

  it('renders a tournament header with breadcrumb, org name, active badge and counts', async () => {
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      id: 'ph1',
      title: 'Classificação',
      type: 'elimination',
      order: 1,
      isInProgress: true,
      draws: [],
      eliminationStats: [],
      eliminations: []
    });
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue({
      id: 'tour1',
      name: 'Liga de Basquete Amador (2022)',
      slug: 'tour',
      logoUrl: '',
      teams: [emptyTeam('t1', 'Time A'), emptyTeam('t2', 'Time B')],
      players: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }],
      organization: {
        id: 'org1',
        name: 'Liga de Basquete Amador de Porto Alegre',
        slug: 'liga',
        logoUrl: ''
      },
      phases: [
        { id: 'ph1', title: 'Classificação', type: 'elimination', order: 1, isInProgress: true }
      ]
    });
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([]);

    const jsx = await PhaseView({
      routeParams: {
        locale: 'pt',
        org: 'org',
        tournament: 'tour',
        phaseId: 'ph1'
      }
    });
    render(jsx);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(
      screen.getByRole('heading', { name: 'Liga de Basquete Amador (2022)' })
    ).toBeInTheDocument();
    const organizationLinks = screen.getAllByRole('link', {
      name: 'Liga de Basquete Amador de Porto Alegre'
    });
    expect(organizationLinks).toHaveLength(2);
    organizationLinks.forEach(link =>
      expect(link).toHaveAttribute('href', '/liga')
    );
    expect(screen.getByText('Campeonato ativo')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Atletas cadastrados')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Times')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Fases')).toBeInTheDocument();
  });

  it('labels the standings rank column for assistive technologies', async () => {
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      id: 'ph1',
      title: 'Classificação',
      type: 'elimination',
      order: 1,
      isInProgress: false,
      draws: [],
      eliminationStats: [
        {
          id: 'stat1',
          title: 'PTS',
          teamStatSource: 'fiba_group_points',
          rankingOrder: 1,
          rankingCriteria: 'overall'
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
              stats: { stat1: 3 },
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
      players: [],
      organization: emptyOrganization(),
      phases: [{ id: 'ph1', title: 'Classificação', type: 'elimination', order: 1, isInProgress: false }]
    });
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([]);

    const jsx = await PhaseView({
      routeParams: {
        locale: 'pt',
        org: 'org',
        tournament: 'tour',
        phaseId: 'ph1'
      }
    });
    render(jsx);

    expect(screen.getByRole('columnheader', { name: '#' })).toBeInTheDocument();
  });
});

describe('PhaseView statistics links', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([]);
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      id: 'ph1',
      title: 'Fase 1',
      type: 'elimination',
      order: 1,
      isInProgress: false,
      draws: [],
      eliminationStats: [],
      eliminations: []
    });
  });

  const tournamentWith = (overrides: Record<string, unknown>) => ({
    id: 'tour1',
    name: 'Torneio Teste',
    slug: 'tour',
    teams: [],
    players: [],
    organization: { id: '', name: '', slug: '', logoUrl: '' },
    phases: [
      { id: 'ph1', title: 'Fase 1', type: 'elimination', order: 1, isInProgress: false }
    ],
    hasAggregatedPlayerStats: false,
    ...overrides
  });

  const renderWith = async (overrides: Record<string, unknown>) => {
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue(
      tournamentWith(overrides)
    );

    render(
      await PhaseView({
        routeParams: { locale: 'pt', org: 'org', tournament: 'tour', phaseId: 'ph1' }
      })
    );
  };

  it('links to the advanced table when the tournament publishes one', async () => {
    await renderWith({ hasAggregatedPlayerStats: true });

    expect(
      screen.getByRole('link', { name: 'Estatísticas avançadas' })
    ).toHaveAttribute('href', '/org/tour/stats');
  });

  // Mirrors the CMS's TopLevel, which hides the dropdown entirely rather than
  // offering a link to an empty table.
  it('offers no statistics link when the tournament publishes none', async () => {
    await renderWith({ hasAggregatedPlayerStats: false });

    expect(
      screen.queryByRole('link', { name: 'Estatísticas avançadas' })
    ).not.toBeInTheDocument();
  });
});

describe('PhaseView highlights', () => {
  const statLeaders = (statKey: string, names: string[]) => ({
    statKey,
    qualifier: null,
    leaders: names.map((name, index) => ({
      playerId: `${statKey}-${index}`,
      teamId: 't1',
      value: 30 - index,
      playerName: name,
      shirtNumber: '',
      photoUrl: ''
    }))
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (apiClient.playerStatThatIsVisible as jest.Mock).mockImplementation(
      (stat: { visibility: string }) => stat.visibility === 'public'
    );
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([]);
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      id: 'ph1',
      title: 'Fase 1',
      type: 'elimination',
      order: 1,
      isInProgress: false,
      draws: [],
      eliminationStats: [],
      eliminations: []
    });
  });

  const renderWith = async (overrides: Record<string, unknown>) => {
    (apiClient.getTournamentBySlug as jest.Mock).mockResolvedValue({
      id: 'tour1',
      name: 'Torneio Teste',
      slug: 'tour',
      teams: [{ id: 't1', name: 'Recreio da Juventude', logoUrl: '', triCode: '', primaryColor: '', coaches: [] }],
      players: [],
      organization: { id: '', name: '', slug: '', logoUrl: '' },
      phases: [
        { id: 'ph1', title: 'Fase 1', type: 'elimination', order: 1, isInProgress: false }
      ],
      hasAggregatedPlayerStats: true,
      sportSlug: 'basketball_5x5',
      playerStats: [
        { id: 's1', title: 'Points', slug: 'points', visibility: 'public' },
        { id: 's2', title: 'Pontos por jogo', slug: 'points_per_game', visibility: 'public' },
        { id: 's3', title: 'Rebounds', slug: 'rebounds', visibility: 'public' },
        {
          id: 's5',
          title: 'Eficiência por jogo',
          slug: 'efficiency_per_game',
          visibility: 'public'
        }
      ],
      ...overrides
    });

    render(
      await PhaseView({
        routeParams: { locale: 'pt', org: 'org', tournament: 'tour', phaseId: 'ph1' }
      })
    );
  };

  it('shows a card per highlighted stat with its top 3 and a link to the stat', async () => {
    (apiClient.getAggregatedPlayerStatsLeaders as jest.Mock).mockResolvedValue([
      statLeaders('points', ['Ana', 'Bia', 'Cris', 'Dani']),
      statLeaders('points_per_game', ['Bia']),
      statLeaders('rebounds', ['Eva']),
      statLeaders('efficiency_per_game', ['Fabi'])
    ]);

    await renderWith({});

    expect(apiClient.getAggregatedPlayerStatsLeaders).toHaveBeenCalledTimes(1);
    expect(apiClient.getAggregatedPlayerStatsLeaders).toHaveBeenCalledWith({
      tournamentId: 'tour1',
      stats: ['points', 'points_per_game', 'rebounds', 'efficiency_per_game']
    });

    expect(screen.getByText('Destaques')).toBeInTheDocument();
    const cards = screen.getAllByTestId('stat-leader-card');
    expect(cards).toHaveLength(3);
    // Titled in the page's language, not the tournament's English "Points".
    expect(cards[0]).toHaveTextContent('Pontos');
    expect(cards[0]).not.toHaveTextContent('Points');
    expect(cards[0]).toHaveTextContent('Ana');
    expect(cards[0]).toHaveTextContent('Recreio da Juventude');
    expect(cards[0]).toHaveTextContent('Cris');
    expect(cards[0]).not.toHaveTextContent('Dani');
    expect(cards[0]).toHaveTextContent('Por jogo');
    expect(cards[1]).toHaveTextContent('Rebotes');
    expect(cards[1]).not.toHaveTextContent('Por jogo');
    // Recorded only per game: that ranking alone, under its own title.
    expect(cards[2]).toHaveTextContent('Eficiência por jogo');
    expect(cards[2]).toHaveTextContent('Fabi');

    const seeAll = screen.getAllByRole('link', { name: 'Ver todos →' });
    expect(seeAll[0]).toHaveAttribute('href', '/org/tour/stats?stat=points');
    expect(seeAll[1]).toHaveAttribute('href', '/org/tour/stats?stat=rebounds');
    expect(seeAll[2]).toHaveAttribute(
      'href',
      '/org/tour/stats?stat=efficiency_per_game'
    );
  });

  it('leaves out a stat with no leaders yet', async () => {
    (apiClient.getAggregatedPlayerStatsLeaders as jest.Mock).mockResolvedValue([
      statLeaders('points', ['Ana']),
      statLeaders('points_per_game', []),
      statLeaders('rebounds', []),
      statLeaders('efficiency_per_game', [])
    ]);

    await renderWith({});

    expect(screen.getAllByTestId('stat-leader-card')).toHaveLength(1);
  });

  it('renders the page without highlights when the leaders request fails', async () => {
    (apiClient.getAggregatedPlayerStatsLeaders as jest.Mock).mockRejectedValue(
      new Error('down')
    );

    await renderWith({});

    expect(screen.getByText('Fase 1', { selector: 'h2' })).toBeInTheDocument();
    expect(screen.queryByTestId('stat-leaders')).not.toBeInTheDocument();
  });

  it('asks for nothing for a sport without highlights', async () => {
    await renderWith({ sportSlug: 'basketball_3x3' });

    expect(apiClient.getAggregatedPlayerStatsLeaders).not.toHaveBeenCalled();
    expect(screen.queryByTestId('stat-leaders')).not.toBeInTheDocument();
  });

  it('asks for nothing when the tournament has no aggregated stats', async () => {
    await renderWith({ hasAggregatedPlayerStats: false });

    expect(apiClient.getAggregatedPlayerStatsLeaders).not.toHaveBeenCalled();
    expect(screen.queryByTestId('stat-leaders')).not.toBeInTheDocument();
  });
});
