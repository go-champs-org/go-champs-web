export interface PlayerIdentityEntity {
  playerId: string;
  exists: boolean;
  fullLegalName: string;
  taxIdType: string;
  taxIdLast4: string;
  governmentIdType: string;
  governmentIdLast4: string;
  dateOfBirth: string;
  username: string;
  email: string;
}

export interface PlayerIdentityState {
  isLoadingDeletePlayerIdentity: boolean;
  isLoadingPostPlayerIdentity: boolean;
  isLoadingPutPlayerIdentity: boolean;
  isLoadingRequestPlayerIdentity: boolean;
  playerIdentities: { [playerId: string]: PlayerIdentityEntity };
}

export const initialState: PlayerIdentityState = {
  isLoadingDeletePlayerIdentity: false,
  isLoadingPostPlayerIdentity: false,
  isLoadingPutPlayerIdentity: false,
  isLoadingRequestPlayerIdentity: false,
  playerIdentities: {}
};

export const DEFAULT_PLAYER_IDENTITY: PlayerIdentityEntity = {
  playerId: '',
  exists: false,
  fullLegalName: '',
  taxIdType: 'CPF',
  taxIdLast4: '',
  governmentIdType: 'RG',
  governmentIdLast4: '',
  dateOfBirth: '',
  username: '',
  email: ''
};
