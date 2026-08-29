import {
  isPublicPassthroughPath,
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

    const publicPath = resolvePublicPath(url.pathname);

    if (publicPath !== null) {
      url.pathname = publicPath;
      return env.PUBLIC.fetch(new Request(url, request));
    }

    // run_worker_first over-matched; the CMS still owns this path.
    return env.ASSETS.fetch(request);
  }
};
