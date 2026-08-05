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
