import { gameVenue } from './gameVenue';

describe('gameVenue', () => {
  it('joins the gym and the city', () => {
    expect(gameVenue('Ginásio Municipal', 'São Paulo')).toBe(
      'Ginásio Municipal — São Paulo'
    );
  });

  it('keeps the only half it has, with no dangling separator', () => {
    expect(gameVenue('Ginásio Municipal', '')).toBe('Ginásio Municipal');
    expect(gameVenue('', 'São Paulo')).toBe('São Paulo');
  });

  it('is empty when the game has no venue at all', () => {
    expect(gameVenue('', '')).toBe('');
  });
});
