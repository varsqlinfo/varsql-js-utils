const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'varsql.db.util.js',
    library: 'VARSQLUtils',  // export 모듈명
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/u,
        exclude: /node_modules/u,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/u,
        exclude: /node_modules/u,
        use: ['babel-loader'],
      },
    ],
  },
};
