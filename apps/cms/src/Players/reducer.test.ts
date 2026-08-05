import {
  deletePlayerIdentityFailure,
  deletePlayerIdentityStart,
  deletePlayerIdentitySuccess,
  postPlayerIdentityFailure,
  postPlayerIdentityStart,
  postPlayerIdentitySuccess,
  putPlayerIdentityFailure,
  putPlayerIdentityStart,
  putPlayerIdentitySuccess,
  requestPlayerIdentityFailure,
  requestPlayerIdentityNotFound,
  requestPlayerIdentityStart,
  requestPlayerIdentitySuccess
} from '../PlayerIdentities/actions';
import {
  DEFAULT_PLAYER_IDENTITY,
  PlayerIdentityEntity
} from '../PlayerIdentities/state';
import {
  ApiGovTypeIdEnum,
  ApiTaxIdEnum,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
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
import { DEFAULT_PLAYER, initialState, PlayerState } from './state';
import { DEFAULT_TEAM } from '../Teams/state';

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
        ...DEFAULT_PLAYER,
        id: 'first-id',
        name: 'first-name',
        shirtName: 'first-shirt-name',
        shirtNumber: '1',
        facebook: 'first-facebook',
        instagram: 'first-instagram',
        twitter: 'first-twitter',
        username: 'first-username',
        photoUrl: 'first-photo-url',
        licenseNumber: 'some-license-number'
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
          ...DEFAULT_PLAYER,
          id: 'some-id',
          name: 'some-name',
          shirtName: 'some-shirt-name',
          shirtNumber: '1',
          facebook: 'some-facebook',
          instagram: 'some-instagram',
          twitter: 'some-twitter',
          username: 'some-username',
          photoUrl: 'some-photo-url',
          licenseNumber: 'some-license-number'
        },
        ...deleteState.players
      }
    };

    const newState = playerReducer(someState, action);

    expect(newState.players['some-id']).toEqual({
      ...DEFAULT_PLAYER,
      id: 'some-id',
      name: 'some-name',
      shirtName: 'some-shirt-name',
      shirtNumber: '1',
      facebook: 'some-facebook',
      instagram: 'some-instagram',
      twitter: 'some-twitter',
      username: 'some-username',
      photoUrl: 'some-photo-url',
      licenseNumber: 'some-license-number'
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
    ...DEFAULT_PLAYER,
    id: 'first-id',
    name: 'first-updeted-name',
    shirtName: 'first-updeted-shirt-name',
    shirtNumber: '2',
    facebook: 'first-updeted-facebook',
    instagram: 'first-updeted-instagram',
    twitter: 'first-updeted-twitter',
    username: 'first-updeted-username',
    state: 'not_available',
    photoUrl: 'first-updeted-photo-url',
    licenseNumber: 'some-license-number',
    team: DEFAULT_TEAM,
    teamId: DEFAULT_TEAM.id
  });

  const updateState: PlayerState = {
    ...initialState,
    players: {
      'first-id': {
        ...DEFAULT_PLAYER,
        id: 'first-id',
        name: 'first-name',
        shirtName: 'first-shirt-name',
        shirtNumber: '1',
        facebook: 'first-facebook',
        instagram: 'first-instagram',
        twitter: 'first-twitter',
        username: 'first-username',
        photoUrl: 'first-photo-url',
        licenseNumber: 'some-license-number',
        team: DEFAULT_TEAM,
        teamId: ''
      }
    }
  };

  it('sets isLoadingPatchPlayer to false', () => {
    expect(playerReducer(updateState, action).isLoadingPatchPlayer).toBe(false);
  });

  it('set entity', () => {
    const newState = playerReducer(updateState, action);

    expect(newState.players['first-id']).toEqual({
      ...DEFAULT_PLAYER,
      id: 'first-id',
      name: 'first-updeted-name',
      shirtName: 'first-updeted-shirt-name',
      shirtNumber: '2',
      facebook: 'first-updeted-facebook',
      instagram: 'first-updeted-instagram',
      twitter: 'first-updeted-twitter',
      username: 'first-updeted-username',
      photoUrl: 'first-updeted-photo-url',
      state: 'not_available',
      licenseNumber: 'some-license-number',
      team: DEFAULT_TEAM,
      teamId: DEFAULT_TEAM.id
    });
  });

  it('keeps others entities in other', () => {
    const someState: PlayerState = {
      ...updateState,
      players: {
        'some-id': {
          ...DEFAULT_PLAYER,
          id: 'some-id',
          name: 'some-name',
          shirtName: 'some-shirt-name',
          shirtNumber: '1',
          facebook: 'some-facebook',
          instagram: 'some-instagram',
          twitter: 'some-twitter',
          username: 'some-username',
          photoUrl: 'some-photo-url',
          licenseNumber: 'some-license-number',
          team: DEFAULT_TEAM,
          teamId: ''
        }
      }
    };

    const newState = playerReducer(someState, action);

    expect(newState.players['some-id']).toEqual({
      ...DEFAULT_PLAYER,
      id: 'some-id',
      name: 'some-name',
      shirtName: 'some-shirt-name',
      shirtNumber: '1',
      facebook: 'some-facebook',
      instagram: 'some-instagram',
      twitter: 'some-twitter',
      username: 'some-username',
      photoUrl: 'some-photo-url',
      licenseNumber: 'some-license-number',
      team: DEFAULT_TEAM,
      teamId: ''
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
    ...DEFAULT_PLAYER,
    id: 'first-id',
    name: 'first-name',
    shirtName: 'first-shirt-name',
    shirtNumber: '1',
    facebook: 'first-facebook',
    instagram: 'first-instagram',
    twitter: 'first-twitter',
    username: 'first-username',
    photoUrl: 'first-photo-url',
    licenseNumber: 'first-license-number'
  });

  it('sets isLoadingPostPlayer to false', () => {
    expect(playerReducer(initialState, action).isLoadingPostPlayer).toBe(false);
  });

  it('set entity', () => {
    const newState = playerReducer(initialState, action);

    expect(newState.players['first-id']).toEqual({
      ...DEFAULT_PLAYER,
      id: 'first-id',
      name: 'first-name',
      shirtName: 'first-shirt-name',
      shirtNumber: '1',
      facebook: 'first-facebook',
      instagram: 'first-instagram',
      twitter: 'first-twitter',
      username: 'first-username',
      photoUrl: 'first-photo-url',
      licenseNumber: 'first-license-number',
      team: DEFAULT_TEAM,
      teamId: ''
    });
  });

  it('keeps others entities in other', () => {
    const someState: PlayerState = {
      ...initialState,
      players: {
        'some-id': {
          ...DEFAULT_PLAYER,
          id: 'some-id',
          name: 'some-name',
          shirtName: 'some-shirt-name',
          shirtNumber: '1',
          facebook: 'some-facebook',
          instagram: 'some-instagram',
          twitter: 'some-twitter',
          username: 'some-username',
          photoUrl: 'some-photo-url',
          licenseNumber: 'some-license-number',
          team: DEFAULT_TEAM,
          teamId: ''
        }
      }
    };

    const newState = playerReducer(someState, action);

    expect(newState.players['some-id']).toEqual({
      ...DEFAULT_PLAYER,
      id: 'some-id',
      name: 'some-name',
      shirtName: 'some-shirt-name',
      shirtNumber: '1',
      facebook: 'some-facebook',
      instagram: 'some-instagram',
      twitter: 'some-twitter',
      username: 'some-username',
      photoUrl: 'some-photo-url',
      licenseNumber: 'some-license-number',
      team: DEFAULT_TEAM,
      teamId: ''
    });
  });
});

describe('getTournamentSuccess', () => {
  const action: HttpAction<ActionTypes, ApiTournamentWithDependecies> = {
    type: GET_TOURNAMENT_SUCCESS,
    payload: ({
      ...DEFAULT_TOURNAMENT,
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug',
      teams: [],
      players: [
        {
          id: 'first-player-id',
          name: 'first player name',
          shirt_name: 'first-shirt-name',
          shirt_number: '1',
          facebook: 'first-facebook',
          instagram: 'first-instagram',
          twitter: 'first-twitter',
          username: 'first-username',
          state: 'available',
          photo_url: 'first-photo-url',
          license_number: 'first-license-number'
        },
        {
          id: 'second-player-id',
          name: 'second player name',
          shirt_name: 'second-shirt-name',
          shirt_number: '2',
          facebook: 'second-facebook',
          instagram: 'second-instagram',
          twitter: 'second-twitter',
          username: 'second-username',
          state: 'available',
          photo_url: 'second-photo-url',
          license_number: 'second-license-number'
        }
      ],
      organization: {
        id: 'some-org-id',
        name: 'some org name',
        slug: 'some-org-slug'
      },
      phases: []
    } as unknown) as ApiTournamentWithDependecies
  };

  it('sets entities', () => {
    const newState = playerReducer(initialState, action);

    expect(newState.players['first-player-id']).toEqual({
      id: 'first-player-id',
      name: 'first player name',
      shirtName: 'first-shirt-name',
      shirtNumber: '1',
      facebook: 'first-facebook',
      instagram: 'first-instagram',
      team: DEFAULT_TEAM,
      teamId: '',
      twitter: 'first-twitter',
      username: 'first-username',
      state: 'available',
      photoUrl: 'first-photo-url',
      licenseNumber: 'first-license-number'
    });
    expect(newState.players['second-player-id']).toEqual({
      id: 'second-player-id',
      name: 'second player name',
      shirtName: 'second-shirt-name',
      shirtNumber: '2',
      facebook: 'second-facebook',
      instagram: 'second-instagram',
      team: DEFAULT_TEAM,
      teamId: '',
      twitter: 'second-twitter',
      username: 'second-username',
      state: 'available',
      photoUrl: 'second-photo-url',
      licenseNumber: 'second-license-number'
    });
  });

  it('does not break is null players', () => {
    const emptyResponseAction: HttpAction<
      ActionTypes,
      ApiTournamentWithDependecies
    > = {
      type: GET_TOURNAMENT_SUCCESS,
      payload: (DEFAULT_TOURNAMENT as unknown) as ApiTournamentWithDependecies
    };
    const newState = playerReducer(initialState, emptyResponseAction);

    expect(newState).toEqual(initialState);
  });
});

const mockPlayerIdentity: PlayerIdentityEntity = {
  id: 'identity-1',
  playerId: 'player-1',
  fullLegalName: 'Jane Doe',
  taxIdType: ApiTaxIdEnum.CPF,
  taxIdLast4: '1234',
  governmentIdType: ApiGovTypeIdEnum.RG,
  governmentIdLast4: '5678',
  dateOfBirth: '1990-01-01',
  username: 'janedoe',
  email: 'jane@example.com'
};

describe('deletePlayerIdentity', () => {
  const action = deletePlayerIdentityStart();

  it('sets isLoadingDeletePlayerIdentity to true', () => {
    expect(
      playerReducer(initialState, action).isLoadingDeletePlayerIdentity
    ).toBe(true);
  });
});

describe('deletePlayerIdentityFailure', () => {
  const action = deletePlayerIdentityFailure('error');

  it('sets isLoadingDeletePlayerIdentity to false', () => {
    expect(
      playerReducer(initialState, action).isLoadingDeletePlayerIdentity
    ).toBe(false);
  });
});

describe('deletePlayerIdentitySuccess', () => {
  const action = deletePlayerIdentitySuccess('player-1');

  const deleteState: PlayerState = {
    ...initialState,
    playerIdentities: {
      'player-1': mockPlayerIdentity
    }
  };

  it('sets isLoadingDeletePlayerIdentity to false', () => {
    expect(
      playerReducer(deleteState, action).isLoadingDeletePlayerIdentity
    ).toBe(false);
  });

  it('removes entity', () => {
    const newState = playerReducer(deleteState, action);

    expect(newState.playerIdentities['player-1']).toBeUndefined();
  });

  it('keeps other entities', () => {
    const someState: PlayerState = {
      ...initialState,
      playerIdentities: {
        'player-2': { ...mockPlayerIdentity, playerId: 'player-2' },
        ...deleteState.playerIdentities
      }
    };

    const newState = playerReducer(someState, action);

    expect(newState.playerIdentities['player-2']).toEqual({
      ...mockPlayerIdentity,
      playerId: 'player-2'
    });
  });
});

describe('postPlayerIdentity', () => {
  const action = postPlayerIdentityStart();

  it('sets isLoadingPostPlayerIdentity to true', () => {
    expect(
      playerReducer(initialState, action).isLoadingPostPlayerIdentity
    ).toBe(true);
  });
});

describe('postPlayerIdentityFailure', () => {
  const action = postPlayerIdentityFailure('error');

  it('sets isLoadingPostPlayerIdentity to false', () => {
    expect(
      playerReducer(initialState, action).isLoadingPostPlayerIdentity
    ).toBe(false);
  });
});

describe('postPlayerIdentitySuccess', () => {
  const action = postPlayerIdentitySuccess(mockPlayerIdentity);

  it('sets isLoadingPostPlayerIdentity to false', () => {
    expect(
      playerReducer(initialState, action).isLoadingPostPlayerIdentity
    ).toBe(false);
  });

  it('sets entity', () => {
    const newState = playerReducer(initialState, action);

    expect(newState.playerIdentities['player-1']).toEqual(mockPlayerIdentity);
  });
});

describe('putPlayerIdentity', () => {
  const action = putPlayerIdentityStart();

  it('sets isLoadingPutPlayerIdentity to true', () => {
    expect(playerReducer(initialState, action).isLoadingPutPlayerIdentity).toBe(
      true
    );
  });
});

describe('putPlayerIdentityFailure', () => {
  const action = putPlayerIdentityFailure('error');

  it('sets isLoadingPutPlayerIdentity to false', () => {
    expect(playerReducer(initialState, action).isLoadingPutPlayerIdentity).toBe(
      false
    );
  });
});

describe('putPlayerIdentitySuccess', () => {
  const updatedPlayerIdentity: PlayerIdentityEntity = {
    ...mockPlayerIdentity,
    fullLegalName: 'Jane Updated Doe'
  };
  const action = putPlayerIdentitySuccess(updatedPlayerIdentity);

  const updateState: PlayerState = {
    ...initialState,
    playerIdentities: {
      'player-1': mockPlayerIdentity
    }
  };

  it('sets isLoadingPutPlayerIdentity to false', () => {
    expect(playerReducer(updateState, action).isLoadingPutPlayerIdentity).toBe(
      false
    );
  });

  it('sets entity', () => {
    const newState = playerReducer(updateState, action);

    expect(newState.playerIdentities['player-1']).toEqual(
      updatedPlayerIdentity
    );
  });
});

describe('requestPlayerIdentity', () => {
  const action = requestPlayerIdentityStart();

  it('sets isLoadingRequestPlayerIdentity to true', () => {
    expect(
      playerReducer(initialState, action).isLoadingRequestPlayerIdentity
    ).toBe(true);
  });
});

describe('requestPlayerIdentityFailure', () => {
  const action = requestPlayerIdentityFailure('error');

  it('sets isLoadingRequestPlayerIdentity to false', () => {
    expect(
      playerReducer(initialState, action).isLoadingRequestPlayerIdentity
    ).toBe(false);
  });
});

describe('requestPlayerIdentitySuccess', () => {
  const action = requestPlayerIdentitySuccess(mockPlayerIdentity);

  it('sets isLoadingRequestPlayerIdentity to false', () => {
    expect(
      playerReducer(initialState, action).isLoadingRequestPlayerIdentity
    ).toBe(false);
  });

  it('sets entity', () => {
    const newState = playerReducer(initialState, action);

    expect(newState.playerIdentities['player-1']).toEqual(mockPlayerIdentity);
  });
});

describe('requestPlayerIdentityNotFound', () => {
  const action = requestPlayerIdentityNotFound('player-1');

  it('sets isLoadingRequestPlayerIdentity to false', () => {
    expect(
      playerReducer(initialState, action).isLoadingRequestPlayerIdentity
    ).toBe(false);
  });

  it('sets a default, non-existent entity for the playerId', () => {
    const newState = playerReducer(initialState, action);

    expect(newState.playerIdentities['player-1']).toEqual({
      ...DEFAULT_PLAYER_IDENTITY,
      playerId: 'player-1'
    });
  });
});
