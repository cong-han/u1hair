export async function render() {
    try {
        const response = await fetch('/data/products.csv');
        if (!response.ok) {
            throw new Error('CSV 文件加载失败');
        }
        const csvText = await response.text();

        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const products = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const item = {};
            headers.forEach((header, index) => {
                item[header] = values[index] || '';
            });
            products.push(item);
        }

        const cardsHTML = products.map(p => `
            <div class="product-card">
                <img src="${p.image}" alt="${p.title}" class="product-img">
                <h3 class="product-title">${p.title}</h3>
                <p class="product-subtitle">${p.subtitle}</p>
            </div>
        `).join('');

        return `
            <style>
                .products-page {
                    display: grid;
                    grid-template-columns: repeat(5,100px);
                    gap: 16px;
                    justify-content: start;
                }
                .product-card {
                    text-align: center;
                }
                .product-img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                }
                .product-title {
                    margin: 4px 0 2px 0;
                    font-size: 14px;
                }
                .product-subtitle {
                    margin: 0;
                    font-size: 12px;
                    color: #666;
                }
            </style>
            <h1>产品目录</h1>
            <div class="products-page">
                ${cardsHTML}
            </div>
        `;

    } catch (error) {
        return `
            <h1>产品目录</h1>
            <p style="color: red;">加载失败：${error.message}</p>
        `;
    }
}

export function afterRender() {
    // 暂无交互
}
