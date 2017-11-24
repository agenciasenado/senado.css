const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const autoprefixer = require('autoprefixer')
const mdcss = require('mdcss')

const ENV = process.env.NODE_ENV || 'development'
const PUBLIC_PATH = '/dist/'

const cssChain = [
  'css-loader?sourceMap',
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: () => [
        autoprefixer({ browsers: 'last 2 versions' }),
        mdcss({
          theme: require('mdcss-theme-fabianonunes'),
          examples: {
            css: ['/dist/main.css']
          },
          destination: '/dist/styleguide'
        })
      ]
    }
  }
]

module.exports = {

  entry: {
    main: ['./less/main.less']
  },

  output: {
    publicPath: PUBLIC_PATH,
    filename: '[name].[chunkhash:5].js',
    chunkFilename: '[name].[chunkhash:5].js'
  },

  module: {
    rules: [{
      test: /\.(less)$/,
      loader: ExtractTextPlugin.extract({
        use: cssChain.concat([
          'less-loader?sourceMap'
        ])
      })
    }, {
      test: /\.(svg|woff|ttf|eot|woff2)$/,
      loaders: ['file-loader?name=fonts/[name].[hash:base64:5].[ext]']
    }]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    })
  ],

  stats: { colors: true },

  devtool: ENV === 'production' ? '' : 'cheap-source-map',

  devServer: {
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
    publicPath: '/dist/',
    allowedHosts: [
      'mp2823.senado.gov.br',
      'localhost'
    ],
    contentBase: path.resolve('./dist')
  }
}
