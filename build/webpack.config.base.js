const path = require('path')

// HTML模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// CSS单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath)

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [require('autoprefixer')],
        },
    },
}

const cssLoader = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    postcssLoader,
]

module.exports = {
    mode: 'development',
    entry: resolvePath('../src/index.tsx'),
    output: {
        path: resolvePath('../dist'),
        filename: 'static/js/[name].[chunkhash:8].js',
        clean: true,
        publicPath: '/', // 打包后文件的公共前缀路径
    },
    cache: {
        type: 'filesystem',
    },
    module: {
        rules: [
            // 处理 ts?x js?x
            {
                test: /\.[tj]sx?$/,
                include: [resolvePath('../src')],
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            //处理css
            {
                test: /\.css$/,
                use: cssLoader,
            },
            // 处理less
            {
                test: /\.less$/,
                use: [...cssLoader, 'less-loader'],
            },
            // 处理sass
            {
                test: /\.s[a|c]ss$/,
                use: [
                    ...cssLoader,
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            //图片资源
            {
                test: /\.(svg|png|jpe?g|gif|webp|bpm)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1 * 1024, // 小于1kb转base64
                    },
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext]',
                },
            },
            // 图标资源
            {
                test: /\.(ttf|woff|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/font/[name].[contenthash:8][ext]',
                },
            },
            //媒体资源
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    },
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]',
                },
            },
        ],
    },
    plugins: [
        //模板
        new HtmlWebpackPlugin({
            title: 'React App',
            filename: 'index.html',
            template: resolvePath('../public/index.html'),
            inject: true,
        }),
    ],
    resolve: {
        //别名
        alias: {
            '@': path.join(__dirname, '../src'),
        },
        // 引用自动匹配
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
}
