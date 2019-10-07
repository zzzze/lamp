const path = require('path')
const webpack = require('webpack')

module.exports = {
  name: 'lamp',
  target: 'node',
  entry: {
    'index.ignore': 'file-loader?name=index.html!pug-html-loader!' + path.resolve(__dirname, './index.pug'),
    preload: path.resolve(__dirname, 'src/entry.preload.ts'),
    bundle: path.resolve(__dirname, 'src/entry.tsx'),
  },
  mode: process.env.LAMP_DEV ? 'development' : 'production',
  optimization:{
    minimize: false,
  },
  context: __dirname,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    pathinfo: true,
    filename: '[name].js',
  },
  resolve: {
    modules: ['src/', 'node_modules', '../node_modules', 'assets/'].map(x => path.join(__dirname, x)),
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.resolve(__dirname, 'tsconfig.json'),
            useBabel: true,
            babelCore: "@babel/core",
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
  externals: {
    child_process: 'commonjs child_process',
    electron: 'commonjs electron',
    'electron-is-dev': 'commonjs electron-is-dev',
    fs: 'commonjs fs',
    module: 'commonjs module',
    mz: 'commonjs mz',
    path: 'commonjs path',
    rxjs: 'commonjs rxjs',
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom',
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}
