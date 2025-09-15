module.exports = app => {
    return class ProjectController {
        async getList(ctx) {
            const { project: projectService } = app.services;
            const list = await projectService.getList();
            ctx.status = 200;
            ctx.body = {
                data: list,
                success: true,
                metadata: {},
            };
        }
    };
};
