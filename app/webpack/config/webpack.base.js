/**
 * webpack基础配置
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
module.exports = {
    // 入口文件
    entry: {
        'entry.page1': ['./app/pages/page1/entry.page1.js'],
        'entry.page2': ['./app/pages/page2/entry.page2.js'],
    },
    // 输出配置
    output: {
        path: path.join(process.cwd(), './app/public/dist/prod'),
        filename: 'js/[name]_[chunkhash:8].bundle.js',
        publicPath: '/dist/prod',
        clean: true,
        crossOriginLoading: 'anonymous',
    },
    // 模块解析规则
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), './app/pages')],
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 300,
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                use: 'file-loader',
            },
        ],
    },
    // 配置模块解析：解析.vue文件
    resolve: {
        extensions: ['.js', '.vue', '.css', '.less', '.scss', '.json'],
        alias: {
            $pages: path.resolve(process.cwd(), './app/pages'),
        },
    },
    // 插件配置
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            Vue: 'vue',
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: 'true',
            __VUE_PROD_DEVTOOLS__: 'false',
            __VUE_PROD_HYDRATION__MISMATCH_DETAILS__: 'false',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), './app/view/entry.tpl'),
            filename: path.resolve(
                process.cwd(),
                './app/public/dist/',
                'entry.page1.tpl'
            ),
            chunks: ['entry.page1'],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), './app/view/entry.tpl'),
            filename: path.resolve(
                process.cwd(),
                './app/public/dist/',
                'entry.page2.tpl'
            ),
            chunks: ['entry.page2'],
        }),
    ],
    // 配置打包输出优化 （代码分割，模块合并，缓存，Tree Shaking,压缩等优化策略）
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
