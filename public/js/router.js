const routes = [];

export function addRoute(path, renderFn, afterFn) {
    routes.push({ path, renderFn, afterFn: afterFn || (() => {}) });
}

async function matchRoute() {
    const hash = location.hash.slice(1) || '/';
    const route = routes.find(r => r.path === hash);
    const app = document.getElementById('app');

    if (route) {
        app.innerHTML = await route.renderFn();
        route.afterFn();
    } else {
        app.innerHTML = '<h1>404</h1><p>页面不存在</p>';
    }
}

export function startRouter() {
    window.addEventListener('hashchange', matchRoute);
    window.addEventListener('DOMContentLoaded', matchRoute);
}
