const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    polyfill: "./src/entry/polyfill.js",
    index: "./src/entry/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/entry/index.html",
      minify: {
        //是否去除空格，默认false
        collapseWhitespace: true,
        //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
        minifyCSS: true,
        //是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        loader: "url-loader",
        options: {
          limit: 2048,
          name: "imgs/[name].[ext]"
        }
      },
      {
        test: /\.(ttf|woff|eot|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  }
};
