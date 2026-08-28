import { initials } from './initials';

describe('initials', () => {
  it('takes the capitals of the name', () => {
    expect(initials('Clube Ginástico Gaúcho')).toBe('CGG');
  });

  it('stops at three capitals', () => {
    expect(initials('Associação Brasileira De Clubes Esportivos')).toBe('ABD');
  });

  it('falls back to the first letter of each word when there are no capitals', () => {
    expect(initials('liga master')).toBe('LM');
  });
});
