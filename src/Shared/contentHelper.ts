const MAX_INITIALS = 3;
const CAPITAL_LETTER_REGEX = /^[A-Z]$/;

export const initials = (name: string): string => {
  const capitalLetters = name
    .split('')
    .filter(char => CAPITAL_LETTER_REGEX.test(char));
  if (capitalLetters.length > 0) {
    return capitalLetters.slice(0, MAX_INITIALS).join('');
  }

  const words = name.split(' ').filter(word => word.length > 0);
  const initialsArray = words.map(word => word[0].toUpperCase());
  return initialsArray.slice(0, MAX_INITIALS).join('');
};
