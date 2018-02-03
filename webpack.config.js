const path = require('path');

const stub = (entry, output) => ({
  entry: `./src/${entry}`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: output ? output : entry,
  },
  target: 'electron-main',
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

const main = stub('main.js');
const renderer = stub('renderer.js');

module.exports = [main, renderer];
