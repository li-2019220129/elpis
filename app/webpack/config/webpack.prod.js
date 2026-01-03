const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');
const os = require('os');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin');
const happypackCommonConfig = {
    debug: false,
    threadPool: HappyPack.ThreadPool({
        size: os.cpus().length,
    }),
};

const webpackConfig = merge.smart(baseConfig, {
    // 指定生产环境的配置
    mode: 'production',
    output: {
        path: path.join(process.cwd(), './app/public/dist/prod'),
        filename: 'js/[name]_[chunkhash:8].bundle.js',
        publicPath: '/dist/prod',
        clean: true,
        crossOriginLoading: 'anonymous',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=css'],
            },
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), './app/pages')],
                use: {
                    loader: 'happypack/loader?id=js',
                },
            },
        ],
    },
    performance: {
        hints: false,
    },
    plugins: [
        // 提取css的公共部分,有效利用缓存
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:8].bundle.css',
        }),
        // 优化并压缩css
        new CSSMinimizerPlugin(),
        // 优化并压缩js
        new HappyPack({
            id: 'js',
            ...happypackCommonConfig,
            loaders: [
                `babel-loader?${JSON.stringify({
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime'],
                })}`,
            ],
        }),
        new HappyPack({
            id: 'css',
            ...happypackCommonConfig,
            loaders: [
                {
                    path: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                },
            ],
        }),
        new HtmlWebpackInjectAttributesPlugin({
            crossorigin: 'anonymous',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true, //启用缓存来加速构建过程
                parallel: true, // 利用多核 CPU 的优势来加快压缩进度
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
});
module.exports = webpackConfig;
