// 合并规则
const { merge } = require('webpack-merge')

// 导入基础配置
const baseConfig = require('./webpack.config.base.js')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    // devServer
    devServer: {
        // 启动时打开浏览器
        open: true,
        port: 8000,
        // 热更新
        hot: true,
    },
    plugins: [
        new ReactRefreshWebpackPlugin(), // 添加热更新插件
    ],
})
