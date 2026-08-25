import { sideEmphasis } from './sideEmphasis';

describe('sideEmphasis', () => {
  it('leads with the side that won and steps the other back', () => {
    expect(sideEmphasis('home', 'home')).toBe('winner');
    expect(sideEmphasis('home', 'away')).toBe('loser');
  });

  it('leaves both sides alone while the game is undecided', () => {
    expect(sideEmphasis(undefined, 'home')).toBe('neutral');
    expect(sideEmphasis(undefined, 'away')).toBe('neutral');
  });
});
