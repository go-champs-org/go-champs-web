const path = require('path');

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
    useTypeScriptCli: true
  }
};

module.exports = nextConfig;
