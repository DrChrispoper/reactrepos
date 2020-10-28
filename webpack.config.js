// CURRENTLY JUST A PLACEHOLDER CONFIG - NOT SUITABLE FOR PRODUCTION
// 'npm run start' uses webpack.dev.config

const HtmlWebPackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
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
  entry: './src/index',

  output: {
    filename: 'bundle.js',
    // for react-router https://stackoverflow.com/a/43212553/8741502
    path: resolve(__dirname, 'public'),
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
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },

  devServer: {
    // for react-router https://stackoverflow.com/a/43212553/8741502
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new DefinePlugin(envKeys),
  ],
};
