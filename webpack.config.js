const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: {
    app: "./src",
  },
  output: {
    filename: "[name]-[hash:8].js",
    path: path.join(__dirname, "./build"),
    publicPath: "/",
  },
  devtool: "inline-source-map",
  devServer: {
    watchOptions: {
      ignored: /node_modules/,
    },
    compress: true,
    port: 9000,
    host: "127.0.0.1",
    historyApiFallback: {
      index: "/",
      rewrites: [{ from: /^(.*?)$/, to: "/index.html" }],
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:8].css",
    }),
    new CopyWebpackPlugin([
      {
        from: "./static",
        to: "static",
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
};
