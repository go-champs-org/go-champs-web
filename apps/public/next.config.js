const path = require('path');

// This worktree lives nested inside the main repo checkout
// (.claude/worktrees/<id>/apps/public), so Next.js's root-inference walks up
// past this worktree's own pnpm-workspace.yaml and also finds the outer
// repo's pnpm-workspace.yaml/lockfile, warns about "multiple lockfiles", and
// (critically) infers the wrong workspace root — which then pollutes
// TypeScript type resolution (duplicate @types/react from the outer repo's
// tree colliding with this worktree's own, causing spurious
// "ReactNode is not assignable to ReactNode" build errors). Pinning the root
// explicitly to this worktree fixes both the warning and the type errors.
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
