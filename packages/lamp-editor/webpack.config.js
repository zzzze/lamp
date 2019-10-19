const path = require('path')
const webpack = require('webpack')

module.exports = {
  name: 'lamp-editor',
  target: 'node',
  entry: './src/index.tsx',
  mode: process.env.LAMP_DEV ? 'development' : 'production',
  optimization:{
    minimize: false,
  },
  context: __dirname,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist/'),
    pathinfo: true,
    filename: '[name].js',
    libraryTarget: 'umd',
    publicPath: path.join(__dirname, 'dist/'),
    devtoolModuleFilenameTemplate: 'webpack-lamp-editor:///[resource-path]',
  },
  resolve: {
    modules: ['src/', 'node_modules', '../../node_modules', 'assets/',].map(x => path.join(__dirname, x)),
    extensions: ['.ts', '.tsx', '.js',],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jsx|tsx?)$/,
        use: {
          loader: 'ts-loader',
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(ttf|eot|otf|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },


			{
				test: /\.stories\.jsx?$/,
				loaders: [require.resolve('@storybook/addon-storysource/loader')],
				enforce: 'pre',
			}, {
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
				test: /\.(png|jpg|jpeg|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader',
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
								if (url.includes('fontawesome') || url.includes('/images/')) {
									return true;
								}
								return false;
							},
						},
					},
					'sass-loader?sourceMap',
				],
			}

    ],
  },
  externals: [
    'electron',
    'fs',
    'os',
    'path',
    /^rxjs/,
    /^react/,
  ],
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}
