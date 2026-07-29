export interface SignInEntity {
  password: string;
  username: string;
}

export interface SignUpEntity {
  email: string;
  password: string;
  recaptcha: string;
  repeatedPassword: string;
  username: string;
}

export interface FacebookSignUpEntity {
  email: string;
  facebookId: string;
  recaptcha: string;
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
