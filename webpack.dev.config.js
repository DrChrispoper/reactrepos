// Note: currently set up for dev only
const { DefinePlugin } = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const env = require('dotenv').config({
  path: resolve(__dirname, './src/etc/.env'),
}).parsed;

const envKeys = Object.keys(env || process.env).reduce((prev, next) => {
  const targetEnv = env ? env : process.env;
  // use the .env file if we have it otherwise look at the actual environment
  prev[`process.env.${next}`] = JSON.stringify(targetEnv[next]);
  return prev;
}, {});

module.exports = {
  devServer: {
    // for react-router https://stackoverflow.com/a/43212553/8741502
    historyApiFallback: true,
    port: process.env.APPLICATION_PORT,
  },

  entry: ['babel-polyfill', './src/index'],

  output: {
    filename: 'bundle.js',
    // for react-router https://stackoverflow.com/a/43212553/8741502
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        // for normalize.css
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        // for index.html
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      // Files
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'static/[name].[ext]',
        },
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [/node_modules/, /build/, /__test__/],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new DefinePlugin(envKeys),
  ],
};
