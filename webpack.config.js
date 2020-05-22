const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const ENV = process.env.NODE_ENV || 'development'
const PUBLIC_PATH = '/dist/'

const cssChain = [
  'css-loader?sourceMap',
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: () => [
        autoprefixer(),
      ]
    }
  },
  'resolve-url-loader',
  'sass-loader?sourceMap'
]

module.exports = (env = {}, argv) => ({

  entry: {
    main: ['./less/main.scss']
  },

  output: {
    publicPath: PUBLIC_PATH,
    filename: '[name].[chunkhash:5].js',
    chunkFilename: '[name].[chunkhash:5].js'
  },

  module: {
    rules: [{
      test: /\.(scss)$/,
      use: [argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader].concat(cssChain)
    }, {
      test: /\.(svg|woff|ttf|eot|woff2)$/,
      loaders: ['file-loader?name=fonts/[name].[hash:base64:5].[ext]']
    }]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].css' })
  ],

  stats: { colors: true },

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin()
    ]
  },

  devtool: ENV === 'production' ? '' : 'cheap-source-map',

  devServer: {
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
    publicPath: '/dist/',
    contentBase: path.resolve('./dist')
  }
})
