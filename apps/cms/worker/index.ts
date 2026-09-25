import {
  BLOCKED_ROBOTS_TXT,
  NO_INDEX_HEADER,
  blocksCrawlers,
  isJunkPath,
  isPublicPassthroughPath,
  resolveLocaleFromCookieHeader,
  resolvePublicPath
} from '../src/EdgeRouting/routes';

export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  PUBLIC: { fetch(request: Request): Promise<Response> };
  BLOCK_CRAWLERS?: string;
}

const notFound = (): Response =>
  new Response('Not Found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });

const blockedRobots = (): Response =>
  new Response(BLOCKED_ROBOTS_TXT, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });

// Responses from bindings are immutable; a copy is what takes the header.
const withNoIndex = (response: Response): Response => {
  const copy = new Response(response.body, response);
  copy.headers.set(NO_INDEX_HEADER.name, NO_INDEX_HEADER.value);
  return copy;
};

const forward = (request: Request, url: URL, env: Env): Promise<Response> => {
  // Served by apps/public under this same path — no translation.
  if (isPublicPassthroughPath(url.pathname)) return env.PUBLIC.fetch(request);

  const locale = resolveLocaleFromCookieHeader(request.headers.get('Cookie'));
  const publicPath = resolvePublicPath(url.pathname, locale);

  if (publicPath === null) return env.ASSETS.fetch(request);

  const rewritten = new URL(url);
  rewritten.pathname = publicPath;
  return env.PUBLIC.fetch(new Request(rewritten, request));
};

const route = async (
  request: Request,
  url: URL,
  env: Env
): Promise<Response> => {
  if (isJunkPath(url.pathname)) return notFound();
  if (blocksCrawlers(env.BLOCK_CRAWLERS) && url.pathname === '/robots.txt') {
    return blockedRobots();
  }
  return forward(request, url, env);
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await route(request, new URL(request.url), env);
    return blocksCrawlers(env.BLOCK_CRAWLERS)
      ? withNoIndex(response)
      : response;
  }
};
