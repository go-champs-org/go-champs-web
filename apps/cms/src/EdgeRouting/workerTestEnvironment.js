const path = require('path');

// pnpm's isolation keeps jest-environment-node out of apps/cms's own node_modules;
// walk react-scripts's own dependency chain (jest -> jest-cli -> @jest/core ->
// jest-config -> jest-environment-node) to find the copy jest 26 itself uses.
const resolveDepDir = (specifier, fromDir) =>
  path.dirname(require.resolve(specifier, { paths: [fromDir] }));

const reactScriptsDir = resolveDepDir('react-scripts/package.json', __dirname);
const jestDir = resolveDepDir('jest/package.json', reactScriptsDir);
const jestCliDir = resolveDepDir('jest-cli/package.json', jestDir);
const jestCoreDir = resolveDepDir('@jest/core/package.json', jestCliDir);
const jestConfigDir = resolveDepDir('jest-config/package.json', jestCoreDir);
const NodeEnvironment = require(require.resolve('jest-environment-node', {
  paths: [jestConfigDir]
}));

// Jest 26's node environment does not copy Node's fetch classes into the sandbox.
class WorkerTestEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    Object.assign(this.global, { Request, Response, Headers });
  }
}

module.exports = WorkerTestEnvironment;
