const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');

const webpackConfig = merge.smart(baseConfig, {
    // 指定生产环境的配置
    mode: 'development',
    output: {},
});
module.exports = webpackConfig;
