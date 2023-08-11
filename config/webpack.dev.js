const path = require('path');

const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const baseConfig = require('./webpack.base');

const indexFilePath = path.resolve(__dirname, '..', 'src', 'index.tsx');

const devConfig = {
  devtool: 'eval-source-map',
  entry: indexFilePath,
  mode: 'development',
  devServer: {
    port: 3002,
    client: {
      progress: true
    },
    compress: true,
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
    }),
    new ModuleFederationPlugin({
      name: 'webrtcMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './WebRTCApp': indexFilePath
      }
    })
  ]
};

module.exports = merge(baseConfig, devConfig);
