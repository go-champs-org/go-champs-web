import {
  isPublicPassthroughPath,
  resolveLocaleFromCookieHeader,
  resolvePublicPath
} from '../src/EdgeRouting/routes';

export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  PUBLIC: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Served by apps/public under this same path — no translation.
    if (isPublicPassthroughPath(url.pathname)) {
      return env.PUBLIC.fetch(request);
    }

    // Keeps the language picked in either app when crossing into the other:
    // both write this same cookie (next-intl's middleware on apps/public,
    // Shared/translations/i18n.ts here) on an explicit change.
    const locale = resolveLocaleFromCookieHeader(
      request.headers.get('Cookie')
    );
    const publicPath = resolvePublicPath(url.pathname, locale);

    if (publicPath !== null) {
      url.pathname = publicPath;
      return env.PUBLIC.fetch(new Request(url, request));
    }

    // run_worker_first over-matched; the CMS still owns this path.
    return env.ASSETS.fetch(request);
  }
};
