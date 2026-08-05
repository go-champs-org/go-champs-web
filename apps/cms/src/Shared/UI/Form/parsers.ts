export const stripNonDigits = (value: string): string =>
  value ? value.replace(/\D/g, '') : value;
