/**
 * 运行时异常错误处理，兜底所有异常
 * @params {Object} app Koa 实例
 */

module.exports = app => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            // 错误处理
            const { status, message, detail } = err;
            app.logger.info(JSON.stringify(err));
            app.logger.error('[--exception--]', err);
            app.logger.error('[--exception--]', status, message, detail);
            if (message && message.indexOf('template not found') > -1) {
                // 页面重定向
                ctx.status = 302;
                ctx.redirect(`${app.options?.homePage}`);
                return;
            }
            const resBody = {
                success: false,
                message: message || 'Internal Server Error',
                code: 5000,
            };
            ctx.status = 200;
            ctx.body = resBody;
        }
    };
};
