import { initials } from './contentHelper';

describe('initials', () => {
  it('returns first max three capitalized letters of the name', () => {
    const result = initials('Open Source Tournament');
    expect(result).toBe('OST');
    const result2 = initials('ITL Cup 2024');
    expect(result2).toBe('ITL');
    const result3 = initials('eSports League');
    expect(result3).toBe('SL');
  });

  it('returns first max three letters when name has no capitalized letters', () => {
    const result = initials('open source tournament');
    expect(result).toBe('OST');
    const result2 = initials('esports league');
    expect(result2).toBe('EL');
    const result3 = initials('ga');
    expect(result3).toBe('G');
  });
});
