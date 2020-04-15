const SLUG_REGEX = RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const EMAIL_REGEX = RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim);

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

export const mustBeSlug = (value: string) =>
  SLUG_REGEX.test(value)
    ? undefined
    : 'Must be all lowercase and only alphanumeric or dash characters are accepted';

export const mustBeEmail = (value: string) =>
  EMAIL_REGEX.test(value) ? undefined : 'Must be an email';

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
