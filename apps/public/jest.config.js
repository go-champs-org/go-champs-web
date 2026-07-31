const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  rootDir: __dirname,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {},
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

module.exports = createJestConfig(customJestConfig);
