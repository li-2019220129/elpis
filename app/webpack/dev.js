const webpack = require('webpack');
const path = require('path');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const { webpackConfig, DEV_SERVER_CONFIG } = require('./config/webpack.dev.js');

const app = express();
const compiler = webpack(webpackConfig);

// 指定静态文件目录
app.use(express.static(path.join(__dirname, '../public/dist')));
// 引用 webpackDevMiddleware (监控文件变化)
app.use(
    webpackDevMiddleware(compiler, {
        writeToDisk: filePath => {
            return filePath.endsWith('.tpl');
        },
        publicPath: webpackConfig.output.publicPath,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers':
                'X-Requested-With, content-type, Authorization',
        },
        stats: {
            colors: true,
        },
    })
);

// 引用 webpackHotMiddleware (模块热替换)
app.use(
    webpackHotMiddleware(compiler, {
        path: `/${DEV_SERVER_CONFIG.HMR_PATH}`,
    })
);

console.info('请等待webpack初次编译完成...');

const port = DEV_SERVER_CONFIG.PORT || 9002;

app.listen(port, () => {
    console.info(`webpack-dev-server is listening on port ${port}`);
});
