import { switchLocale } from './switchLocale';

describe('switchLocale', () => {
  it('writes the locale cookie and then refreshes, once', () => {
    const calls: string[] = [];

    switchLocale('en', {
      setCookie: value => calls.push(`cookie:${value}`),
      refresh: () => calls.push('refresh')
    });

    expect(calls).toEqual([
      'cookie:NEXT_LOCALE=en; path=/; max-age=31536000; samesite=lax',
      'refresh'
    ]);
  });
});
