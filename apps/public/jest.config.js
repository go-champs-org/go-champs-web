const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  rootDir: __dirname,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {},
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // SWC rewrites aliased import statements while transforming, but a runtime
  // require() of an aliased path still goes through Jest's own resolver.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
};

module.exports = createJestConfig(customJestConfig);
