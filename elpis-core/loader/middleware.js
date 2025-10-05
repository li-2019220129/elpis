const glob = require('glob');
const path = require('path');
const { sep } = path;
/**
 * middleware loader
 * @param {object} app Koa实例
 */
module.exports = app => {
    const middlewaresPath = path.resolve(app.businessPath, `.${sep}middleware`);
    const fileList = glob.sync(
        path.resolve(middlewaresPath, `.${sep}**${sep}*.js`)
    );
    const middlewares = {};
    fileList.forEach(file => {
        let name = path.resolve(file);
        name = name.substring(
            name.lastIndexOf(`middleware${sep}`) + `middleware${sep}`.length,
            name.lastIndexOf('.')
        );
        name = name.replace(/[_-][a-z]/gi, s => s.substring(1).toUpperCase());

        //挂载middlerwared
        let tempMiddleware = middlewares;
        const names = name.split(sep);
        for (let i = 0; i < names.length; i++) {
            if (i === names.length - 1) {
                tempMiddleware[names[i]] = require(path.resolve(file))(app);
            } else {
                tempMiddleware[names[i]] = tempMiddleware[names[i]] || {};
                tempMiddleware = tempMiddleware[names[i]];
            }
        }
    });
    console.log(middlewares, '-------');
    app.middlewares = middlewares;
};
