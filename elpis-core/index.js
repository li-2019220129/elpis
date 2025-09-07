const Koa = require('koa');
const path = require('path');
const { sep } = path;
const env = require('./env');

const middlewareLoader = require('./loader/middleware');
const controllerLoader = require('./loader/controller');
const routerSchemaLoader = require('./loader/router-schema');
const routerLoader = require('./loader/router');
const serviceLoader = require('./loader/service');
const configLoader = require('./loader/config');
const extendLoader = require('./loader/extend');
module.exports = {
    start: (options = {}) => {
        const app = new Koa();
        app.options = options;
        app.baseDir = process.cwd();
        app.businessPath = path.resolve(app.baseDir, `.${sep}app`);
        app.env = env(app);
        middlewareLoader(app);
        routerSchemaLoader(app);
        console.log(app.routerSchema);
        controllerLoader(app);
        serviceLoader(app);
        configLoader(app);
        extendLoader(app);

        try {
            require(`${app.businessPath}${sep}middleware.js`)(app);
            console.log(`-- [start] load appMiddleware success`);
        } catch (e) {
            console.log(`-- [error] load appMiddleware error: ${e}`);
        }

        routerLoader(app);

        console.log(app.env.get(), '9999');
        try {
            const port = process.env.PORT || 8080;
            const host = process.env.HOST || '0.0.0.0';
            app.listen(port, host);
            console.log(`Server listening on ${host}:${port}`);
        } catch (e) {
            console.error('Server failed to start:', e);
        }
    },
};
