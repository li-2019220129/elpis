const glob = require('glob');
const path = require('path');
const { sep } = path;
/**
 * middleware loader
 * @param {object} app Koa实例
 */
module.exports = app => {
    const extendPath = path.resolve(app.businessPath, `.${sep}extend`);
    const fileList = glob.sync(path.resolve(extendPath, `.${sep}**${sep}*.js`));
    const extend = {};
    fileList.forEach(file => {
        let name = path.resolve(file);
        name = name.substring(
            name.lastIndexOf(`${sep}extend${sep}`) +
                `${sep}extend${sep}`.length,
            name.lastIndexOf('.')
        );
        name = name.replace(/[_-][a-z]/gi, s => s.substring(1).toUpperCase());
        //过滤app已经存在的key
        for (const key in app) {
            if (key === name) {
                console.log(`[elpis] app.${name} is already exists`);
                return;
            }
        }
        //挂载extend 到 app上
        app[name] = require(path.resolve(file))(app);
    });
    app.extend = extend;
};
