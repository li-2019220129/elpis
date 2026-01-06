import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/custom.css';
import pinia from '$stores';
import { createRouter, createWebHashHistory } from 'vue-router';

export default (component, { routes, libs } = {}) => {
    const app = createApp(component);
    app.use(ElementPlus);
    app.use(pinia);

    if (libs && libs.length > 0) {
        libs.forEach(lib => {
            app.use(lib);
        });
    }

    if (routes && routes.length > 0) {
        const router = createRouter({
            history: createWebHashHistory(),
            routes,
        });
        app.use(router);
        router.isReady().then(() => {
            app.mount('#root');
        });
    } else {
        app.mount('#root');
    }
};
