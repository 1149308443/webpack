const merge = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "development",
  watch:true,
  watchOptions: {
	ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              hmr: true,
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            options: {
              hmr: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              // 指定启用css modules
              // modules: true,
              // importLoaders: 2
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: [require("autoprefixer")],
            },
          },
          "less-loader",
        ],
      },
    ],
  },
});
