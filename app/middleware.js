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
    const bodyParser = require('koa-bodyparser');
    app.use(
        bodyParser(
            { formList: '1000mb' },
            { enableTypes: ['json', 'form', 'text'] }
        )
    );

    // 引入异常捕获中间件
    app.use(app.middlewares.errorHandler);
};
