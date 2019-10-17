import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_TOURNAMENT_GAME,
  DELETE_TOURNAMENT_GAME_FAILURE,
  DELETE_TOURNAMENT_GAME_SUCCESS,
  POST_TOURNAMENT_GAME,
  POST_TOURNAMENT_GAME_FAILURE,
  POST_TOURNAMENT_GAME_SUCCESS,
  REQUEST_TOURNAMENT_GAME,
  REQUEST_TOURNAMENT_GAMES_BY_FILTER,
  REQUEST_TOURNAMENT_GAMES_BY_FILTER_FAILURE,
  REQUEST_TOURNAMENT_GAMES_BY_FILTER_SUCCESS,
  REQUEST_TOURNAMENT_GAME_FAILURE,
  REQUEST_TOURNAMENT_GAME_SUCCESS
} from './actions';
import {
  deleteGame,
  deleteGameFailure,
  deleteGameSuccess,
  postGame,
  postGameFailure,
  postGameSuccess,
  requestGame,
  requestGameFailure,
  requestGamesByFilter,
  requestGamesByFilterFailure,
  requestGamesByFilterSuccess,
  requestGameSuccess
} from './reducer';
import { GameEntity, GameState, initialState } from './state';

describe('deleteGame', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_GAME,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteGame to true', () => {
    expect(deleteGame(initialState, action).isLoadingDeleteGame).toBe(true);
  });
});

describe('deleteGameFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_GAME_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteGame to false', () => {
    expect(deleteGameFailure(initialState, action).isLoadingDeleteGame).toBe(
      false
    );
  });
});

describe('deleteGameSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_GAME_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    games: {
      ['first-id']: {
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
    expect(deleteGameSuccess(deleteState, action).isLoadingDeleteGame).toBe(
      false
    );
  });

  it('remove entity', () => {
    const newState = deleteGameSuccess(deleteState, action);

    expect(newState.games['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: GameState = {
      ...initialState,
      games: {
        ['some-id']: {
          id: 'some-id'
        },
        ...deleteState.games
      }
    };

    const newState = deleteGameSuccess(someState, action);

    expect(newState.games['some-id']).toEqual({
      id: 'some-id'
    });
  });
});

describe('postGame', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_GAME
  };

  it('sets isLoadingPostGame to true', () => {
    expect(postGame(initialState, action).isLoadingPostGame).toBe(true);
  });
});

describe('postGameFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_GAME_FAILURE
  };

  it('sets isLoadingPostGame to false', () => {
    expect(postGameFailure(initialState, action).isLoadingPostGame).toBe(false);
  });
});

describe('postGameSuccess', () => {
  const action: HttpAction<ActionTypes, GameEntity> = {
    type: POST_TOURNAMENT_GAME_SUCCESS,
    payload: {
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
  };

  it('sets isLoadingPostGame to false', () => {
    expect(postGameSuccess(initialState, action).isLoadingPostGame).toBe(false);
  });

  it('set entity', () => {
    const newState = postGameSuccess(initialState, action);

    expect(newState.games['first-id']).toEqual({
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
    });
  });

  it('keeps others entities in other', () => {
    const someState: GameState = {
      ...initialState,
      games: {
        ['some-id']: {
          id: 'some-id',
          awayScore: 30,
          awayTeam: {
            id: 'some-away-team-id',
            name: 'some-away-team'
          },
          datetime: '2019-05-22T03:21:21.248Z',
          homeScore: 40,
          homeTeam: {
            id: 'some-home-team-id',
            name: 'some-home-team'
          },
          location: 'some location'
        }
      }
    };

    const newState = postGameSuccess(someState, action);

    expect(newState.games['some-id']).toEqual({
      id: 'some-id',
      awayScore: 30,
      awayTeam: {
        id: 'some-away-team-id',
        name: 'some-away-team'
      },
      datetime: '2019-05-22T03:21:21.248Z',
      homeScore: 40,
      homeTeam: {
        id: 'some-home-team-id',
        name: 'some-home-team'
      },
      location: 'some location'
    });
  });
});

describe('requestGame', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAME
  };

  it('sets isLoadingRequestGame to true', () => {
    expect(requestGame(initialState, action).isLoadingRequestGame).toBe(true);
  });
});

describe('requestGameFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAME_FAILURE
  };

  it('sets isLoadingRequestGame to false', () => {
    expect(requestGameFailure(initialState, action).isLoadingRequestGame).toBe(
      false
    );
  });
});

describe('requestGameSuccess', () => {
  const action: HttpAction<ActionTypes, GameEntity> = {
    type: REQUEST_TOURNAMENT_GAME_SUCCESS,
    payload: {
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
  };

  it('sets isLoadingRequestGame to false', () => {
    expect(requestGameSuccess(initialState, action).isLoadingRequestGame).toBe(
      false
    );
  });

  it('sets entities', () => {
    const newState = requestGameSuccess(initialState, action);

    expect(newState.games['first-id']).toEqual({
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
    });
  });
});

describe('requestGamesByFilter', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAMES_BY_FILTER
  };

  it('sets isLoadingRequestGames to true', () => {
    expect(
      requestGamesByFilter(initialState, action).isLoadingRequestGames
    ).toBe(true);
  });
});

describe('requestGamesByFilterFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAMES_BY_FILTER_FAILURE
  };

  it('sets isLoadingRequestGames to false', () => {
    expect(
      requestGamesByFilterFailure(initialState, action).isLoadingRequestGames
    ).toBe(false);
  });
});

describe('requestGamesByFilterSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAMES_BY_FILTER_SUCCESS,
    payload: [
      {
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
      },
      {
        id: 'second-id',
        awayScore: 30,
        awayTeam: {
          id: 'second-away-team-id',
          name: 'second-away-team'
        },
        datetime: '2019-05-22T03:21:21.248Z',
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
    ]
  };

  it('sets isLoadingRequestGames to false', () => {
    expect(
      requestGamesByFilterSuccess(initialState, action).isLoadingRequestGames
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestGamesByFilterSuccess(initialState, action);

    expect(newState.games['first-id']).toEqual({
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
    });
    expect(newState.games['second-id']).toEqual({
      id: 'second-id',
      awayScore: 30,
      awayTeam: {
        id: 'second-away-team-id',
        name: 'second-away-team'
      },
      datetime: '2019-05-22T03:21:21.248Z',
      homeScore: 40,
      homeTeam: {
        id: 'second-home-team-id',
        name: 'second-home-team'
      },
      location: 'second location'
    });
  });
});
