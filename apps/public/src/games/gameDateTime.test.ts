import { formatGameDateTime, formatGameTime, formatDayDate } from './gameDateTime';

describe('formatGameDateTime', () => {
  it('formats a UTC instant in Brazilian time for pt', () => {
    expect(formatGameDateTime('2026-08-01T23:00:00Z', 'pt')).toBe(
      '01/08/2026, 20:00'
    );
  });

  it('formats the same instant with the en-US conventions', () => {
    expect(formatGameDateTime('2026-08-01T23:00:00Z', 'en')).toBe(
      '8/1/26, 8:00 PM'
    );
  });

  it('keeps the game in Brazilian time regardless of the viewer locale', () => {
    // 00:30Z is still the previous day in São Paulo — the whole point of
    // pinning the timezone.
    expect(formatGameDateTime('2026-08-02T00:30:00Z', 'pt')).toBe(
      '01/08/2026, 21:30'
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
  it('formats only the kickoff time, in Brazilian time', () => {
    expect(formatGameTime('2026-08-01T23:00:00Z', 'pt')).toBe('20:00');
  });

  it('formats the same instant with the en-US conventions', () => {
    expect(formatGameTime('2026-08-01T23:00:00Z', 'en')).toBe('8:00 PM');
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
