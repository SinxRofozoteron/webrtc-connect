const path = require('path');

const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = require('./webpack.base');

const devConfig = {
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
  mode: 'development',
  devServer: {
    port: 3002,
    client: {
      progress: true
    },
    compress: true,
    http2: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'index.html')
    }),
    new ForkTsCheckerWebpackPlugin({
      logger: 'webpack-infrastructure',
      typescript: {
        configFile: path.resolve(__dirname, '..', 'tsconfig.json')
      },
      devServer: true
    })
  ]
};

module.exports = merge(baseConfig, devConfig);
