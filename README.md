## webpack部分
#### 起步
	新建文件夹 react 执行npm init 
	执行命令npm install webpack webpack-cli --save-dev 下载webpack
#### 配置入口文件和webpack
	新建build文件夹  webpack.common.js; webpakc.dev.js;webpack.prod.js
	新建src目录用来放客户端代码  entry文件夹 放入口文件 index.js
#### 配置build命令测试
	配置webpack入口和出口
	npm install --save lodash
	新建dist文件夹 index.html 
	修改build命令 "build":"webpack --config ./build/webpack.common.js"
#### 添加loader
	npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env --save-dev编译es6   注意：babel编译会报错 我们需要npm i babel-polyfill --save-dev 并且在entry新建polyfill.js文件 并在webpack中添加入口文件
	npm install url-loader file-loader --save-dev 	加载静态图片文字
	npm i node-sass css-loader style-loader sass-loader --save-dev 加载css和scss
```javascript
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
```
#### 开发配置

1. 下载模板插件
npm install --save-dev html-webpack-plugin 
在入口文件夹新建模板index.html
webpack.common.js中配置
```javascript
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
}),
```
1.  下载清空dist目录插件
npm install clean-webpack-plugin --save-dev
配置 new CleanWebpackPlugin(),
1. 开发生产分离
npm install --save-dev webpack-dev-server  下载模拟服务器
npm install --save-dev webpack-merge   分离开发和生产环境
在webpack.dev.js和webpack.prod.js中引入webpack.common.js 并在dev中配置webpack-dev-server
```javascript
devServer: {
	hot: true,
	historyApiFallback: true, //页面出错不会弹出 404 页面。
	compress: true, //开启虚拟服务器时，为你的代码进行压缩
	port: 8080
	// open:true
	// proxy:{
	//     "/api": {
	//         target: urlEnv.api,
	//         secure: true,
	//         changeOrigin: true
	//     }
	// }
},
```
	启用webpack热更新插件
new webpack.NamedModulesPlugin(),
new webpack.HotModuleReplacementPlugin()
	指定生产环境   配置webpack.prod.js
const webpack = require("webpack");
new webpack.DefinePlugin({
	"process.env.NODE_ENV": JSON.stringify("production")
})
	配置webpack.common.js后缀名和路径
resolve: {
    extensions: [".js", ".vue", ".json", ".css", ".scss", ".html"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },

	配置 npm run dev 修改npm run build 
"build": "webpack --config ./build/webpack.prod.js",
"dev": "webpack-dev-server  --config ./build/webpack.dev.js"

