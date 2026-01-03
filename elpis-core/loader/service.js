const glob = require('glob');
const path = require('path');
const { sep } = path;
/**
 * middleware loader
 * @param {object} app Koa实例
 */
module.exports = app => {
    const servicePath = path.resolve(app.businessPath, `.${sep}service`);
    const fileList = glob.sync(
        path.resolve(servicePath, `.${sep}**${sep}*.js`)
    );
    const services = {};
    fileList.forEach(file => {
        let name = path.resolve(file);
        name = name.substring(
            name.lastIndexOf(`service${sep}`) + `service${sep}`.length,
            name.lastIndexOf('.')
        );
        name = name.replace(/[_-][a-z]/gi, s => s.substring(1).toUpperCase());

        //挂载service
        let tempService = services;
        const names = name.split(sep);
        for (let i = 0; i < names.length; i++) {
            if (i === names.length - 1) {
                const serviceModule = require(path.resolve(file))(app);
                tempService[names[i]] = new serviceModule();
            } else {
                tempService[names[i]] = tempService[names[i]] || {};
                tempService = tempService[names[i]];
            }
        }
    });
    app.services = services;
};
