module.exports = (app, router) => {
    const { project: projectController } = app.controllers;
    console.log(app.controllers, 'app.controllers');

    router.get(
        '/api/project/list',
        projectController.getList.bind(projectController)
    );
};
