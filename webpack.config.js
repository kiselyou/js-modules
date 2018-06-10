const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production'
let dir = 'app'
// dir = 'debug'

const version = prepareNewVersion(isProduction);

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `./${dir}/index.html`,
  filename: 'index.html',
  inject: 'body',
});

const ExtractTextPluginConfig = new ExtractTextPlugin(version + '/bundle.min.css')

const UglifyJsPluginConfig = new UglifyJsPlugin({
  sourceMap: true,
  extractComments: true,
  uglifyOptions: {
    mangle: {
      keep_fnames: true
    }
  },
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  { from: `${dir}/web/images`, to: version +'/images' },
  { from: `${dir}/web/models`, to: version +'/models' },
  { from: `${dir}/less/Audiowide`, to: version +'/assets/fonts' },
  { from: `vendor/components-font-awesome/webfonts`, to: version +'/assets/fonts' },
  `${dir}/icon.ico`
])

module.exports = {
  optimization: {
    minimizer: [
      ExtractTextPluginConfig,
    ]
  },
  entry: `./${dir}/index.js`,
  output: {
    path: path.resolve('public'),
    filename: version + '/bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "/assets/fonts/"
          }
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.pcss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 1,
              localIdentName: '[folder]-[local]--[hash:base64:5]',
            }
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.pcss', '.css', '.less'],
    alias: {
      '@app': path.resolve(__dirname, './app'),
      '@app-debug': path.resolve(__dirname, './app-debug'),
      '@helper': path.resolve(__dirname, './helper'),
      '@entity': path.resolve(__dirname, './entity'),
    },
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig,
    UglifyJsPluginConfig,
    CopyWebpackPluginConfig,
  ],
  performance: { hints: false }
};

/**
 *
 * @returns {string}
 */
function prepareNewVersion(isProduction) {
  if (isProduction) {
    return process.env.npm_package_version
  }
  return '0.0.0'
}