export function render() {
    return `
        <h1>关于</h1>
        <p>原生 SPA 脚手架，理解 Vue/React 路由底层原理。</p>
        <p>页面切换完全通过 Hash 路由实现，不刷新浏览器。</p>
    `;
}

export function afterRender() {
    // 暂无交互
}
