export interface SignInEntity {
  password: string;
  username: string;
}

export interface SignUpEntity {
  // The current legal document versions the user accepted (GC-346).
  acceptedLegalDocumentIds: string[];
  email: string;
  password: string;
  recaptcha: string;
  repeatedPassword: string;
  username: string;
}

export interface FacebookSignInEntity {
  facebookId: string;
}

export interface AccountRecoveryEntity {
  email: string;
  recaptcha: string;
}

export interface AccountResetEntity {
  password: string;
  recaptcha: string;
  recoveryToken: string;
  repeatedPassword: string;
  username: string;
}

export interface AccountEntity {
  email: string;
  username: string;
}
