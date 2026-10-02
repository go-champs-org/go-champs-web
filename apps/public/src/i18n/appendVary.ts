const splitValues = (header: string | null): string[] =>
  (header ?? '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);

const isMissingFrom = (existing: string[]) => (value: string) =>
  !existing.some(current => current.toLowerCase() === value.toLowerCase());

export const appendVary = (headers: Headers, values: string[]): void => {
  const existing = splitValues(headers.get('Vary'));

  if (!existing.includes('*')) {
    headers.set(
      'Vary',
      [...existing, ...values.filter(isMissingFrom(existing))].join(', ')
    );
  }
};
