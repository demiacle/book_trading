const path = require('path');

module.exports = {
  entry: './src/typescripts/hello.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
      extensions: [ '.ts', '.tsx', '.js' ]
  },
  module: {
      rules: [
          {
              test: /\.tsx?$/,
              loader: 'ts-loader'}
      ]
  }
};