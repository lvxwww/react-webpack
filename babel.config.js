const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式
module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        '@babel/plugin-transform-runtime',
        isDev && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
}
