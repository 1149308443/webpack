const merge = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "development",
  devServer: {
    hot: true,
    historyApiFallback: true, //页面出错不会弹出 404 页面。
    compress: true, //开启虚拟服务器时，为你的代码进行压缩
    port: 8080
    // open:true
    // proxy:{
    //     "/api": {
    //         //接口域名
    //         target: urlEnv.api,
    //          //如果是https接口，需要配置这个参数
    //         secure: true,
    //          // 如果接口跨域，需要进行这个参数配置
    //         changeOrigin: true
    //     }
    // }
  },
  module:{
    rules:[
      {
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							hmr: true,
						},
					},
					'css-loader',
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							hmr: true,
						},
					},
					{
						loader: 'css-loader',
						options: {
              // 指定启用css modules
              // modules: true,
              // importLoaders: 2
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							sourceMap: true,
							plugins: [
								require('autoprefixer'),
							],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
      }
    ]
  }
});
