export const gameVenue = (location?: string, court?: string): string =>
  [location, court].filter(Boolean).join(' — ');
