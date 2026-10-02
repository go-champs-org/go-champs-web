/** @jest-environment node */

import { appendVary } from './appendVary';

describe('appendVary', () => {
  it('sets the values when the response has no Vary yet', () => {
    const headers = new Headers();

    appendVary(headers, ['Cookie', 'Accept-Language']);

    expect(headers.get('Vary')).toBe('Cookie, Accept-Language');
  });

  it('keeps the existing values and appends the new ones', () => {
    const headers = new Headers({ Vary: 'RSC, Next-Router-State-Tree' });

    appendVary(headers, ['Cookie', 'Accept-Language']);

    expect(headers.get('Vary')).toBe(
      'RSC, Next-Router-State-Tree, Cookie, Accept-Language'
    );
  });

  it('does not repeat a value that is already present, ignoring case', () => {
    const headers = new Headers({ Vary: 'cookie, RSC' });

    appendVary(headers, ['Cookie', 'Accept-Language']);

    expect(headers.get('Vary')).toBe('cookie, RSC, Accept-Language');
  });

  it('leaves a wildcard Vary untouched', () => {
    const headers = new Headers({ Vary: '*' });

    appendVary(headers, ['Cookie']);

    expect(headers.get('Vary')).toBe('*');
  });
});
