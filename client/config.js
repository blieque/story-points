'use strict';

// vue-cli webpack template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
// Heavily modified for code style, Typescript support, and webpack 4.

const path = require('path');
const merge = require('webpack-merge');

// Base configuration containing options common to all environments.
const baseConfig = {
  // Enable TSLint to pick up code style inconsistencies and type errors.
  useTslint: true,
  showTslintErrorsInOverlay: true,

  // Source maps
  useSourceMaps: true,

  // Output paths
  outputRoot: path.resolve(__dirname, 'dist'),
  outputAssetsSubdirectory: 'assets',
  outputPublicPath: '/',
};

const config = {
  // Development-specific configuration options to be merged into the base configuration.
  development: {
    // Paths
    proxyTable: {},

    // Development server settings
    host: '0.0.0.0', // Overwritable by `process.env.HOST`.
    port: 8080, // Overwritable by `process.env.PORT`.
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    // Source maps
    devtool: 'cheap-module-eval-source-map',
    // If you have problems debugging single-file components in devtools, set this to false - it
    // *may* help: https://vue-loader.vuejs.org/en/options.html#cachebusting.
    cacheBusting: true,
  },

  // Production-specific configuration options to be merged into the base configuration.
  production: {
    // Output location for index.html
    index: path.resolve(baseConfig.outputRoot, 'index.html'),

    // Source maps
    devtool: 'source-map',

    // Run the build command with an extra argument to view the bundle analyzer report after build
    // finishes: `npm run build --report`. Set this to `true` or `false` to always or never run it.
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};

// Merge development or production configuration, based on `NODE_ENV`, into the base configuration,
// and export. If `NODE_ENV` is not set, it is defaulted to 'development'.
module.exports = merge(baseConfig, config[process.env.NODE_ENV || 'development'] || {});
