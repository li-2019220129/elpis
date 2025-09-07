const glob = require('glob');
const path = require('path');
const { sep } = path;
/**
 * middleware loader
 * @param {object} app Koa实例
 */
module.exports = app => {
    const controllerPath = path.resolve(app.businessPath, `.${sep}controller`);
    const fileList = glob.sync(
        path.resolve(controllerPath, `.${sep}**${sep}*.js`)
    );
    const controllers = {};
    fileList.forEach(file => {
        let name = path.resolve(file);
        name = name.substring(
            name.lastIndexOf(`controllers${sep}`) + `controllers${sep}`.length,
            name.lastIndexOf('.')
        );
        name = name.replace(/[_-][a-z]/gi, s => s.substring(1).toUpperCase());

        //挂载controller
        let tempController = controllers;
        const names = name.split(sep);
        for (let i = 0; i < names.length; i++) {
            if (i === names.length - 1) {
                const controllerModule = require(path.resolve(file))(app);
                tempController[names[i]] = new controllerModule();
            } else {
                tempController[names[i]] = tempController[names[i]] || {};
                tempController = tempController[names[i]];
            }
        }
    });
    app.controllers = controllers;
};
