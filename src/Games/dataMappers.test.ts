import {
  ApiGameWithDepedencies,
  ApiGamePostRequest,
  ApiGamePatchRequest
} from '../Shared/httpClient/apiTypes';
import { ApiTeam } from '../Shared/httpClient/apiTypes';
import {
  mapApiGameToGameEntity,
  mapGameEntityToApiGamePostRequest,
  mapGameEntityToApiGamePatchRequest
} from './dataMappers';
import { GameEntity } from './state';
import { DEFAULT_TEAM, TeamEntity } from '../Teams/state';

const mockTeamEntity: TeamEntity = {
  id: 'team-1',
  name: 'Team One',
  logoUrl: 'https://example.com/logo.png',
  triCode: 'T1',
  primaryColor: '',
  coaches: []
};

const mockApiTeam: ApiTeam = {
  id: 'team-1',
  name: 'Team One',
  logo_url: 'https://example.com/logo.png',
  tri_code: 'T1',
  primary_color: '',
  coaches: []
};

const mockApiGame: ApiGameWithDepedencies = {
  id: 'game-1',
  assets: [
    {
      id: 'asset-1',
      type: 'fiba-scoresheet',
      url: 'https://example.com/scoresheet.pdf'
    }
  ],
  away_placeholder: 'Away Team',
  away_score: 2,
  away_team: mockApiTeam,
  datetime: '2025-12-20T15:30:00Z',
  home_placeholder: 'Home Team',
  home_score: 1,
  home_team: mockApiTeam,
  info: 'Important match',
  is_finished: true,
  location: 'Stadium 1',
  phase_id: 'phase-1',
  youtube_code: 'abc123',
  live_state: 'ended',
  result_type: 'automatic'
};

const mockGameEntity: GameEntity = {
  id: 'game-1',
  assets: [
    {
      id: 'asset-1',
      type: 'fiba-scoresheet',
      url: 'https://example.com/scoresheet.pdf'
    }
  ],
  awayPlaceholder: 'Away Team',
  awayScore: 2,
  awayTeam: mockTeamEntity,
  datetime: '2025-12-20T15:30:00Z',
  homePlaceholder: 'Home Team',
  homeScore: 1,
  homeTeam: mockTeamEntity,
  info: 'Important match',
  isFinished: true,
  location: 'Stadium 1',
  officials: [],
  phaseId: 'phase-1',
  youTubeCode: 'abc123',
  liveState: 'ended',
  resultType: 'automatic'
};

describe('mapApiGameToGameEntity', () => {
  it('maps complete API game to game entity', () => {
    const result = mapApiGameToGameEntity(mockApiGame);

    expect(result).toEqual(mockGameEntity);
  });

  it('handles missing optional fields with default values', () => {
    const apiGameWithMissingFields: ApiGameWithDepedencies = {
      id: 'game-2',
      away_score: 0,
      home_score: 0,
      is_finished: false,
      location: 'Stadium 2',
      phase_id: 'phase-2',
      live_state: 'not_started',
      result_type: 'automatic'
    };

    const result = mapApiGameToGameEntity(apiGameWithMissingFields);

    expect(result).toEqual({
      id: 'game-2',
      assets: [],
      awayPlaceholder: '',
      awayScore: 0,
      awayTeam: DEFAULT_TEAM,
      datetime: '',
      homePlaceholder: '',
      homeScore: 0,
      homeTeam: DEFAULT_TEAM,
      info: '',
      isFinished: false,
      location: 'Stadium 2',
      officials: [],
      phaseId: 'phase-2',
      youTubeCode: '',
      liveState: 'not_started',
      resultType: 'automatic'
    });
  });

  it('handles null datetime field', () => {
    const apiGameWithNullDatetime = {
      ...mockApiGame,
      datetime: null as any
    };

    const result = mapApiGameToGameEntity(apiGameWithNullDatetime);

    expect(result.datetime).toBe('');
  });

  it('handles null optional string fields', () => {
    const apiGameWithNullFields = {
      ...mockApiGame,
      away_placeholder: null as any,
      home_placeholder: null as any,
      info: null as any,
      youtube_code: null as any
    };

    const result = mapApiGameToGameEntity(apiGameWithNullFields);

    expect(result.awayPlaceholder).toBe('');
    expect(result.homePlaceholder).toBe('');
    expect(result.info).toBe('');
    expect(result.youTubeCode).toBe('');
  });

  it('uses DEFAULT_TEAM when away_team is null', () => {
    const apiGameWithoutAwayTeam = {
      ...mockApiGame,
      away_team: null as any
    };

    const result = mapApiGameToGameEntity(apiGameWithoutAwayTeam);

    expect(result.awayTeam).toEqual(DEFAULT_TEAM);
  });

  it('uses DEFAULT_TEAM when home_team is null', () => {
    const apiGameWithoutHomeTeam = {
      ...mockApiGame,
      home_team: null as any
    };

    const result = mapApiGameToGameEntity(apiGameWithoutHomeTeam);

    expect(result.homeTeam).toEqual(DEFAULT_TEAM);
  });

  it('handles different live states', () => {
    const liveStates: Array<'not_started' | 'in_progress' | 'ended'> = [
      'not_started',
      'in_progress',
      'ended'
    ];

    liveStates.forEach(liveState => {
      const apiGame = { ...mockApiGame, live_state: liveState };
      const result = mapApiGameToGameEntity(apiGame);
      expect(result.liveState).toBe(liveState);
    });
  });

  it('handles different result types', () => {
    const resultTypes: Array<
      'automatic' | 'manual' | 'home_team_walkover' | 'away_team_walkover'
    > = ['automatic', 'manual', 'home_team_walkover', 'away_team_walkover'];

    resultTypes.forEach(resultType => {
      const apiGame = { ...mockApiGame, result_type: resultType };
      const result = mapApiGameToGameEntity(apiGame);
      expect(result.resultType).toBe(resultType);
    });
  });
});

describe('mapGameEntityToApiGamePostRequest', () => {
  it('maps game entity to API post request', () => {
    const phaseId = 'phase-123';
    const result = mapGameEntityToApiGamePostRequest(mockGameEntity, phaseId);

    const expected: ApiGamePostRequest = {
      game: {
        id: 'game-1',
        assets: [
          {
            type: 'fiba-scoresheet',
            url: 'https://example.com/scoresheet.pdf'
          }
        ],
        away_placeholder: 'Away Team',
        away_score: 2,
        away_team_id: 'team-1',
        datetime: '2025-12-20T15:30:00Z',
        home_placeholder: 'Home Team',
        home_score: 1,
        home_team_id: 'team-1',
        info: 'Important match',
        is_finished: true,
        location: 'Stadium 1',
        officials: [],
        phase_id: 'phase-123',
        youtube_code: 'abc123',
        live_state: 'ended',
        result_type: 'automatic'
      }
    };

    expect(result).toEqual(expected);
  });

  it('handles empty optional string fields', () => {
    const gameWithEmptyFields: GameEntity = {
      ...mockGameEntity,
      awayPlaceholder: '',
      homePlaceholder: '',
      info: '',
      youTubeCode: ''
    };

    const result = mapGameEntityToApiGamePostRequest(
      gameWithEmptyFields,
      'phase-1'
    );

    expect(result.game.away_placeholder).toBe('');
    expect(result.game.home_placeholder).toBe('');
    expect(result.game.info).toBe('');
    expect(result.game.youtube_code).toBe('');
  });

  it('handles empty datetime field', () => {
    const gameWithEmptyDatetime = {
      ...mockGameEntity,
      datetime: ''
    };

    const result = mapGameEntityToApiGamePostRequest(
      gameWithEmptyDatetime,
      'phase-1'
    );

    expect(result.game.datetime).toBe('');
  });

  it('handles empty location field', () => {
    const gameWithEmptyLocation = {
      ...mockGameEntity,
      location: ''
    };

    const result = mapGameEntityToApiGamePostRequest(
      gameWithEmptyLocation,
      'phase-1'
    );

    expect(result.game.location).toBe('');
  });

  it('handles teams without IDs', () => {
    const gameWithTeamsWithoutIds: GameEntity = {
      ...mockGameEntity,
      awayTeam: { ...mockTeamEntity, id: '' },
      homeTeam: { ...mockTeamEntity, id: '' }
    };

    const result = mapGameEntityToApiGamePostRequest(
      gameWithTeamsWithoutIds,
      'phase-1'
    );

    expect(result.game.away_team_id).toBe('');
    expect(result.game.home_team_id).toBe('');
  });

  it('uses provided phase ID', () => {
    const customPhaseId = 'custom-phase-id';
    const result = mapGameEntityToApiGamePostRequest(
      mockGameEntity,
      customPhaseId
    );

    expect(result.game.phase_id).toBe(customPhaseId);
  });
});

describe('mapGameEntityToApiGamePatchRequest', () => {
  it('maps game entity to API patch request', () => {
    const result = mapGameEntityToApiGamePatchRequest(mockGameEntity);

    const expected: ApiGamePatchRequest = {
      game: {
        id: 'game-1',
        assets: [
          {
            id: 'asset-1',
            type: 'fiba-scoresheet',
            url: 'https://example.com/scoresheet.pdf'
          }
        ],
        away_placeholder: 'Away Team',
        away_score: 2,
        away_team_id: 'team-1',
        datetime: '2025-12-20T15:30:00Z',
        home_placeholder: 'Home Team',
        home_score: 1,
        home_team_id: 'team-1',
        info: 'Important match',
        is_finished: true,
        location: 'Stadium 1',
        officials: [],
        youtube_code: 'abc123',
        live_state: 'ended',
        result_type: 'automatic'
      }
    };

    expect(result).toEqual(expected);
  });

  it('handles empty optional string fields', () => {
    const gameWithEmptyFields: GameEntity = {
      ...mockGameEntity,
      awayPlaceholder: '',
      homePlaceholder: '',
      info: '',
      youTubeCode: ''
    };

    const result = mapGameEntityToApiGamePatchRequest(gameWithEmptyFields);

    expect(result.game.away_placeholder).toBe('');
    expect(result.game.home_placeholder).toBe('');
    expect(result.game.info).toBe('');
    expect(result.game.youtube_code).toBe('');
  });

  it('handles empty datetime field', () => {
    const gameWithEmptyDatetime = {
      ...mockGameEntity,
      datetime: ''
    };

    const result = mapGameEntityToApiGamePatchRequest(gameWithEmptyDatetime);

    expect(result.game.datetime).toBe('');
  });

  it('handles empty location field', () => {
    const gameWithEmptyLocation = {
      ...mockGameEntity,
      location: ''
    };

    const result = mapGameEntityToApiGamePatchRequest(gameWithEmptyLocation);

    expect(result.game.location).toBe('');
  });

  it('handles teams without IDs', () => {
    const gameWithTeamsWithoutIds: GameEntity = {
      ...mockGameEntity,
      awayTeam: { ...mockTeamEntity, id: '' },
      homeTeam: { ...mockTeamEntity, id: '' }
    };

    const result = mapGameEntityToApiGamePatchRequest(gameWithTeamsWithoutIds);

    expect(result.game.away_team_id).toBe('');
    expect(result.game.home_team_id).toBe('');
  });

  it('does not include phase_id in patch request', () => {
    const result = mapGameEntityToApiGamePatchRequest(mockGameEntity);

    expect(result.game).not.toHaveProperty('phase_id');
  });

  it('handles all possible boolean values for isFinished', () => {
    const finishedGame = { ...mockGameEntity, isFinished: true };
    const unfinishedGame = { ...mockGameEntity, isFinished: false };

    const finishedResult = mapGameEntityToApiGamePatchRequest(finishedGame);
    const unfinishedResult = mapGameEntityToApiGamePatchRequest(unfinishedGame);

    expect(finishedResult.game.is_finished).toBe(true);
    expect(unfinishedResult.game.is_finished).toBe(false);
  });

  it('handles numeric scores correctly', () => {
    const gameWithScores = {
      ...mockGameEntity,
      awayScore: 5,
      homeScore: 3
    };

    const result = mapGameEntityToApiGamePatchRequest(gameWithScores);

    expect(result.game.away_score).toBe(5);
    expect(result.game.home_score).toBe(3);
  });
});
