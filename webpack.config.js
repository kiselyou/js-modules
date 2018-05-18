const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopmentTest = process.env.NODE_ENV === 'development'
let dir = 'app'

dir = 'app-debug'

console.log(dir)

const version = prepareNewVersion(isDevelopmentTest);

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `./${dir}/index.html`,
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
  { from: `${dir}/web/images`, to: version +'/images' },
  { from: `${dir}/web/images`, to: version +'/models' },
  `${dir}/icon.ico`
])

module.exports = {
  entry: `./${dir}/index.js`,
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
      '@app': path.resolve(__dirname, './app'),
      '@app-debug': path.resolve(__dirname, './app-debug'),
      '@helper': path.resolve(__dirname, './helper'),
      '@entity': path.resolve(__dirname, './entity'),
    },
  },
  plugins: [
    WebpackAutoInjectConfig,
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig,
    UglifyJsPluginConfig,
    CopyWebpackPluginConfig
  ]
};

/**
 *
 * @returns {string}
 */
function prepareNewVersion(isDevelopmentTest) {
  if (isDevelopmentTest) {
    return '0.0.0'
  }
  const data = process.env.npm_package_version.split('.')
  return data[0] + '.' + data[1] + '.' + (parseInt(data[2]) + 1)
}