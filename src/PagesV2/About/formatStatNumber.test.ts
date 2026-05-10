import { formatStatNumber } from './formatStatNumber';

describe('formatStatNumber', () => {
  describe('very small numbers (< 100)', () => {
    it('rounds to nearest 10', () => {
      expect(formatStatNumber(31)).toBe('+30');
      expect(formatStatNumber(35)).toBe('+40');
      expect(formatStatNumber(94)).toBe('+90');
      expect(formatStatNumber(5)).toBe('+10');
      expect(formatStatNumber(4)).toBe('+0');
    });

    it('handles values at 10s boundaries', () => {
      expect(formatStatNumber(10)).toBe('+10');
      expect(formatStatNumber(20)).toBe('+20');
      expect(formatStatNumber(50)).toBe('+50');
      expect(formatStatNumber(90)).toBe('+90');
      expect(formatStatNumber(95)).toBe('+100');
      expect(formatStatNumber(99)).toBe('+100');
    });
  });

  describe('small numbers (>= 100 and < 1000)', () => {
    it('rounds to nearest 100', () => {
      expect(formatStatNumber(315)).toBe('+300');
      expect(formatStatNumber(350)).toBe('+400');
      expect(formatStatNumber(149)).toBe('+100');
      expect(formatStatNumber(150)).toBe('+200');
    });

    it('handles values at hundreds boundaries', () => {
      expect(formatStatNumber(100)).toBe('+100');
      expect(formatStatNumber(200)).toBe('+200');
      expect(formatStatNumber(900)).toBe('+900');
      expect(formatStatNumber(999)).toBe('+1.000');
    });
  });

  describe('large numbers (>= 1000)', () => {
    it('rounds to nearest 1000', () => {
      expect(formatStatNumber(3247)).toBe('+3.000');
      expect(formatStatNumber(1500)).toBe('+2.000');
      expect(formatStatNumber(2499)).toBe('+2.000');
      expect(formatStatNumber(2500)).toBe('+3.000');
      expect(formatStatNumber(5678)).toBe('+6.000');
    });

    it('handles thousands boundaries', () => {
      expect(formatStatNumber(1000)).toBe('+1.000');
      expect(formatStatNumber(2000)).toBe('+2.000');
      expect(formatStatNumber(10000)).toBe('+10.000');
      expect(formatStatNumber(100000)).toBe('+100.000');
    });
  });

  describe('edge cases', () => {
    it('handles zero', () => {
      expect(formatStatNumber(0)).toBe('+0');
    });

    it('handles single digits', () => {
      expect(formatStatNumber(1)).toBe('+0');
      expect(formatStatNumber(3)).toBe('+0');
      expect(formatStatNumber(4)).toBe('+0');
    });

    it('handles rounding at boundaries', () => {
      expect(formatStatNumber(44)).toBe('+40');
      expect(formatStatNumber(45)).toBe('+50');
      expect(formatStatNumber(94)).toBe('+90');
      expect(formatStatNumber(95)).toBe('+100');
    });
  });

  describe('formatting', () => {
    it('always adds "+" prefix', () => {
      expect(formatStatNumber(100)).toMatch(/^\+/);
      expect(formatStatNumber(1000)).toMatch(/^\+/);
      expect(formatStatNumber(5432)).toMatch(/^\+/);
    });

    it('formats with locale separator', () => {
      expect(formatStatNumber(3000)).toBe('+3.000');
      expect(formatStatNumber(10000)).toBe('+10.000');
      expect(formatStatNumber(100000)).toBe('+100.000');
    });

    it('does not add separator for small numbers', () => {
      expect(formatStatNumber(100)).toBe('+100');
      expect(formatStatNumber(500)).toBe('+500');
      expect(formatStatNumber(900)).toBe('+900');
    });
  });
});
