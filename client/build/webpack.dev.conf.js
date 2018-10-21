'use strict';

const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

const webpack = require('webpack');
const merge = require('webpack-merge');
const portfinder = require('portfinder');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async function webpackConfig() {
  portfinder.basePort = (process.env.PORT && Number(process.env.PORT)) || config.port;
  const port = await portfinder.getPortPromise();
  const host = process.env.HOST || config.host;

  return merge(baseWebpackConfig, {
    mode: 'development',
    devtool: config.devtool,

    module: {
      rules: [
        // Styles
        {
          test: /\.s(a|c)ss$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            },
          ],
        },
      ],
    },

    devServer: {
      host,
      port,
      proxy: {
        '/data/*': {
          target: 'http://127.0.0.1:3000',
          ws: true,
        },
      },
    },

    plugins: [
      // Minimise bundle changes, reducing the number of module reloads.
      new webpack.NamedModulesPlugin(),

      // Load index markup and inject asset tags.
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
      }),
    ],
  });
};
