/** @jest-environment node */
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = jest.fn();

jest.mock('next-intl/middleware', () => ({
  __esModule: true,
  default: () => (request: unknown) => intlMiddleware(request)
}));

import middleware from './middleware';

const requestTo = (path: string) =>
  new NextRequest(new URL(path, 'https://go-champs.test'));

describe('middleware', () => {
  beforeEach(() => {
    intlMiddleware.mockReset();
  });

  it('redirects a legacy locale url to the clean path, keeping the query', () => {
    const response = middleware(requestTo('/en/cbb?tab=jogos'));
    const cookie = response.headers.get('set-cookie');

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe(
      'https://go-champs.test/cbb?tab=jogos'
    );
    expect(cookie).toContain('NEXT_LOCALE=en');
    expect(cookie).toContain('Path=/');
    expect(cookie).toContain('Max-Age=31536000');
    expect(cookie).toMatch(/SameSite=lax/i);
    expect(intlMiddleware).not.toHaveBeenCalled();
  });

  it('redirects a bare locale prefix to the root', () => {
    const response = middleware(requestTo('/pt'));

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://go-champs.test/');
  });

  it('delegates a clean url to next-intl and marks the response as varying by Cookie and Accept-Language', () => {
    const request = requestTo('/cbb');
    intlMiddleware.mockReturnValue(
      NextResponse.next({ headers: { Vary: 'RSC' } })
    );

    const response = middleware(request);

    expect(intlMiddleware).toHaveBeenCalledWith(request);
    expect(response.headers.get('vary')).toBe('RSC, Cookie, Accept-Language');
  });
});
