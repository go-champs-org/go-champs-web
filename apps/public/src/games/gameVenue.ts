// Both halves are optional in the API: a game can carry a gym with no city, a
// city with no gym, or neither.
export const gameVenue = (location: string, city: string): string =>
  [location, city].filter(Boolean).join(' — ');
