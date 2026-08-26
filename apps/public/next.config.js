const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

// If more than one pnpm-workspace.yaml/lockfile is reachable above this
// directory, Next.js's root-inference can walk up too far, warn about
// "multiple lockfiles", and infer the wrong workspace root — which then
// pollutes TypeScript type resolution (duplicate @types/react across the two
// inferred roots, causing spurious "ReactNode is not assignable to
// ReactNode" build errors). Pinning the root explicitly avoids both.
const workspaceRoot = path.join(__dirname, '../..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: workspaceRoot,
  // `next dev` only serves its internal endpoints (/_next/*, /__nextjs*, the HMR
  // socket) to `localhost` and its own hostname; every other origin is blocked by
  // blockCrossSiteDEV. Reaching the dev server from a phone on the LAN therefore
  // returns the SSR HTML but no hydration chunks — the page looks right and no
  // event handler ever fires, with nothing logged client-side. Set DEV_LAN_HOST to
  // this machine's LAN IP (`ipconfig` / `ip addr`) when testing on a real device.
  allowedDevOrigins: process.env.DEV_LAN_HOST
    ? [process.env.DEV_LAN_HOST]
    : [],
  // next-intl and its transitive dependencies (use-intl, intl-messageformat,
  // the @formatjs/* packages) ship ESM-only builds. Listing them here makes
  // both `next build` and `next/jest` (via its pnpm-aware
  // transformIgnorePatterns) transpile these packages instead of leaving
  // their `export` syntax untouched under node_modules.
  transpilePackages: [
    'next-intl',
    'use-intl',
    'intl-messageformat',
    '@formatjs/fast-memoize',
    '@formatjs/icu-messageformat-parser',
    '@formatjs/icu-skeleton-parser',
    '@formatjs/intl-localematcher'
  ],
  turbopack: {
    root: workspaceRoot
  },
  // TypeScript 7 (this repo's version, see apps/public/package.json) ships a
  // different compiler API than TS 5/6 — Next.js 16 needs this flag to use
  // its TypeScript-7-compatible CLI path instead of the legacy compiler API
  // it otherwise expects. Without it, `next build`/`next dev`/`next/jest`
  // fail immediately with "TypeScript 7.0.2 does not provide the compiler
  // API required by Next.js."
  experimental: {
    useTypeScriptCli: true,
    // Barrel packages: rewrite `import { X } from 'pkg'` to the direct module
    // path at build so an island pulling one icon or one component does not
    // drag the whole package into its client chunk (bundle-barrel-imports,
    // Vercel React best practices). The two workspace barrels
    // (@gochamps/ui/@gochamps/api-client) are the ones that reach client
    // islands; react-icons is listed for the same reason.
    optimizePackageImports: [
      '@gochamps/ui',
      '@gochamps/api-client',
      'react-icons'
    ]
  }
};

module.exports = withNextIntl(nextConfig);
