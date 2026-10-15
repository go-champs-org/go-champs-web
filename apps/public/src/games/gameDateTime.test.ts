import { formatGameDateTime, formatGameTime, formatDayDate } from './gameDateTime';

describe('formatGameDateTime', () => {
  it('formats the stored wall clock without shifting it for pt', () => {
    expect(formatGameDateTime('2026-08-01T23:00:00Z', 'pt')).toBe(
      '01/08/2026, 23:00'
    );
  });

  it('formats the same instant with the en-US conventions', () => {
    expect(formatGameDateTime('2026-08-01T23:00:00Z', 'en')).toBe(
      '8/1/26, 11:00 PM'
    );
  });

  it('keeps the stored calendar day regardless of the viewer timezone', () => {
    expect(formatGameDateTime('2026-08-02T00:30:00Z', 'pt')).toBe(
      '02/08/2026, 00:30'
    );
  });

  it('returns an empty string for a game without a date', () => {
    expect(formatGameDateTime('', 'pt')).toBe('');
  });

  it('returns an empty string for an unparseable date', () => {
    expect(formatGameDateTime('not-a-date', 'pt')).toBe('');
  });
});

describe('formatGameTime', () => {
  it('formats only the stored kickoff time', () => {
    expect(formatGameTime('2026-08-01T23:00:00Z', 'pt')).toBe('23:00');
  });

  it('formats the same instant with the en-US conventions', () => {
    expect(formatGameTime('2026-08-01T23:00:00Z', 'en')).toBe('11:00 PM');
  });

  it('returns an empty string for a game without a date', () => {
    expect(formatGameTime('', 'pt')).toBe('');
  });
});

describe('formatDayDate', () => {
  it('formats a day key as a short locale date', () => {
    expect(formatDayDate('2022-12-17', 'pt')).toBe('17/12/2022');
  });

  it('returns an empty string for an invalid day key', () => {
    expect(formatDayDate('not-a-date', 'pt')).toBe('');
  });
});
