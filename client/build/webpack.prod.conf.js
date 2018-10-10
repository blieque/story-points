'use strict';

const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  // Set minification, `NODE_ENV`, and several production-friendly plugins.
  mode: 'production',
  devtool: config.useSourceMaps ? config.devtool : false,

  optimization: {
    minimizer: [
      new UglifyJsPlugin({ sourceMap: config.useSourceMaps }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          /**
           * This configuration doesn't currently get passed properly to cssnano and, by extension,
           * PostCSS. A work-around is possible by modifying OptimizeCSSAssetsPlugin:
           * https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/71#issuecomment-412143710
           * Without this work-around, the build will succeed, but "advanced" cssnano transforms
           * like Autoprefixer will not be applied.
           */
          map: config.useSourceMaps,
          preset: ['advanced', {
            autoprefixer: { add: true },
          }],
        },
      }),
    ],
  },

  output: {
    path: config.outputRoot,
  },

  module: {
    rules: [
      // Styles
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    // Generate index.html with injected bundle references and minification.
    // See:
    // - https://github.com/ampedandwired/html-webpack-plugin.
    // - https://github.com/kangax/html-minifier#options-quick-reference
    new HtmlPlugin({
      filename: config.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      // Necessary to consistently work with multiple chunks.
      chunksSortMode: 'dependency',
    }),

    // Extract CSS into its own file.
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: '[id]-[contenthash].css',
    }),

    // Minimise bundle changes, improving cache effectiveness.
    new webpack.HashedModuleIdsPlugin(),

    // Enable scope hoisting.
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
});

module.exports = webpackConfig;
