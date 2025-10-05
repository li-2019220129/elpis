const Ajv = require('ajv');

const ajv = new Ajv();
module.exports = app => {
    const $schema = 'http://json-schema.org/draft-07/schema#';
    return async (ctx, next) => {
        // 只对API 请求进行参数验证
        if (!ctx.request.path.includes('/api')) {
            return await next();
        }
        const { body, query, headers } = ctx.request;
        const { params, path, method } = ctx;
        app.logger.info(
            `[${method}] ${path} [${JSON.stringify(params)}] [${JSON.stringify(query)}] [${JSON.stringify(headers)}]`
        );
        const schema = app.routerSchema[path]?.[method.toLowerCase()];
        console.log(schema, '9999');
        if (!schema) {
            return await next();
        }
        let valid = true;
        let validate;
        if (valid && headers && schema.headers) {
            schema.headers.$schema = $schema;
            validate = ajv.compile(schema.headers);
            valid = validate(headers);
        }

        if (valid && body && schema.body) {
            schema.body.$schema = $schema;
            validate = ajv.compile(schema.body);
            valid = validate(body);
        }

        if (valid && query && schema.query) {
            schema.query.$schema = $schema;
            validate = ajv.compile(schema.query);
            valid = validate(query);
        }

        if (valid && params && schema.params) {
            schema.params.$schema = $schema;
            validate = ajv.compile(schema.params);
            valid = validate(params);
        }
        if (!valid) {
            app.logger.error(validate.errors);
            ctx.status = 200;
            ctx.body = {
                success: false,
                code: 442,
                message: '参数验证失败',
            };
            return;
        }
        await next();
    };
};
