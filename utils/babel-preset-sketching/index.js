module.exports = {
  presets: [
    [
      require("@babel/preset-env"),
      {
        targets: {
          browsers: [">0.25%", "not ie 11", "not op_mini all"]
        }
      }
    ],
    require("@babel/preset-flow"),
    require("@babel/preset-react")
  ],
  plugins: [
    require("@babel/plugin-proposal-class-properties"),
    require("@babel/plugin-proposal-object-rest-spread"),
    require("@babel/plugin-transform-classes"),
    require("@babel/plugin-transform-destructuring"),
    require("@babel/plugin-transform-react-constant-elements"),
    require("@babel/plugin-transform-react-display-name")
  ]
};
