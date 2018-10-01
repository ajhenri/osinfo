const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    renderer: './renderer.js',
    background: './resources/js/background.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.js|.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        options: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
      }
    ]
  }
};

module.exports = config;