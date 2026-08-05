import { initialState, PlayerState } from '../Players/state';
import { ApiGovTypeIdEnum, ApiTaxIdEnum } from '../Shared/httpClient/apiTypes';
import {
  deletingPlayerIdentity,
  playerIdentityByPlayerId,
  playerIdentityLoading,
  savingPlayerIdentity
} from './selectors';
import { DEFAULT_PLAYER_IDENTITY, PlayerIdentityEntity } from './state';

describe('PlayerIdentities selectors', () => {
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

  const state: PlayerState = {
    ...initialState,
    playerIdentities: {
      'player-1': mockPlayerIdentity
    }
  };

  describe('playerIdentityByPlayerId', () => {
    it('returns the entity for a known playerId', () => {
      expect(playerIdentityByPlayerId(state, 'player-1')).toEqual(
        mockPlayerIdentity
      );
    });

    it('returns the default entity for an unknown playerId', () => {
      expect(playerIdentityByPlayerId(state, 'unknown')).toEqual(
        DEFAULT_PLAYER_IDENTITY
      );
    });

    it('returns the default entity for an empty playerId', () => {
      expect(playerIdentityByPlayerId(state, '')).toEqual(
        DEFAULT_PLAYER_IDENTITY
      );
    });
  });

  describe('playerIdentityLoading', () => {
    it('reflects isLoadingRequestPlayerIdentity', () => {
      expect(
        playerIdentityLoading({
          ...state,
          isLoadingRequestPlayerIdentity: true
        })
      ).toBe(true);
      expect(
        playerIdentityLoading({
          ...state,
          isLoadingRequestPlayerIdentity: false
        })
      ).toBe(false);
    });
  });

  describe('savingPlayerIdentity', () => {
    it('is true while posting', () => {
      expect(
        savingPlayerIdentity({
          ...state,
          isLoadingPostPlayerIdentity: true,
          isLoadingPutPlayerIdentity: false
        })
      ).toBe(true);
    });

    it('is true while putting', () => {
      expect(
        savingPlayerIdentity({
          ...state,
          isLoadingPostPlayerIdentity: false,
          isLoadingPutPlayerIdentity: true
        })
      ).toBe(true);
    });

    it('is false when neither is loading', () => {
      expect(
        savingPlayerIdentity({
          ...state,
          isLoadingPostPlayerIdentity: false,
          isLoadingPutPlayerIdentity: false
        })
      ).toBe(false);
    });
  });

  describe('deletingPlayerIdentity', () => {
    it('reflects isLoadingDeletePlayerIdentity', () => {
      expect(
        deletingPlayerIdentity({
          ...state,
          isLoadingDeletePlayerIdentity: true
        })
      ).toBe(true);
      expect(
        deletingPlayerIdentity({
          ...state,
          isLoadingDeletePlayerIdentity: false
        })
      ).toBe(false);
    });
  });
});
