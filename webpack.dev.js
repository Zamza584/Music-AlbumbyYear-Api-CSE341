const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "node",
  entry: "./server.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./server.js",
      filename: "./server.js",
      title: "Production"
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".ejx", ".mjs", ".cjs"]
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist"
  }
};
