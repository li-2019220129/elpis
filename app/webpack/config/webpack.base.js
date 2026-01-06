/**
 * webpack基础配置
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const glob = require('glob');
const pageEntries = {};

const htmlWebpackPluginList = [];

const entryLst = path.resolve(process.cwd(), './app/pages/**/entry.*.js');
glob.sync(entryLst).forEach(entry => {
    console.log(entry);
    const entryName = path.basename(entry, '.js');
    pageEntries[entryName] = entry;
    htmlWebpackPluginList.push(
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), './app/view/entry.tpl'),
            filename: path.resolve(
                process.cwd(),
                './app/public/dist/',
                `${entryName}.tpl`
            ),
            chunks: [entryName],
        })
    );
});

module.exports = {
    // 入口文件
    entry: pageEntries,
    // 输出配置
    output: {},
    // 模块解析规则
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
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
            $stores: path.resolve(process.cwd(), './app/pages/stores'),
            $widgets: path.resolve(process.cwd(), './app/pages/widgets'),
            $common: path.resolve(process.cwd(), './app/pages/common'),
            $pages: path.resolve(process.cwd(), './app/pages'),
        },
    },
    // 插件配置
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            Vue: 'vue',
            axios: 'axios',
            _: 'lodash',
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: 'true',
            __VUE_PROD_DEVTOOLS__: 'false',
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        }),
        ...htmlWebpackPluginList,
    ],
    // 配置打包输出优化 （代码分割，模块合并，缓存，Tree Shaking,压缩等优化策略）
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxAsyncRequests: 10,
            maxInitialRequests: 10,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: 20,
                    enforce: true,
                    reuseExistingChunk: true,
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    minSize: 1,
                    priority: 10,
                    reuseExistingChunk: true,
                },
            },
        },
    },
};
