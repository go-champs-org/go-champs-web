import {
  deleteGameFailure,
  deleteGameStart,
  deleteGameSuccess,
  getGameFailure,
  getGamesByFilterFailure,
  getGamesByFilterStart,
  getGamesByFilterSuccess,
  getGameStart,
  getGameSuccess,
  postGameFailure,
  postGameStart,
  postGameSuccess,
  patchGameStart,
  patchGameFailure,
  patchGameSuccess
} from './actions';
import gameReducer from './reducer';
import { DEFAULT_GAME, GameState, initialState } from './state';

describe('deleteGame', () => {
  const action = deleteGameStart();

  it('sets isLoadingDeleteGame to true', () => {
    expect(gameReducer(initialState, action).isLoadingDeleteGame).toBe(true);
  });
});

describe('deleteGameFailure', () => {
  const action = deleteGameFailure('error');

  it('sets isLoadingDeleteGame to false', () => {
    expect(gameReducer(initialState, action).isLoadingDeleteGame).toBe(false);
  });
});

describe('deleteGameSuccess', () => {
  const action = deleteGameSuccess('first-id');

  const deleteState = {
    ...initialState,
    games: {
      'first-id': {
        id: 'first-id',
        awayScore: 10,
        awayTeam: {
          id: 'first-away-team-id',
          name: 'first-away-team'
        },
        datetime: '2019-05-22T03:21:21.248Z',
        homeScore: 20,
        homeTeam: {
          id: 'first-home-team-id',
          name: 'first-home-team'
        },
        location: 'first location'
      }
    }
  };

  it('sets isLoadingDeleteGame to false', () => {
    expect(gameReducer(deleteState, action).isLoadingDeleteGame).toBe(false);
  });

  it('remove entity', () => {
    const newState = gameReducer(deleteState, action);

    expect(newState.games['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: GameState = {
      ...initialState,
      games: {
        'some-id': {
          ...DEFAULT_GAME,
          id: 'some-id'
        },
        'first-id': deleteState.games['first-id']
      }
    };

    const newState = gameReducer(someState, action);

    expect(newState.games['some-id']).toEqual({
      ...DEFAULT_GAME,
      id: 'some-id'
    });
  });
});

describe('patchGame', () => {
  const action = patchGameStart();

  it('sets isLoadingPatchGame to true', () => {
    const newState = gameReducer(initialState, action);
    expect(newState.isLoadingPatchGame).toBe(true);
  });
});

describe('patchGameFailure', () => {
  const action = patchGameFailure('error');

  it('sets isLoadingPatchGame to false', () => {
    const newState = gameReducer(initialState, action);
    expect(newState.isLoadingPatchGame).toBe(false);
  });
});

describe('patchGameSuccess', () => {
  const action = patchGameSuccess({
    id: 'first-id',
    awayPlaceholder: 'updated away placeholder',
    awayScore: 30,
    awayTeam: {
      id: 'updated-away-team-id',
      name: 'updated-away-team'
    },
    city: 'updated city',
    datetime: '2019-05-22T03:21:21.248Z',
    homePlaceholder: 'updated home placeholder',
    homeScore: 40,
    homeTeam: {
      id: 'updated-home-team-id',
      name: 'updated-home-team'
    },
    info: 'updated info',
    isFinished: true,
    location: 'updated location'
  });

  const updateState: GameState = {
    ...initialState,
    games: {
      'first-id': {
        id: 'first-id',
        awayPlaceholder: 'first home placeholder',
        awayScore: 10,
        awayTeam: {
          id: 'first-away-team-id',
          name: 'first-away-team'
        },
        city: 'first city',
        datetime: '2019-05-22T03:21:21.248Z',
        homePlaceholder: 'first home placeholder',
        homeScore: 20,
        homeTeam: {
          id: 'first-home-team-id',
          name: 'first-home-team'
        },
        info: 'first info',
        isFinished: false,
        location: 'first location'
      }
    }
  };

  it('sets isLoadingPatchGame to false', () => {
    const newState = gameReducer(updateState, action);
    expect(newState.isLoadingPatchGame).toBe(false);
  });

  it('set entity', () => {
    const newState = gameReducer(updateState, action);

    expect(newState.games['first-id']).toEqual({
      id: 'first-id',
      awayPlaceholder: 'updated away placeholder',
      awayScore: 30,
      awayTeam: {
        id: 'updated-away-team-id',
        name: 'updated-away-team'
      },
      city: 'updated city',
      datetime: '2019-05-22T03:21:21.248Z',
      homePlaceholder: 'updated home placeholder',
      homeScore: 40,
      homeTeam: {
        id: 'updated-home-team-id',
        name: 'updated-home-team'
      },
      info: 'updated info',
      isFinished: true,
      location: 'updated location'
    });
  });

  it('keeps others entities in other', () => {
    const someState: GameState = {
      ...updateState,
      games: {
        'some-id': {
          id: 'some-id',
          awayScore: 50,
          awayTeam: {
            id: 'some-away-team-id',
            name: 'some-away-team'
          },
          datetime: '2019-05-22T03:21:21.248Z',
          homeScore: 60,
          homeTeam: {
            id: 'some-home-team-id',
            name: 'some-home-team'
          },
          info: 'some info',
          location: 'some location'
        }
      }
    };

    const newState = gameReducer(someState, action);

    expect(newState.games['some-id']).toEqual({
      id: 'some-id',
      awayScore: 50,
      awayTeam: {
        id: 'some-away-team-id',
        name: 'some-away-team'
      },
      datetime: '2019-05-22T03:21:21.248Z',
      homeScore: 60,
      homeTeam: {
        id: 'some-home-team-id',
        name: 'some-home-team'
      },
      info: 'some info',
      location: 'some location'
    });
  });
});

describe('postGame', () => {
  const action = postGameStart();

  it('sets isLoadingPostGame to true', () => {
    expect(gameReducer(initialState, action).isLoadingPostGame).toBe(true);
  });
});

describe('postGameFailure', () => {
  const action = postGameFailure('error');

  it('sets isLoadingPostGame to false', () => {
    expect(gameReducer(initialState, action).isLoadingPostGame).toBe(false);
  });
});

describe('postGameSuccess', () => {
  const action = postGameSuccess({
    id: 'first-id',
    awayPlaceholder: 'first away placeholder',
    awayScore: 10,
    awayTeam: {
      id: 'first-away-team-id',
      name: 'first-away-team',
      stats: {}
    },
    city: 'first city',
    datetime: '2019-05-22T03:21:21.248Z',
    homePlaceholder: 'first home placeholder',
    homeScore: 20,
    homeTeam: {
      id: 'first-home-team-id',
      name: 'first-home-team',
      stats: {}
    },
    location: 'first location',
    isFinished: true
  });

  it('sets isLoadingPostGame to false', () => {
    expect(gameReducer(initialState, action).isLoadingPostGame).toBe(false);
  });

  it('set entity', () => {
    const newState = gameReducer(initialState, action);

    expect(newState.games['first-id']).toEqual({
      id: 'first-id',
      awayPlaceholder: 'first away placeholder',
      awayScore: 10,
      awayTeam: {
        id: 'first-away-team-id',
        name: 'first-away-team',
        stats: {}
      },
      city: 'first city',
      datetime: '2019-05-22T03:21:21.248Z',
      homePlaceholder: 'first home placeholder',
      homeScore: 20,
      homeTeam: {
        id: 'first-home-team-id',
        name: 'first-home-team',
        stats: {}
      },
      location: 'first location',
      isFinished: true
    });
  });

  it('keeps others entities in other', () => {
    const someState: GameState = {
      ...initialState,
      games: {
        'some-id': {
          id: 'some-id',
          awayScore: 30,
          awayTeam: {
            id: 'some-away-team-id',
            name: 'some-away-team',
            stats: {}
          },
          datetime: '2019-05-22T03:21:21.248Z',
          homeScore: 40,
          homeTeam: {
            id: 'some-home-team-id',
            name: 'some-home-team',
            stats: {}
          },
          location: 'some location'
        }
      }
    };

    const newState = gameReducer(someState, action);

    expect(newState.games['some-id']).toEqual({
      id: 'some-id',
      awayScore: 30,
      awayTeam: {
        id: 'some-away-team-id',
        name: 'some-away-team',
        stats: {}
      },
      datetime: '2019-05-22T03:21:21.248Z',
      homeScore: 40,
      homeTeam: {
        id: 'some-home-team-id',
        name: 'some-home-team',
        stats: {}
      },
      location: 'some location'
    });
  });
});

describe('getGame', () => {
  const action = getGameStart();

  it('sets isLoadingRequestGame to true', () => {
    expect(gameReducer(initialState, action).isLoadingRequestGame).toBe(true);
  });
});

describe('getGameFailure', () => {
  const action = getGameFailure('error');

  it('sets isLoadingRequestGame to false', () => {
    expect(gameReducer(initialState, action).isLoadingRequestGame).toBe(false);
  });
});

describe('getGameSuccess', () => {
  const action = getGameSuccess({
    id: 'first-id',
    awayPlaceholder: 'first away placeholder',
    awayScore: 10,
    awayTeam: {
      id: 'first-away-team-id',
      name: 'first-away-team'
    },
    datetime: '2019-05-22T03:21:21.248Z',
    homePlaceholder: 'first home placeholder',
    homeScore: 20,
    homeTeam: {
      id: 'first-home-team-id',
      name: 'first-home-team'
    },
    phaseId: 'phase-id',
    location: 'first location',
    isFinished: true
  });

  it('sets isLoadingRequestGame to false', () => {
    expect(gameReducer(initialState, action).isLoadingRequestGame).toBe(false);
  });

  it('sets entities', () => {
    const newState = gameReducer(initialState, action);

    expect(newState.games['first-id']).toEqual({
      id: 'first-id',
      awayPlaceholder: 'first away placeholder',
      awayScore: 10,
      awayTeam: {
        id: 'first-away-team-id',
        name: 'first-away-team'
      },
      datetime: '2019-05-22T03:21:21.248Z',
      homePlaceholder: 'first home placeholder',
      homeScore: 20,
      homeTeam: {
        id: 'first-home-team-id',
        name: 'first-home-team'
      },
      phaseId: 'phase-id',
      location: 'first location',
      isFinished: true
    });
  });
});

describe('getGamesByFilter', () => {
  const action = getGamesByFilterStart();

  it('sets isLoadingRequestGames to true', () => {
    expect(gameReducer(initialState, action).isLoadingRequestGames).toBe(true);
  });
});

describe('getGamesByFilterFailure', () => {
  const action = getGamesByFilterFailure('error');

  it('sets isLoadingRequestGames to false', () => {
    expect(gameReducer(initialState, action).isLoadingRequestGames).toBe(false);
  });
});

describe('getGamesByFilterSuccess', () => {
  const action = getGamesByFilterSuccess([
    {
      id: 'first-id',
      awayScore: 10,
      awayTeam: {
        id: 'first-away-team-id',
        name: 'first-away-team'
      },
      datetime: '2019-05-22T03:21:21.248Z',
      phaseId: 'phase-id',
      homeScore: 20,
      homeTeam: {
        id: 'first-home-team-id',
        name: 'first-home-team'
      },
      location: 'first location'
    },
    {
      id: 'second-id',
      awayScore: 30,
      awayTeam: {
        id: 'second-away-team-id',
        name: 'second-away-team'
      },
      datetime: '2019-05-22T03:21:21.248Z',
      phaseId: 'phase-id',
      homeScore: 40,
      homeTeam: {
        id: 'second-home-team-id',
        name: 'second-home-team'
      },
      location: 'second location'
    },
    {
      id: 'third-id',
      awayScore: null,
      awayTeam: null,
      datetime: '2019-06-22T03:21:21.248Z',
      homeScore: null,
      homeTeam: null,
      location: 'third location'
    }
  ]);

  it('sets isLoadingRequestGames to false', () => {
    expect(gameReducer(initialState, action).isLoadingRequestGames).toBe(false);
  });

  it('sets entities', () => {
    const newState = gameReducer(initialState, action);

    expect(newState.games['first-id']).toEqual({
      id: 'first-id',
      awayScore: 10,
      awayTeam: {
        id: 'first-away-team-id',
        name: 'first-away-team'
      },
      datetime: '2019-05-22T03:21:21.248Z',
      phaseId: 'phase-id',
      homeScore: 20,
      homeTeam: {
        id: 'first-home-team-id',
        name: 'first-home-team'
      },
      location: 'first location'
    });
    expect(newState.games['second-id']).toEqual({
      id: 'second-id',
      awayScore: 30,
      awayTeam: {
        id: 'second-away-team-id',
        name: 'second-away-team'
      },
      datetime: '2019-05-22T03:21:21.248Z',
      phaseId: 'phase-id',
      homeScore: 40,
      homeTeam: {
        id: 'second-home-team-id',
        name: 'second-home-team'
      },
      location: 'second location'
    });
  });
});
