const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
// 主要用于提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 主要用于css压缩、去重
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//压缩JS
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].[hash:5].css",
      chunkFilename: "./css/[name].[hash:5].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: false,
              plugins: [require("autoprefixer"), require("postcss-import")()]
            }
          },
          'less-loader'
        ]
      }
    ]
  },

  optimization:{
    minimizer:[
      //压缩css
      new OptimizeCSSAssetsPlugin({
        //好像不起作用
        // cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
        // cssProcessorOptions: { 
        //   discardComments: { removeAll: true } 
        // },
        // canPrint: true //是否将插件信息打印到控制台
      }),
      //压缩JS
      new TerserPlugin()
    ],
    //代码分离
    splitChunks:{
      	// 这表示将选择哪些块进行优化。当提供一个字符串，有效值为 all, async 和 initial. 提供 all 可以特别强大，因为这意味着即使在异步和非异步块之间也可以共享块。
        chunks: "all",
        // 要生产的块最小大小（以字节为单位）
        minSize: 30000,
        // 分割前必须共享模块的最小块数
        minChunks: 1,
        // 按需加载时的最大并行请求数
        maxAsyncRequests: 5,
        // 入口点处的最大并行请求数
        maxInitialRequests: 3,
        // 拆分块的名称
        name: true,
        cacheGroups: {
          styles: {
            name: "style",
            test: /\.(scss|css)$/,
            chunks: "all",
            enforce: true
          },
          node_modules:{
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all'
          }
        }
    }
  }
});
