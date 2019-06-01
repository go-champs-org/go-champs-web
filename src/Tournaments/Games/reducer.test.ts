import { HttpAction } from '../Shared/store/interfaces';
import { ActionTypes, DELETE_TOURNAMENT_GAME, DELETE_TOURNAMENT_GAME_FAILURE, DELETE_TOURNAMENT_GAME_SUCCESS, POST_TOURNAMENT_GAME, POST_TOURNAMENT_GAME_FAILURE, POST_TOURNAMENT_GAME_SUCCESS, REQUEST_TOURNAMENT_GAME, REQUEST_TOURNAMENT_GAMES, REQUEST_TOURNAMENT_GAMES_FAILURE, REQUEST_TOURNAMENT_GAMES_SUCCESS, REQUEST_TOURNAMENT_GAME_FAILURE, REQUEST_TOURNAMENT_GAME_SUCCESS } from './actions';
import { deleteTournamentGame, deleteTournamentGameFailure, deleteTournamentGameSuccess, postTournamentGame, postTournamentGameFailure, postTournamentGameSuccess, requestTournamentGame, requestTournamentGameFailure, requestTournamentGames, requestTournamentGamesFailure, requestTournamentGamesSuccess, requestTournamentGameSuccess } from './reducer';
import { initialState, TournamentGameState } from './state';

describe('deleteTournamentGame', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_GAME,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTournamentGame to true', () => {
    expect(
      deleteTournamentGame(initialState, action).isLoadingDeleteTournamentGame
    ).toBe(true);
  });
});

describe('deleteTournamentGameFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_GAME_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTournamentGame to false', () => {
    expect(
      deleteTournamentGameFailure(initialState, action)
        .isLoadingDeleteTournamentGame
    ).toBe(false);
  });
});

describe('deleteTournamentGameSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_GAME_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    tournamentGames: {
      ['first-id']: {
        id: 'first-id',
        awayScore: 10,
        awayTeam: {
          id: 'first-away-team-id',
          name: 'first-away-team',
        },
        datetime: '2019-05-22T03:21:21.248Z',
        homeScore: 20,
        homeTeam: {
          id: 'first-home-team-id',
          name: 'first-home-team',
        },
        location: 'first location',
      },
    },
    tournamentGamesByDate: {
      ['2019-05-22']: {
        ['first-id']: {
          id: 'first-id',
          awayScore: 10,
          awayTeam: {
            id: 'first-away-team-id',
            name: 'first-away-team',
          },
          datetime: '2019-05-22T03:21:21.248Z',
          homeScore: 20,
          homeTeam: {
            id: 'first-home-team-id',
            name: 'first-home-team',
          },
          location: 'first location',
        }
      }
    }
  };

  it('sets isLoadingDeleteTournamentGame to false', () => {
    expect(
      deleteTournamentGameSuccess(deleteState, action)
        .isLoadingDeleteTournamentGame
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = deleteTournamentGameSuccess(deleteState, action);

    expect(newState.tournamentGames['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: TournamentGameState = {
      ...initialState,
      tournamentGames: {
        ['some-id']: {
          id: 'some-id'
        },
        ...deleteState.tournamentGames
      }
    };

    const newState = deleteTournamentGameSuccess(someState, action);

    expect(newState.tournamentGames['some-id']).toEqual({
      id: 'some-id'
    });
  });

  it('remove entity by date', () => {
    const newState = deleteTournamentGameSuccess(deleteState, action);

    expect(newState.tournamentGamesByDate['2019-05-22']).toBeUndefined();
  });

  it('remove entity by date keeping object in the same date', () => {
    const deleteStateWithMultipleEntitiesInSameDate = {
      ...deleteState,
      tournamentGamesByDate: {
        ['2019-05-22']: {
          ['first-id']: {
            id: 'first-id',
            awayScore: 10,
            awayTeam: {
              id: 'first-away-team-id',
              name: 'first-away-team',
            },
            datetime: '2019-05-22T03:21:21.248Z',
            homeScore: 20,
            homeTeam: {
              id: 'first-home-team-id',
              name: 'first-home-team',
            },
            location: 'first location',
          },
          ['second-id']: {
            id: 'second-id',
            awayScore: 30,
            awayTeam: {
              id: 'second-away-team-id',
              name: 'second-away-team',
            },
            datetime: '2019-05-22T05:21:21.248Z',
            homeScore: 40,
            homeTeam: {
              id: 'second-home-team-id',
              name: 'second-home-team',
            },
            location: 'second location',
          }
        }
      }
    };

    const newState = deleteTournamentGameSuccess(
      deleteStateWithMultipleEntitiesInSameDate,
      action
    );

    expect(
      newState.tournamentGamesByDate['2019-05-22']['first-id']
    ).toBeUndefined();
    expect(newState.tournamentGamesByDate['2019-05-22']['second-id']).toEqual({
      id: 'second-id',
      awayScore: 30,
      awayTeam: {
        id: 'second-away-team-id',
        name: 'second-away-team',
      },
      datetime: '2019-05-22T05:21:21.248Z',
      homeScore: 40,
      homeTeam: {
        id: 'second-home-team-id',
        name: 'second-home-team',
      },
      location: 'second location'
    });
  });
});

describe('postTournamentGame', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_GAME
  };

  it('sets isLoadingPostTournamentGame to true', () => {
    expect(
      postTournamentGame(initialState, action).isLoadingPostTournamentGame
    ).toBe(true);
  });
});

describe('postTournamentGameFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_GAME_FAILURE
  };

  it('sets isLoadingPostTournamentGame to false', () => {
    expect(
      postTournamentGameFailure(initialState, action)
        .isLoadingPostTournamentGame
    ).toBe(false);
  });
});

describe('postTournamentGameSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_GAME_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        away_score: 10,
        away_team: {
          id: 'first-away-team-id',
          name: 'first-away-team',
        },
        datetime: '2019-05-22T03:21:21.248Z',
        home_score: 20,
        home_team: {
          id: 'first-home-team-id',
          name: 'first-home-team',
        },
        location: 'first location',
      }
    }
  };

  it('sets isLoadingPostTournamentGame to false', () => {
    expect(
      postTournamentGameSuccess(initialState, action)
        .isLoadingPostTournamentGame
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = postTournamentGameSuccess(initialState, action);

    expect(newState.tournamentGames['first-id']).toEqual({
      id: 'first-id',
      awayScore: 10,
      awayTeam: {
        id: 'first-away-team-id',
        name: 'first-away-team',
      },
      datetime: '2019-05-22T03:21:21.248Z',
      homeScore: 20,
      homeTeam: {
        id: 'first-home-team-id',
        name: 'first-home-team',
      },
      location: 'first location',
    });
  });

  it('keeps others entities in other', () => {
    const someState: TournamentGameState = {
      ...initialState,
      tournamentGames: {
        ['some-id']: {
          id: 'some-id',
          awayScore: 30,
          awayTeam: {
            id: 'some-away-team-id',
            name: 'some-away-team',
          },
          datetime: '2019-05-22T03:21:21.248Z',
          homeScore: 40,
          homeTeam: {
            id: 'some-home-team-id',
            name: 'some-home-team',
          },
          location: 'some location',
        }
      }
    };

    const newState = postTournamentGameSuccess(someState, action);

    expect(newState.tournamentGames['some-id']).toEqual({
      id: 'some-id',
      awayScore: 30,
      awayTeam: {
        id: 'some-away-team-id',
        name: 'some-away-team',
      },
      datetime: '2019-05-22T03:21:21.248Z',
      homeScore: 40,
      homeTeam: {
        id: 'some-home-team-id',
        name: 'some-home-team',
      },
      location: 'some location',
    });
  });
});

describe('requestTournamentGame', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAME
  };

  it('sets isLoadingRequestTournamentGame to true', () => {
    expect(
      requestTournamentGame(initialState, action).isLoadingRequestTournamentGame
    ).toBe(true);
  });
});

describe('requestTournamentGameFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAME_FAILURE
  };

  it('sets isLoadingRequestTournamentGame to false', () => {
    expect(
      requestTournamentGameFailure(initialState, action)
        .isLoadingRequestTournamentGame
    ).toBe(false);
  });
});

describe('requestTournamentGameSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAME_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        away_score: 10,
        away_team: {
          id: 'first-away-team-id',
          name: 'first-away-team',
        },
        datetime: '2019-05-22T03:21:21.248Z',
        home_score: 20,
        home_team: {
          id: 'first-home-team-id',
          name: 'first-home-team',
        },
        location: 'first location',
      }
    }
  };

  it('sets isLoadingRequestTournamentGame to false', () => {
    expect(
      requestTournamentGameSuccess(initialState, action)
        .isLoadingRequestTournamentGame
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestTournamentGameSuccess(initialState, action);

    expect(newState.tournamentGames['first-id']).toEqual({
      id: 'first-id',
      awayScore: 10,
      awayTeam: {
        id: 'first-away-team-id',
        name: 'first-away-team',
      },
      datetime: '2019-05-22T03:21:21.248Z',
      homeScore: 20,
      homeTeam: {
        id: 'first-home-team-id',
        name: 'first-home-team',
      },
      location: 'first location',
    });
  });
});

describe('requestTournamentGames', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAMES
  };

  it('sets isLoadingRequestTournamentGames to true', () => {
    expect(
      requestTournamentGames(initialState, action)
        .isLoadingRequestTournamentGames
    ).toBe(true);
  });
});

describe('requestTournamentGamesFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAMES_FAILURE
  };

  it('sets isLoadingRequestTournamentGames to false', () => {
    expect(
      requestTournamentGamesFailure(initialState, action)
        .isLoadingRequestTournamentGames
    ).toBe(false);
  });
});

describe('requestTournamentGamesSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_GAMES_SUCCESS,
    payload: {
      data: [
        {
          id: 'first-id',
          away_score: 10,
          away_team: {
            id: 'first-away-team-id',
            name: 'first-away-team',
          },
          datetime: '2019-05-22T03:21:21.248Z',
          home_score: 20,
          home_team: {
            id: 'first-home-team-id',
            name: 'first-home-team',
          },
          location: 'first location',
        },
        {
          id: 'second-id',
          away_score: 30,
          away_team: {
            id: 'second-away-team-id',
            name: 'second-away-team',
          },
          datetime: '2019-05-22T03:21:21.248Z',
          home_score: 40,
          home_team: {
            id: 'second-home-team-id',
            name: 'second-home-team',
          },
          location: 'second location',
        },
        {
          id: 'third-id',
          away_score: null,
          away_team: null,
          datetime: '2019-06-22T03:21:21.248Z',
          home_score: null,
          home_team: null,
          location: 'third location',
        }
      ]
    }
  };

  it('sets isLoadingRequestTournamentGames to false', () => {
    expect(
      requestTournamentGamesSuccess(initialState, action)
        .isLoadingRequestTournamentGames
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestTournamentGamesSuccess(initialState, action);

    expect(newState.tournamentGames['first-id']).toEqual({
      id: 'first-id',
      awayScore: 10,
      awayTeam: {
        id: 'first-away-team-id',
        name: 'first-away-team',
      },
      datetime: '2019-05-22T03:21:21.248Z',
      homeScore: 20,
      homeTeam: {
        id: 'first-home-team-id',
        name: 'first-home-team',
      },
      location: 'first location',
    });
    expect(newState.tournamentGames['second-id']).toEqual({
      id: 'second-id',
      awayScore: 30,
      awayTeam: {
        id: 'second-away-team-id',
        name: 'second-away-team',
      },
      datetime: '2019-05-22T03:21:21.248Z',
      homeScore: 40,
      homeTeam: {
        id: 'second-home-team-id',
        name: 'second-home-team',
      },
      location: 'second location',
    });
  });

  it('sets entities by date', () => {
    const newState = requestTournamentGamesSuccess(initialState, action);

    expect(newState.tournamentGamesByDate['2019-05-22']).toEqual({
      ['first-id']: {
        id: 'first-id',
        awayScore: 10,
        awayTeam: {
          id: 'first-away-team-id',
          name: 'first-away-team',
        },
        datetime: '2019-05-22T03:21:21.248Z',
        homeScore: 20,
        homeTeam: {
          id: 'first-home-team-id',
          name: 'first-home-team',
        },
        location: 'first location',
      },
      ['second-id']: {
        id: 'second-id',
        awayScore: 30,
        awayTeam: {
          id: 'second-away-team-id',
          name: 'second-away-team',
        },
        datetime: '2019-05-22T03:21:21.248Z',
        homeScore: 40,
        homeTeam: {
          id: 'second-home-team-id',
          name: 'second-home-team',
        },
        location: 'second location',
      }
    });
  });
});
