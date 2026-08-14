const SLUG_REGEX = RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const EMAIL_REGEX = RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const SIMPLE_PASSWORD_REGEX = RegExp(
  /^[A-Za-z0-9!@#$%^&*()_+=\[\]{};:'",.<>?\/\\|-]{6,}$/
);
const STRONG_PASSWORD_REGEX = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
);
const PIN_REGEX = RegExp(/^\d{4,}$/);

// Username format rules, kept in sync with GoChampsApi.Validators.UsernameValidator,
// the single source of truth the API validates account creation and username
// availability against. A change here without a change there makes the form accept
// what the API refuses.
export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 20;
const USERNAME_CHARS_REGEX = RegExp(/^[A-Za-z0-9.-]+$/);

export type UsernameFormatReason =
  | 'too_short'
  | 'too_long'
  | 'invalid_characters';

const USERNAME_REASON_MESSAGES: Record<UsernameFormatReason, string> = {
  too_short: 'usernameTooShort',
  too_long: 'usernameTooLong',
  invalid_characters: 'usernameInvalidCharacters'
};

export type ValidatorFunction = (value: string) => string | undefined;
export type AsyncValidatorFunction = (
  value: string
) => Promise<string | undefined>;

export const required = (value: string) =>
  value ? undefined : "Can't be blank";

export const mustBeNumber = (value: string | number) =>
  isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = (min: number) => (value: number) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const maxValue = (max: number) => (value: number) =>
  isNaN(value) || value <= max ? undefined : `Should be less than ${max}`;

export const maxLength = (max: number) => (value: string) =>
  value
    ? value.length <= max
      ? undefined
      : `Must be ${max} characters or less`
    : undefined;

export const mustBeSlug = (value: string) =>
  SLUG_REGEX.test(value)
    ? undefined
    : 'Must be all lowercase and only alphanumeric or dash characters are accepted';

/**
 * Which format rule a candidate username breaks, or undefined when it breaks
 * none.
 *
 * Rules are evaluated in the same order as the API does — length first,
 * characters after — so both sides report the same reason for the same handle.
 */
export const usernameFormatReason = (
  value: string
): UsernameFormatReason | undefined => {
  const username = value || '';

  if (username.length < USERNAME_MIN_LENGTH) {
    return 'too_short';
  }

  if (username.length > USERNAME_MAX_LENGTH) {
    return 'too_long';
  }

  if (!USERNAME_CHARS_REGEX.test(username)) {
    return 'invalid_characters';
  }

  return undefined;
};

export const mustBeUsername = (value: string) => {
  const reason = usernameFormatReason(value);

  return reason ? USERNAME_REASON_MESSAGES[reason] : undefined;
};

export const mustBeEmail = (value: string) =>
  EMAIL_REGEX.test(value) ? undefined : 'Must be an email';

export const mustBeStrongPassword = (value: string) =>
  STRONG_PASSWORD_REGEX.test(value)
    ? undefined
    : 'Use at least one: special, lower, upper, numeric character';

export const mustBeSimplePassword = (value: string) =>
  SIMPLE_PASSWORD_REGEX.test(value)
    ? undefined
    : 'Senha precisa ter no mínimo 6 caracteres entre letras, números ou símbolos';

export const mustBeAccountIdentifier = (value: string) => {
  if (!value) return undefined;

  // Check if it contains @ symbol to determine if it's an email or username
  if (value.includes('@')) {
    return mustBeEmail(value);
  } else {
    return mustBeUsername(value);
  }
};

export const mustBePin = (value: string) =>
  !value || PIN_REGEX.test(value) ? undefined : 'Must be at least 4 digits';

const cpfCheckDigit = (digits: string, length: number) => {
  const sum = digits
    .slice(0, length)
    .split('')
    .reduce(
      (total, digit, index) => total + Number(digit) * (length + 1 - index),
      0
    );
  const remainder = (sum * 10) % 11;
  return remainder === 10 ? 0 : remainder;
};

export const mustBeCPF = (value: string) => {
  if (!value) return undefined;

  const digits = value.replace(/\D/g, '');

  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
    return 'Must be a valid CPF';
  }

  const firstCheckDigit = cpfCheckDigit(digits, 9);
  const secondCheckDigit = cpfCheckDigit(digits, 10);

  return digits[9] === String(firstCheckDigit) &&
    digits[10] === String(secondCheckDigit)
    ? undefined
    : 'Must be a valid CPF';
};

export const mustHaveAtLeastTwoWords = (value: string) => {
  if (!value) return undefined;

  const words = value
    .trim()
    .split(' ')
    .filter(word => word.length > 0);
  return words.length >= 2 ? undefined : 'Must include first and last name';
};

export const composeValidators = (
  validators: ValidatorFunction[],
  asyncValidators: AsyncValidatorFunction[] = []
) => async (value: string) => {
  const syncErrors = validators.reduce(
    (errors: string[] | undefined, validator: ValidatorFunction) => {
      const validatorError = validator(value);

      if (validatorError) {
        if (errors) {
          return [...errors, validatorError];
        }

        return [validatorError];
      }
      return errors;
    },
    undefined
  );

  if (syncErrors) {
    return syncErrors;
  }

  const asyncErrors = await Promise.all(
    asyncValidators.map((asyncValidator: AsyncValidatorFunction) =>
      asyncValidator(value)
    )
  );

  return asyncErrors.some((asyncError: string | undefined) => !!asyncError)
    ? asyncErrors
    : undefined;
};
