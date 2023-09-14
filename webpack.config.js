const path = require("path");

module.exports = {
  target: "node",
  entry: "./server.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".mjs", ".cjs"]
  }
};
