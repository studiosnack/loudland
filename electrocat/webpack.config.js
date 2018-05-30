const path = require('path');

const stub = (entry, output) => ({
  entry: `./src/${entry}.js`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: output ? output : `${entry}.js`,
  },
  target: `electron-${entry}`,
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
});

const main = stub('main');
const renderer = stub('renderer');

module.exports = [main, renderer];
