const path = require('path')
const webpack = require('webpack')

module.exports = {
  name: 'lamp-core',
  target: 'node',
  entry: './src/index.tsx',
  mode: process.env.LAMP_DEV ? 'development' : 'production',
  optimization: {
    minimize: false,
  },
  context: __dirname,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    pathinfo: true,
    filename: '[name].js',
    libraryTarget: 'umd',
    devtoolModuleFilenameTemplate: 'webpack-lamp-core:///[resource-path]',
  },
  resolve: {
    modules: ['src/', 'node_modules', '../../node_modules', 'assets/'].map(x =>
      path.join(__dirname, x)
    ),
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|tests/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.resolve(__dirname, 'tsconfig.json'),
            useBabel: true,
            babelCore: '@babel/core',
          },
        },
      },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      },
      {
        test: /\.(ttf|eot|otf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  externals: [
    'electron',
    'fs',
    'os',
    'path',
    'hexo',
    /^rxjs/,
    /^react/,
    /^@material-ui/,
  ],
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
}
