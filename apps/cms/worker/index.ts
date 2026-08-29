import { resolvePublicPath } from '../src/EdgeRouting/routes';

export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  PUBLIC: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Next.js internal assets are forwarded verbatim — no path translation.
    if (url.pathname.startsWith('/_next/')) {
      return env.PUBLIC.fetch(request);
    }

    const publicPath = resolvePublicPath(url.pathname);

    if (publicPath !== null) {
      url.pathname = publicPath;
      return env.PUBLIC.fetch(new Request(url, request));
    }

    // Safety net: run_worker_first over-matched, serve the CMS SPA.
    return env.ASSETS.fetch(request);
  }
};
