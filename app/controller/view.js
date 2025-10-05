/*
 * @Author: lzy 3312202467@qq.com
 * @Date: 2025-09-14 15:24:58
 * @LastEditors: lzy 3312202467@qq.com
 * @LastEditTime: 2025-09-17 22:40:56
 * @FilePath: \elpis\app\controller\view.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = app => {
    return class ViewController {
        async renderPage(ctx) {
            await ctx.render(`output/entry.${ctx.params.page}`, {
                name: app.options?.name,
                env: app.env.get(),
                options: JSON.stringify(app.options),
            });
        }
    };
};
