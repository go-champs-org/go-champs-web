const MAX_INITIALS = 3;
const CAPITAL_LETTER_REGEX = /^[A-Z]$/;

/**
 * Placeholder for an organization with no logo: up to three capitals of its
 * name, or the first letter of each word when it has none.
 */
export const initials = (name: string): string => {
  const capitalLetters = name
    .split('')
    .filter(char => CAPITAL_LETTER_REGEX.test(char));
  if (capitalLetters.length > 0) {
    return capitalLetters.slice(0, MAX_INITIALS).join('');
  }

  return name
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .slice(0, MAX_INITIALS)
    .join('');
};
