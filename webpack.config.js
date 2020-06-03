var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

const htmlPluginObj = {
  template: "./src/index.html",
  filename: "./index.html",
  favicon: "./src/assets/images/favicon.ico",
};

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "build.js",
  },
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    historyApiFallback: true,
    host: "0.0.0.0",
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|ttf)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".scss", "png"],
  },

  plugins: [new HtmlWebpackPlugin(htmlPluginObj)],
};
