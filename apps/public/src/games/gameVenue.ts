export const gameVenue = (location: string, city: string): string =>
  [location, city].filter(Boolean).join(' — ');
