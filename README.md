## webpack部分
#### 1.起步
	新建文件夹 react 执行npm init 
	执行命令npm install webpack webpack-cli --save-dev 下载webpack
#### 2.配置入口文件和webpack
	新建build文件夹  webpack.common.js; webpakc.dev.js;webpack.prod.js
	新建src目录用来放客户端代码  entry文件夹 放入口文件 index.js
#### 3.配置build命令测试
	配置webpack入口和出口
	npm install --save lodash
	新建dist文件夹 index.html 
	修改build命令 "build":"webpack --config ./build/webpack.common.js"
#### 4.添加loader
	npm install url-loader file-loader --save-dev 	加载静态图片文字
	处理css

    		npm i style-loader css-loader sass-loader node-sass -D
#### 5.配置babel
```
1. 说明作用

	babel是用来解析es6语法或者es7语法分解析器，让开发者能够使用新的es语法，同时支持jsx,vue等多种框架。	

2. 安装babel
	
	npm i @babel/core babel-loader -D

2. 配置babel文件: .babelrc或者直接在babel-loader中配置

	`{
	    "presets": [
	        "@babel/preset-env",
			"@babel/preset-react"
	    ],
	     "plugins":["@babel/transform-runtime"]
	}`

	babel支持自定义的预设(presets)或插件(plugins),只有配置了这两个才能让babel生效，单独的安装babel是无意义的。

	presets：代表babel支持那种语法(就是你用那种语法写)，优先级是从下往上,state-0|1|2|..代表有很多没有列入标准的语法

	plugins: 代表babel解析的时候使用哪些插件，作用和presets类似，优先级是从上往下。

3. @babel/preset-env

	表示将JavaScript es6语法代码编译为 es5语法

4. @babel/preset-react

	表示将JSX和其他东西编译到JavaScript中

6. @babel/plugin-transform-runtime @babel/runtime

	Babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。默认情况下会被添加到每一个需要它的文件中
	
	你可以引入 Babel runtime 作为一个独立模块，来避免重复引入。

	下面的配置禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用。

	npm i @babel/runtime @babel/plugin-transform-runtime -D

7. babel-polyfill

	我们之前使用的babel，babel-loader 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。
```
```javascript
{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env","@babel/preset-react"],
          plugins:["@babel/transform-runtime"]
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
#### 6.开发配置

1.  下载模板插件
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
1. 下载清空dist目录插件
npm install clean-webpack-plugin --save-dev
配置 new CleanWebpackPlugin(),
1. 开发生产分离
> npm install --save-dev webpack-dev-server  下载模拟服务器
> npm install --save-dev webpack-merge   分离开发和生产环境
> 在webpack.dev.js和webpack.prod.js中引入webpack.common.js 并在dev中配置webpack-dev-server
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
`new webpack.NamedModulesPlugin(),`
`new webpack.HotModuleReplacementPlugin()`
	指定生产环境   配置webpack.prod.js
```javascript
const webpack = require("webpack");
new webpack.DefinePlugin({
	"process.env.NODE_ENV": JSON.stringify("production")
})
```
	配置webpack.common.js后缀名和路径
```javascript
resolve: {
    extensions: [".js", ".vue", ".json", ".css", ".scss", ".html"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
```

1. 配置 npm run dev 修改npm run build 
`"build": "webpack --config ./build/webpack.prod.js",`
`"dev": "webpack-dev-server  --config ./build/webpack.dev.js"`
#### 7样式分离提取，压缩。
		// 添加提取css插件
		npm i mini-css-extract-plugin -D
		// 添加css压缩、去重插件
		npm i optimize-css-assets-webpack-plugin -D
		// 添加用于Webpack处理带有Postcss的CSS的加载程序
		npm i postcss-loader -D
		// 添加css前缀，兼容不同浏览器 插件
		npm i autoprefixer -D
		// 添加处理css的@import 只支持本地的 import 处理,不支持http 等远程的URL链接的处理插件
		npm i postcss-import -D
		// 添加css优化处理器
		npm i cssnano -D
> 将webpack.common.js中的css配置移动到webpack.dev.js
> 配置webpack.prod.js中的css分离和压缩。
> 添加JS压缩插件 npm install terser-webpack-plugin --save-dev

#### 8.代码分离
```javascript
optimization:{
    minimizer:[
      //压缩css
      new OptimizeCSSAssetsPlugin({}),
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
		  ...
        }
    }
  }
```