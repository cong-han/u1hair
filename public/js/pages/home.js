import { getHello } from '../api/index.js';

export function render() {
    return `
        <h1>首页</h1>
        <p>这是一个手搓的原生 SPA，没有使用任何框架。</p>
        <button id="fetchBtn">调用模拟 API</button>
        <p id="apiResult"></p>
    `;
}

export function afterRender() {
    const btn = document.getElementById('fetchBtn');
    const result = document.getElementById('apiResult');
    if (btn) {
        btn.addEventListener('click', async () => {
            const data = await getHello();
            result.textContent = data.message;
        });
    }
}
