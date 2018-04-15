const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const version = process.env.npm_package_version;

const isProd = process.env.NODE_ENV !== 'development'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

const ExtractTextPluginConfig = new ExtractTextPlugin(version + '/bundle.min.css')

const WebpackAutoInjectConfig = new WebpackAutoInject({
  components: {
    AutoIncreaseVersion: true
  },
  componentsOptions: {
      InjectAsComment: {
        tag: 'Build version: {version} - {date}', // default
        dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT' // default
      }
  }
})

const UglifyJsPluginConfig =  new UglifyJsPlugin({
  sourceMap: true,
  extractComments: true
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  { from: 'src/images', to: version +'/images' },
  'src/icon.ico'
])

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('public'),
    filename: version + '/bundle.min.js'
  },
  module: {
    rules: [
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
        use: "babel-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.pcss', '.css'],
    alias: {
      '@base': path.resolve(__dirname, './src'),
      '@module': path.resolve(__dirname, './modules'),
    },
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig,
    WebpackAutoInjectConfig,
    UglifyJsPluginConfig,
    CopyWebpackPluginConfig
  ]
};