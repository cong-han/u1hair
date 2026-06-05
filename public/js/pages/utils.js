export function render() {
    return `
        <style>
            .calc-page { padding: 1rem; }
            .calc-layout {
                display: flex;
                gap: 1.5rem;
                align-items: flex-start;
            }
            .calc-left, .calc-right {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            .calc-left h3, .calc-right h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1rem;
                color: #333;
            }
            textarea {
                width: 100%;
                font-family: monospace;
                font-size: 14px;
                padding: 0.75rem;
                border: 1px solid #ccc;
                border-radius: 6px;
                resize: vertical;
                box-sizing: border-box;
            }
            #calcBtn {
                margin-top: 0.75rem;
                padding: 10px 24px;
                font-size: 1rem;
                cursor: pointer;
                align-self: flex-start;
            }
            #outputArea {
                background: #f9f9f9;
                color: #333;
            }
        </style>

        <div class="calc-page">
            <h1>包装报价计算器</h1>
            <div class="calc-layout">
                <div class="calc-left">
                    <h3>输入参数（CSV格式）</h3>
                    <textarea id="inputArea" rows="14" placeholder="长,宽,克重,单价
200,150,80,12.5
180,140,70,11.8
220,160,90,13.2"></textarea>
                    <button id="calcBtn">计算报价</button>
                </div>
                <div class="calc-right">
                    <h3>计算结果</h3>
                    <textarea id="outputArea" rows="14" readonly placeholder="此处显示计算结果..."></textarea>
                </div>
            </div>
        </div>
    `;
}

export function afterRender() {
    document.getElementById('calcBtn').addEventListener('click', () => {
        const input = document.getElementByI
