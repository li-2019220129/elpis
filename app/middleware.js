const path = require('path');
module.exports = app => {
    const koaStatic = require('koa-static');
    app.use(koaStatic(path.resolve(process.cwd(), './app/public')));
    const koaNunjucks = require('koa-nunjucks-2');
    app.use(
        koaNunjucks({
            ext: 'tpl',
            path: path.join(process.cwd(), './app/public'),
            nunjucksConfig: {
                noCache: true,
                trimBlocks: true,
            },
        })
    );
};
