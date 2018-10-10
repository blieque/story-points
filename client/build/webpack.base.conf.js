'use strict';

const config = require('../config');

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.resolve(__dirname, '../'),

  entry: {
    app: './src/index.ts',
  },

  output: {
    path: config.outputRoot,
    publicPath: config.outputPublicPath,
    filename: '[name]-[hash].js',
    hashDigestLength: 7,
  },

  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.vue', '.ts', '.sass', '.scss'],
    alias: {
      '@': resolve('src'),
    },
  },

  optimization: {
    noEmitOnErrors: true,
  },

  module: {
    rules: [
      // Vue components
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssSourceMap: config.useSourceMaps,
          cacheBusting: config.cacheBusting,
        },
      },

      // Styles configuration is environment-specific.

      // Scripts
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
          ...(config.useTslint ? ['tslint-loader'] : []),
        ],
      },

      // Static assets
      {
        test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: '[name]-[hash:7].[ext]',
          outputPath: config.outputAssetsSubdirectory,
          // Files smaller than 8 KiB will be imported as data URIs.
          limit: 8192,
        },
      },
    ],
  },

  plugins: [
    // Plugin component of vue-loader, which prevents the need to define webpack loaders twice.
    new VueLoaderPlugin(),
  ],

  node: {
    // Prevent webpack from injecting useless `setImmediate()` polyfill because Vue contains it
    // (although only uses it if it's native).
    setImmediate: false,
    // Prevent webpack from injecting mocks to Node native modules that does not make sense for the
    // client.
    child_process: 'empty',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
