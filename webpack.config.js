const path = require("path")

module.exports = {
  entry: {
    bundle: "./src/doc.js"
  },

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "docs")
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: [
          { loader: "babel-loader" }
        ]
      }
    ]
  }
}
