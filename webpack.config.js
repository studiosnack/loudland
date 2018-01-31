module.exports = {
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
