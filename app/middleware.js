/*
 * @Author: lzy 3312202467@qq.com
 * @Date: 2025-09-14 14:38:09
 * @LastEditors: lzy 3312202467@qq.com
 * @LastEditTime: 2025-10-05 15:52:01
 * @FilePath: \elpis\app\middleware.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    // 引入API 签名验证中间件
    app.use(app.middlewares.apiSignVerify);
    // 引入API 参数验证中间件
    app.use(app.middlewares.apiParamsVerify);
};
