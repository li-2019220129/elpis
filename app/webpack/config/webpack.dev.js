const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');
const webpack = require('webpack');

// devServer 配置
const DEV_SERVER_CONFIG = {
    HOST: '127.0.0.1',
    PORT: 9002,
    HMR_PATH: '__webpack_hmr',
    PROXY_API: '/api',
    TIMEOUT: 20000,
};
Object.keys(baseConfig.entry).forEach(v => {
    if (v !== 'vendor') {
        baseConfig.entry[v] = [
            baseConfig.entry[v],
            `webpack-hot-middleware/client?path=http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/${DEV_SERVER_CONFIG.HMR_PATH}&timeout=${DEV_SERVER_CONFIG.TIMEOUT}&reload=true`,
        ];
    }
});
console.log(baseConfig.entry);
const webpackConfig = merge.smart(baseConfig, {
    // 指定开发环境的配置
    mode: 'development',
    output: {
        path: path.resolve(process.cwd(), './app/public/dist/dev/'),
        filename: 'js/[name]_[chunkhash:8].bundle.js',
        publicPath: `http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/public/dist/dev/`,
        globalObject: 'this',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: false,
        }),
    ],
});
module.exports = { webpackConfig, DEV_SERVER_CONFIG };
