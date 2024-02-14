const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new CopyWebpackPlugin({
      patterns: [{ from: "static" }],
    }),
  ],
};
