// Games are stored as UTC instants, but the audience — and every scoreboard
// operator typing the schedule in — reads them in Brazilian time. Formatting
// against the viewer's own timezone would also make the server HTML and the
// hydrated markup disagree for anyone outside it.
export const GAME_TIME_ZONE = 'America/Sao_Paulo';

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

// Parsed at noon UTC so America/Sao_Paulo formatting never crosses back into
// the previous calendar day.
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
