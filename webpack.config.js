const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const paths = {
  SRC: path.resolve(__dirname, "src"),
  DIST: path.resolve(__dirname, "dist"),
  PUBLIC: path.resolve(__dirname, "public")
};

module.exports = {
  entry: path.join(paths.SRC, "index.js"),
  output: {
    path: path.PUBLIC,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      App: paths.SRC
    }
  },
  devServer: {
    compress: true,
    port: 8000,
    https: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.DIST, "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false
    })
  ]
};
