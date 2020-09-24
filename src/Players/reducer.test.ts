import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import { DEFAULT_TOURNAMENT } from '../Tournaments/state';
import {
  ActionTypes,
  deletePlayerFailure,
  deletePlayerStart,
  deletePlayerSuccess,
  patchPlayerFailure,
  patchPlayerStart,
  patchPlayerSuccess,
  postPlayerFailure,
  postPlayerStart,
  postPlayerSuccess
} from './actions';
import playerReducer from './reducer';
import { initialState, PlayerState } from './state';

describe('deletePlayer', () => {
  const action = deletePlayerStart();

  it('sets isLoadingDeletePlayer to true', () => {
    expect(playerReducer(initialState, action).isLoadingDeletePlayer).toBe(
      true
    );
  });
});

describe('deletePlayerFailure', () => {
  const action = deletePlayerFailure('error');

  it('sets isLoadingDeletePlayer to false', () => {
    expect(playerReducer(initialState, action).isLoadingDeletePlayer).toBe(
      false
    );
  });
});

describe('deletePlayerSuccess', () => {
  const action = deletePlayerSuccess('first-id');

  const deleteState = {
    ...initialState,
    players: {
      'first-id': {
        id: 'first-id',
        name: 'first-name',
        facebook: 'first-facebook',
        instagram: 'first-instagram',
        twitter: 'first-twitter',
        username: 'first-username'
      }
    }
  };

  it('sets isLoadingDeletePlayer to false', () => {
    expect(playerReducer(deleteState, action).isLoadingDeletePlayer).toBe(
      false
    );
  });

  it('remove entity', () => {
    const newState = playerReducer(deleteState, action);

    expect(newState.players['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: PlayerState = {
      ...initialState,
      players: {
        'some-id': {
          id: 'some-id',
          name: 'some-name',
          facebook: 'some-facebook',
          instagram: 'some-instagram',
          twitter: 'some-twitter',
          username: 'some-username'
        },
        ...deleteState.players
      }
    };

    const newState = playerReducer(someState, action);

    expect(newState.players['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name',
      facebook: 'some-facebook',
      instagram: 'some-instagram',
      twitter: 'some-twitter',
      username: 'some-username'
    });
  });
});

describe('patchPlayer', () => {
  const action = patchPlayerStart();

  it('sets isLoadingPatchPlayer to true', () => {
    expect(playerReducer(initialState, action).isLoadingPatchPlayer).toBe(true);
  });
});

describe('patchPlayerFailure', () => {
  const action = patchPlayerFailure('error');

  it('sets isLoadingPatchPlayer to false', () => {
    expect(playerReducer(initialState, action).isLoadingPatchPlayer).toBe(
      false
    );
  });
});

describe('patchPlayerSuccess', () => {
  const action = patchPlayerSuccess({
    id: 'first-id',
    name: 'first-name',
    facebook: 'first-facebook',
    instagram: 'first-instagram',
    twitter: 'first-twitter',
    username: 'first-username'
  });

  const updateState: PlayerState = {
    ...initialState,
    players: {
      'first-id': {
        id: 'first-id',
        name: 'first-name',
        facebook: 'first-facebook',
        instagram: 'first-instagram',
        twitter: 'first-twitter',
        username: 'first-username'
      }
    }
  };

  it('sets isLoadingPatchPlayer to false', () => {
    expect(playerReducer(updateState, action).isLoadingPatchPlayer).toBe(false);
  });

  it('set entity', () => {
    const newState = playerReducer(updateState, action);

    expect(newState.players['first-id']).toEqual({
      id: 'first-id',
      name: 'first-name',
      facebook: 'first-facebook',
      instagram: 'first-instagram',
      twitter: 'first-twitter',
      username: 'first-username'
    });
  });

  it('keeps others entities in other', () => {
    const someState: PlayerState = {
      ...updateState,
      players: {
        'some-id': {
          id: 'some-id',
          name: 'some-name',
          facebook: 'some-facebook',
          instagram: 'some-instagram',
          twitter: 'some-twitter',
          username: 'some-username'
        }
      }
    };

    const newState = playerReducer(someState, action);

    expect(newState.players['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name',
      facebook: 'some-facebook',
      instagram: 'some-instagram',
      twitter: 'some-twitter',
      username: 'some-username'
    });
  });
});

describe('postPlayer', () => {
  const action = postPlayerStart();

  it('sets isLoadingPostPlayer to true', () => {
    expect(playerReducer(initialState, action).isLoadingPostPlayer).toBe(true);
  });
});

describe('postPlayerFailure', () => {
  const action = postPlayerFailure('error');

  it('sets isLoadingPostPlayer to false', () => {
    expect(playerReducer(initialState, action).isLoadingPostPlayer).toBe(false);
  });
});

describe('postPlayerSuccess', () => {
  const action = postPlayerSuccess({
    id: 'first-id',
    name: 'first-name',
    facebook: 'first-facebook',
    instagram: 'first-instagram',
    twitter: 'first-twitter',
    username: 'first-username'
  });

  it('sets isLoadingPostPlayer to false', () => {
    expect(playerReducer(initialState, action).isLoadingPostPlayer).toBe(false);
  });

  it('set entity', () => {
    const newState = playerReducer(initialState, action);

    expect(newState.players['first-id']).toEqual({
      id: 'first-id',
      name: 'first-name',
      facebook: 'first-facebook',
      instagram: 'first-instagram',
      twitter: 'first-twitter',
      username: 'first-username'
    });
  });

  it('keeps others entities in other', () => {
    const someState: PlayerState = {
      ...initialState,
      players: {
        'some-id': {
          id: 'some-id',
          name: 'some-name',
          facebook: 'some-facebook',
          instagram: 'some-instagram',
          twitter: 'some-twitter',
          username: 'some-username'
        }
      }
    };

    const newState = playerReducer(someState, action);

    expect(newState.players['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name',
      facebook: 'some-facebook',
      instagram: 'some-instagram',
      twitter: 'some-twitter',
      username: 'some-username'
    });
  });
});

describe('getTournamentSuccess', () => {
  const action: HttpAction<ActionTypes, ApiTournamentWithDependecies> = {
    type: GET_TOURNAMENT_SUCCESS,
    payload: {
      ...DEFAULT_TOURNAMENT,
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug',
      teams: [],
      players: [
        {
          id: 'first-player-id',
          name: 'first player name',
          facebook: 'first-facebook',
          instagram: 'first-instagram',
          twitter: 'first-twitter',
          username: 'first-username'
        },
        {
          id: 'second-player-id',
          name: 'second player name',
          facebook: 'second-facebook',
          instagram: 'second-instagram',
          twitter: 'second-twitter',
          username: 'second-username'
        }
      ],
      organization: {
        id: 'some-org-id',
        name: 'some org name',
        slug: 'some-org-slug'
      },
      phases: []
    }
  };

  it('sets entities', () => {
    const newState = playerReducer(initialState, action);

    expect(newState.players['first-player-id']).toEqual({
      id: 'first-player-id',
      name: 'first player name',
      facebook: 'first-facebook',
      instagram: 'first-instagram',
      twitter: 'first-twitter',
      username: 'first-username'
    });
    expect(newState.players['second-player-id']).toEqual({
      id: 'second-player-id',
      name: 'second player name',
      facebook: 'second-facebook',
      instagram: 'second-instagram',
      twitter: 'second-twitter',
      username: 'second-username'
    });
  });
});
