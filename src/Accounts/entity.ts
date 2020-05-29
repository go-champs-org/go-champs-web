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

export interface AccountRecoveryEntity {
  email: string;
  recaptcha: string;
}

export interface PasswordResetEntity {
  email: string;
  password: string;
  recaptcha: string;
  repeatedPassword: string;
  username: string;
}

export interface AccountEntity {
  email: string;
  username: string;
}
