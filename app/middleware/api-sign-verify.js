const md5 = require('md5');

module.exports = app => {
    return async (ctx, next) => {
        // 只对API 请求进行签名验证
        if (!ctx.request.path.includes('/api')) {
            return await next();
        }

        const { path, method } = ctx;
        const { headers } = ctx.request;
        const { s_sign: sSgin, s_t: st } = headers;

        const signKey = 'keerwo1ifnjei29958kfkskdfirejiW';
        const signature = md5(`${signKey}_${st}`);

        app.logger.info(`[${method}] ${path} [${signature}]]`);

        if (
            !sSgin ||
            !st ||
            sSgin.toLowerCase() !== signature ||
            Date.now() - st > 1000 * 600
        ) {
            ctx.status = 200;
            ctx.body = {
                success: false,
                message: '签名错误',
                code: 445,
            };
            return;
        }
        await next();
    };
};
