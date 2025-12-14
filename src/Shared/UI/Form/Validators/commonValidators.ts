const SLUG_REGEX = RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const EMAIL_REGEX = RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const SIMPLE_PASSWORD_REGEX = RegExp(/^([A-Za-z0-9]+(?:.-[a-z0-9]+)*){6,}$/);
const STRONG_PASSWORD_REGEX = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
);
const USERNAME_REGEX = RegExp(/^([A-Za-z0-9]+(?:.-[a-z0-9]+)*){4,20}$/);

export type ValidatorFunction = (value: any) => string | undefined;
export type AsyncValidatorFunction = (
  value: any
) => Promise<string | undefined>;

export const required = (value: string) =>
  value ? undefined : "Can't be blank";

export const mustBeNumber = (value: any) =>
  isNaN(value) ? 'Must be a number' : undefined;

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

export const mustBeUsername = (value: string) =>
  USERNAME_REGEX.test(value)
    ? undefined
    : 'Must be between 4 and 20 characters';

export const mustBeEmail = (value: string) =>
  EMAIL_REGEX.test(value) ? undefined : 'Must be an email';

export const mustBeStrongPassword = (value: string) =>
  STRONG_PASSWORD_REGEX.test(value)
    ? undefined
    : 'Use at least one: special, lower, upper, numeric character';

export const mustBeSimplePassword = (value: string) =>
  SIMPLE_PASSWORD_REGEX.test(value)
    ? undefined
    : 'Senha precisa ter no mínimo 6 caracteres';

export const mustBeAccountIdentifier = (value: string) => {
  if (!value) return undefined;

  // Check if it contains @ symbol to determine if it's an email or username
  if (value.includes('@')) {
    return mustBeEmail(value);
  } else {
    return mustBeUsername(value);
  }
};

export const composeValidators = (
  validators: ValidatorFunction[],
  asyncValidators: AsyncValidatorFunction[] = []
) => async (value: any) => {
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
