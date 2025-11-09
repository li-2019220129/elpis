const webpack = require('webpack');

const webpackBaseConfig = require('./config/webpack.base.js');

webpack(webpackBaseConfig, (err, stats) => {
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
