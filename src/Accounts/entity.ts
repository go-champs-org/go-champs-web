export interface UserEntity {
  email: string;
  password: string;
}

export interface SignUpEntity {
  email: string;
  password: string;
  recaptcha: string;
  repeatedPassword: string;
}

export interface AccountEntity {
  email: string;
}
