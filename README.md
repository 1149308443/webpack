## webpack 部分

### 脚本说明

1. `npm run dev` 通过`webpack-dev-server`启动服务
2. `npm run build` 打包项目生成`dist`文件夹
3. `npm run analyzer`在`npm run build`打包生成项目文件的同时,开启包分析插件`webpack-bundle-analyzer`,浏览器会自动打开`localhost:8919`这个时候打包出来的各个文件大小会展示出来
4. `npm run serve` 在`npm run build`打包生成项目文件的同时,通过`http-server`启动一个服务,这个样子就可以访问打包好的文件
5. `npm run watch` 通过`webpack`自带的`watch`模式监听文件的变化,这个需要依赖于本地的服务,例如 nginx,tomcat 等一些服务,像是 http-server,serve 这些服务不起作用,因为不能同时起两个监听,如果你的页面没有服务依赖,直接去文件夹下点开`index.html`文件进行访问,,,这种文件监听模式没有热跟新,需要手动的去刷新页面,作为学习,不推荐用这种方式来启动,进行开发

#### 起步

    新建文件夹 react 执行npm init
    执行命令npm install webpack webpack-cli --save-dev 下载webpack

#### 配置入口文件和 webpack

    新建build文件夹  webpack.common.js; webpakc.dev.js;webpack.prod.js
    新建src目录用来放客户端代码  entry文件夹 放入口文件 index.js

#### 配置 build 命令测试

    配置webpack入口和出口
    npm install --save lodash
    新建dist文件夹 index.html
    修改build命令 "build":"webpack --config ./build/webpack.common.js"

#### 添加 loader

    npm install url-loader file-loader --save-dev 	加载静态图片文字
    处理css

    		npm i style-loader css-loader sass-loader node-sass -D

#### 配置 babel

1. 说明作用

   babel 是用来解析 es6 语法或者 es7 语法分解析器，让开发者能够使用新的 es 语法，同时支持 jsx,vue 等多种框架。

2. 安装 babel

   npm i @babel/core babel-loader -D

3. 配置 babel 文件: .babelrc 或者直接在 babel-loader 中配置

   `{ "presets": [ "@babel/preset-env", "@babel/preset-react" ], "plugins":["@babel/transform-runtime"] }`

   babel 支持自定义的预设(presets)或插件(plugins),只有配置了这两个才能让 babel 生效，单独的安装 babel 是无意义的。

   presets：代表 babel 支持那种语法(就是你用那种语法写)，优先级是从下往上,state-0|1|2|..代表有很多没有列入标准的语法

   plugins: 代表 babel 解析的时候使用哪些插件，作用和 presets 类似，优先级是从上往下。

4. @babel/preset-env

   表示将 JavaScript es6 语法代码编译为 es5 语法

5. @babel/preset-react

   表示将 JSX 和其他东西编译到 JavaScript 中

6. @babel/plugin-transform-runtime @babel/runtime

   Babel 对一些公共方法使用了非常小的辅助代码，比如 \_extend。默认情况下会被添加到每一个需要它的文件中

   你可以引入 Babel runtime 作为一个独立模块，来避免重复引入。

   下面的配置禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用。

   npm i @babel/runtime @babel/plugin-transform-runtime -D

7. babel-polyfill

   我们之前使用的 babel，babel-loader 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。

````
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
````

8. 链判断运算符语法?支持

- 安装插件`npm i @babel/plugin-proposal-optional-chaining -D`.
- 在.babelrc 文件中配置如下

```
"plugins":[
  ["@babel/plugin-proposal-optional-chaining"]
],
```

9. 支持装饰器语法

- 环境支持 下载插件
  `npm i @babel/plugin-proposal-decorators -D` 支持装饰器插件,
  `npm i @babel/plugin-proposal-class-properties -D` 支持类里面添加属性(包括静态),
- .babelrc 中配置

```
"plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
```

- vscode 中配置 `"experimentalDecorators": true`
- .eslint 中配置,装饰器语法支持 export 关键字

```
 "parserOptions": {
    "ecmaFeatures": {
      "legacyDecorators": true
    }
  },
```

9. 配置`less`

- 安装装执行 `npm i less less-loader -D`,`webpack`配置修改`sass-loader`为`less-loader`

#### 开发配置

1.  下载模板插件
    npm install --save-dev html-webpack-plugin
    在入口文件夹新建模板 index.html
    webpack.common.js 中配置

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

2. 下载清空 dist 目录插件
   npm install clean-webpack-plugin --save-dev
   配置 new CleanWebpackPlugin(),
3. 开发生产分离

- npm install --save-dev webpack-dev-server 下载模拟服务器
- npm install --save-dev webpack-merge 分离开发和生产环境
- 在 webpack.dev.js 和 webpack.prod.js 中引入 webpack.common.js 并在 dev 中配置 webpack-dev-server

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

4. 启用 webpack 热更新插件

- `new webpack.NamedModulesPlugin(),`
- `new webpack.HotModuleReplacementPlugin()`

5. 指定生产环境 配置 webpack.prod.js

```javascript
const webpack = require("webpack");
new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("production"),
});
```

6. 配置 webpack.common.js 后缀名和路径

```javascript
resolve: {
    extensions: [".js", ".vue", ".json", ".css", ".scss", ".html"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
```

7. 配置 npm run dev 修改 npm run build

- `"build": "webpack --config ./build/webpack.prod.js",`
- `"dev": "webpack-dev-server --config ./build/webpack.dev.js"`

#### 样式分离提取，压缩。

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

- 将 webpack.common.js 中的 css 配置移动到 webpack.dev.js
- 配置 webpack.prod.js 中的 css 分离和压缩。
- 添加 JS 压缩插件 npm install terser-webpack-plugin --save-dev

#### 代码分离

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

#### 新增打包之后的包分析插件`webpack-bundle-analyzer`

1. 下载`npm i webpack-bundle-analyzer -D`
2. webpack 配置如下

```
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
plugins:[
    new BundleAnalyzerPlugin({ analyzerPort: 8919 })
]
```

3. 在打包完成之后会自动打开 localhost:8919 展示各个包的具体详情
