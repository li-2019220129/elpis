module.exports = (app, router) => {
    const { view: viewController } = app.controllers;
    console.log(app.controllers, 'app.controllers');

    router.get('/view/:page', viewController.renderPage.bind(viewController));
};
