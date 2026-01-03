const webpack = require('webpack');

const webpackProdConfig = require('./config/webpack.prod.js');

webpack(webpackProdConfig, (err, stats) => {
    if (err) {
        console.log(err);
    }
    process.stdout.write(
        stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: true,
        }) + '\n\n'
    );
});
