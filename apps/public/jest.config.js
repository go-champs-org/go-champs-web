module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  transform: {
    // Jest runs test files directly through ts-jest/TypeScript (no Next.js
    // build pipeline in between), so it needs its own tsconfig with
    // `jsx: "react-jsx"` — tsconfig.json's `jsx: "preserve"` is correct for
    // `next build`/`next dev` (Next's SWC/webpack loaders handle the JSX
    // transform there) but leaves JSX untouched for ts-jest, which Node
    // cannot execute. See apps/public/tsconfig.jest.json.
    '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }]
  }
};
