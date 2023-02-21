const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map", // eval
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "dist", "index.html"),
      template: "src/index.ejs",
      inject: true,
      hash: true,
    }),
    new webpack.DefinePlugin({
      APP_STAGE: JSON.stringify('build'),
    }),
  ],
});
