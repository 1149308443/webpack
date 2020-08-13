const merge = require('webpack-merge');
// 打包情况可视化插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const build = require('./webpack.prod.js');

module.exports = merge(build, {
  plugins: [
    // 打包情况可视化插件
    new BundleAnalyzerPlugin({ analyzerPort: 8919 })
  ]
});