const KoaRouter = require('koa-router');
const path = require('path');
const { sep } = path;
const glob = require('glob');
/**
 * router loader
 * @param {object} app Koa实例
 * 解析所有app/router/下的所有的js文件，加载到KoaRouter
 */
module.exports = app => {
    //找到路由文件路径
    const routerPath = path.resolve(app.businessPath, `.${sep}router`);
    //实例化 KoaRouter
    const router = new KoaRouter();

    const fileList = glob.sync(
        path.resolve(routerPath, `.${sep}**${sep}**.js`)
    );
    fileList.forEach(file => {
        //加载文件
        require(path.resolve(file))(app, router);
    });
    router.get('*', async (ctx, next) => {
        ctx.status = 302;
        ctx.redirect(`${app?.options?.homePage ?? '/'}`);
    });
    app.use(router.routes());
    app.use(router.allowedMethods());
};
