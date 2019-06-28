const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: __dirname,
  entry: {
    app: "./src"
  },
  output: {
    filename: "[name]-[hash:8].js",
    path: path.join(__dirname, "./build"),
    publicPath: "/"
  },
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    compress: true,
    port: 9000,
    host: "127.0.0.1"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:8].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      }
    ]
  }
};
