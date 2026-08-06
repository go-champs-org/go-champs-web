export const modifiedValue = <T, K extends keyof T>(
  formValues: T,
  fieldName: K,
  modified: Partial<Record<keyof T, boolean>>
): string | null | undefined => {
  if (!modified[fieldName]) return undefined;

  return ((formValues[fieldName] as unknown) as string) || null;
};
