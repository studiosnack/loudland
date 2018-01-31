module.exports = {
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
          options: {
            presets: [
              '@babel/preset-flow',
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['Electron >= 1.7.11'],
                  },
                  useBuiltIns: 'entry',
                },
              ],
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties', {loose: true}],
            ],
          },
        },
      },
    ],
  },
};
