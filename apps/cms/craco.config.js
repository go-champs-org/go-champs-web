// CRA4's webpack config runs a second babel-loader instance (preset
// "babel-preset-react-app/dependencies") over ESM packages inside node_modules.
// That preset doesn't downlevel optional chaining / nullish coalescing, and
// webpack 4's bundled acorn parser can't read that ES2020 syntax as-is —
// causing "Module parse failed: Unexpected token" for any dependency shipping
// modern ESM (e.g. @amplitude/plugin-web-vitals-browser, @emailjs/browser).
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const oneOfRule = webpackConfig.module.rules.find((rule) => Array.isArray(rule.oneOf));

      if (oneOfRule) {
        oneOfRule.oneOf.forEach((rule) => {
          const isDependenciesBabelLoader =
            rule.loader &&
            rule.loader.includes('babel-loader') &&
            rule.options &&
            Array.isArray(rule.options.presets) &&
            rule.options.presets.some((preset) => {
              const presetPath = Array.isArray(preset) ? preset[0] : preset;
              return typeof presetPath === 'string' && presetPath.includes('dependencies');
            });

          if (isDependenciesBabelLoader) {
            rule.options.plugins = [
              ...(rule.options.plugins || []),
              require.resolve('@babel/plugin-proposal-optional-chaining'),
              require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
              [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
              require.resolve('@babel/plugin-proposal-logical-assignment-operators'),
            ];
          }
        });
      }

      return webpackConfig;
    },
  },
};
