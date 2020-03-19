const SLUG_REGEX = RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export type ValidatorFunction = (value: any) => string | undefined;

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

export const composeValidators = (validators: ValidatorFunction[]) => (
  value: any
) => {
  return validators.reduce(
    (
      errors: string[] | undefined,
      validator: (value: any) => string | undefined
    ) => {
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
};
