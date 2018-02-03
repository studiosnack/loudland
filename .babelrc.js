module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-flow',
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
  plugins: [['@babel/plugin-proposal-class-properties', {loose: true}]],
};
