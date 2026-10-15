// The scoreboard operator types the kickoff as a wall-clock time and the API
// stores it as that same UTC wall clock, which the CMS shows untouched. Any
// conversion to another zone would shift every game away from what was typed.
export const GAME_TIME_ZONE = 'UTC';

const LOCALE_TAGS: Record<string, string> = {
  pt: 'pt-BR',
  en: 'en-US'
};

export const localeTag = (locale: string): string =>
  LOCALE_TAGS[locale] || locale;

export const formatGameDateTime = (datetime: string, locale: string): string => {
  const parsed = new Date(datetime);

  if (Number.isNaN(parsed.getTime())) return '';

  return new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: GAME_TIME_ZONE
  }).format(parsed);
};

export const formatDayDate = (dateKey: string, locale: string): string => {
  const parsed = new Date(`${dateKey}T12:00:00Z`);

  if (Number.isNaN(parsed.getTime())) return '';

  return new Intl.DateTimeFormat(localeTag(locale), {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: GAME_TIME_ZONE
  }).format(parsed);
};

// A game inside a day-grouped list has its date in the group heading already;
// repeating it in every row is noise.
export const formatGameTime = (datetime: string, locale: string): string => {
  const parsed = new Date(datetime);

  if (Number.isNaN(parsed.getTime())) return '';

  return new Intl.DateTimeFormat(localeTag(locale), {
    timeStyle: 'short',
    timeZone: GAME_TIME_ZONE
  }).format(parsed);
};
