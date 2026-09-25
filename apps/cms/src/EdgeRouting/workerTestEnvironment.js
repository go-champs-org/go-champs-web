const path = require('path');

// pnpm hides jest-environment-node (and a v30 copy exists); follow react-scripts' chain to jest 26's.
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
