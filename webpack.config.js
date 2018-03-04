const path = require('path');

module.exports = {
  entry: { 'z-order-js': './src/ts/z-order-calculator.ts' },
  mode: 'development',
  resolve: {
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src/ts')
    ],
    extensions: ['.ts']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader'
    }]
  },
  devtool: 'source-map',
  output: {
    filename: 'z-order-js.js',
    libraryTarget: 'umd'
  }
};

