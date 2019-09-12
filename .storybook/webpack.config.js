const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = ({ config, mode }) => {
  config.plugins = [
    ...config.plugins,
    new CopyWebpackPlugin([
      {
        from: 'editor.md/plugins',
        to: path.join(__dirname, '../node_modules/@storybook/core/dist/public/plugins'),
        context: path.join(__dirname, '../node_modules'),
      },
      {
        from: 'editor.md/images',
        to: path.join(__dirname, '../node_modules/@storybook/core/dist/public/images'),
        context: path.join(__dirname, '../node_modules'),
      },
    ]),
  ]
  config.module.rules.push({
    test: require.resolve('jquery'),
    loader: 'exports-loader?window.JQuery!script-loader'
  }, {
    test: require.resolve('editor.md/editormd.js'),
    loader: 'exports-loader?window.editormd!script-loader'
  }, {
    test: require.resolve('editor.md/lib/codemirror/lib/codemirror.js'),
    loader: 'exports-loader?window.CodeMirror!script-loader'
  }, {
    test: require.resolve('editor.md/lib/marked.min.js'),
    loader: 'exports-loader?window.marked!script-loader'
  }, {
    test: require.resolve('editor.md/lib/codemirror/modes.min.js'),
    loader: 'exports-loader?window.modes!script-loader'
  }, {
    test: require.resolve('editor.md/lib/codemirror/addons.min.js'),
    loader: 'exports-loader?window.addons!script-loader'
  }, {
    test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
    loader: 'url-loader',
    exclude: /node_modules/,
    options: {
      limit: 10000,
    },
  }, {
    test: /\.scss/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          import: false,
          sourceMap: true,
          url: (url, resourcePath) => {
            if (url.includes('fontawesome')) {
              return true;
            }
            return false;
          },
        },
      },
      'sass-loader?sourceMap',
    ],
  })

  return config
}
