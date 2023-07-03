const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new CompressionPlugin(),
    new MiniCssExtractPlugin({
      chunkFilename: 'chunk.[contenthash].css',
      filename: '[name].[contenthash].css'
    })
  ]
};

module.exports = merge(baseConfig, prodConfig);
