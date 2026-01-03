module.exports = app =>
    class BaseController {
        constructor() {
            this.app = app;
            this.config = app.config;
            this.service = app.service;
        }
        /**
         * API 处理成功时统一返回结构
         * @param {Object} ctx Koa 上下文
         * @param {Object} data 核心数据
         * @param {Object} metadata 附加数据
         */
        success(ctx, data = {}, metadata = {}) {
            ctx.status = 200;
            ctx.body = {
                data,
                success: true,
                metadata,
            };
        }
        /**
         * API 处理失败时统一返回结构
         * @param {Object} ctx Koa 上下文
         * @param {Number} code 错误码
         * @param {Object} message 错误信息
         */
        fail(ctx, message = 'Internal Server Error', code = 500) {
            ctx.body = {
                success: false,
                message,
                code,
            };
        }
    };
