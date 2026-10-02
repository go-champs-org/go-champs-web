const fs = require('fs');
const http = require('http');
const ts = require('typescript');

// CRA loads this file with plain Node, so the Worker's TypeScript routing
// table is transpiled on the fly instead of duplicated here.
require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019
    }
  });
  module._compile(outputText, filename);
};

const {
  isJunkPath,
  isPublicPassthroughPath,
  resolveLocaleFromCookieHeader,
  resolvePublicPath
} = require('./EdgeRouting/routes');

const PUBLIC_DEV_URL = new URL(
  process.env.PUBLIC_DEV_URL || 'http://localhost:3001'
);

// Paths the dev server itself owns; routes.ts would otherwise read
// /sockjs-node/info as a tournament page.
const DEV_SERVER_PREFIXES = ['/static/', '/sockjs-node'];

const isDevServerPath = pathname =>
  DEV_SERVER_PREFIXES.some(prefix => pathname.startsWith(prefix));

const publicTarget = (req, pathname, search) => {
  if (isPublicPassthroughPath(pathname)) return `${pathname}${search}`;

  const locale = resolveLocaleFromCookieHeader(req.headers.cookie || null);
  const publicPath = resolvePublicPath(pathname, locale);

  return publicPath === null ? null : `${publicPath}${search}`;
};

const forward = (req, res, next, path) => {
  const upstream = http.request(
    {
      hostname: PUBLIC_DEV_URL.hostname,
      port: PUBLIC_DEV_URL.port,
      method: req.method,
      path,
      headers: req.headers
    },
    upstreamRes => {
      res.writeHead(upstreamRes.statusCode, upstreamRes.headers);
      upstreamRes.pipe(res);
    }
  );

  // apps/public not running: fall back to the CMS SPA, like a CMS-only dev session.
  upstream.on('error', () => (res.headersSent ? res.end() : next()));
  req.pipe(upstream);
};

module.exports = app => {
  app.use((req, res, next) => {
    const { pathname, search } = new URL(req.url, 'http://localhost');

    if (isDevServerPath(pathname)) return next();

    if (isJunkPath(pathname)) {
      res.statusCode = 404;
      return res.end('Not Found');
    }

    const path = publicTarget(req, pathname, search);

    return path === null ? next() : forward(req, res, next, path);
  });
};
