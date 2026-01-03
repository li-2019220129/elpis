module.exports = app => {
    const BaseController = require('./base')(app);
    return class ProjectController extends BaseController {
        async getList(ctx) {
            const { proj_key: projKey } = ctx.request.query;
            console.log(projKey, 'projKey');
            const { project: projectService } = app.services;
            const list = await projectService.getList();
            this.success(ctx, list);
        }
    };
};
