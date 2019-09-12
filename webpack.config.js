const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const constants = require('./constants')
const express = require('express')


module.exports = merge({}, config, {
  entry: {
    'editor': [
      `webpack-dev-server/client?${constants.DEV_HOST}:${constants.DEV_PORT}`,
      'webpack/hot/only-dev-server',
      './src/renderer/windows/editor.tsx',
    ],
    'setup': [
      `webpack-dev-server/client?${constants.DEV_HOST}:${constants.DEV_PORT}`,
      'webpack/hot/only-dev-server',
      './src/renderer/windows/setup.tsx'
    ],
    'theme-light': [
      `webpack-dev-server/client?${constants.DEV_HOST}:${constants.DEV_PORT}`,
      'webpack/hot/only-dev-server',
      './src/renderer/styles/themes/light/index.scss'
    ],
    'theme-dark': [
      `webpack-dev-server/client?${constants.DEV_HOST}:${constants.DEV_PORT}`,
      'webpack/hot/only-dev-server',
      './src/renderer/styles/themes/dark/index.scss'
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../webpack-dist/renderer'),
    publicPath: `${constants.DEV_HOST}:${constants.DEV_PORT}/webpack-dist/renderer`,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './'
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: true,
              url: false,
            },
          },
          'sass-loader?sourceMap',
        ],
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'font',
        to: path.join(__dirname, '../webpack-dist/font'),
        context: path.join(__dirname, '../src'),
      },
      {
        from: 'renderer/lib/editor.md/',
        to: path.join(__dirname, '../webpack-dist/editor.md/'),
        context: path.join(__dirname, '../src'),
      }
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery":'jquery',
    }),
    new CleanWebpackPlugin(
      ['../webpack-dist/renderer', '../webpack-dist/font'],
      {
        root: __dirname,
        verbose: true,
        dry: false,
        allowExternal: true,
      }
    ),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
  target: 'electron-renderer',
  resolve: {
    // alias: {
    //   'mditor.js': path.resolve(__dirname, '../src/renderer/lib/mditor/mditor.js'),
    //   'mditor.css': path.resolve(__dirname, '../src/renderer/lib/mditor/mditor.css'),
    // }
  },
  devServer: {
    publicPath: `${constants.DEV_HOST}:${constants.DEV_PORT}/webpack-dist/renderer`,
    before: function (app, server) {
      app.use('/webpack-dist/font', express.static(path.resolve(__dirname, '../src/font')))
    },
    compress: true,
    port: 9000,
    hot: true,
  }
