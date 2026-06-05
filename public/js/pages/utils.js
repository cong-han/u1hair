import * as api from '../api/index.js';

function styles(){
	return `
		<style>
			.input-group{
				display: grid;
				grid-template-columns: 1fr;
				gap: 1.5rem;
			}
			#calcBtn{
				width: 400px;
			}
			#inputArea{
				width: 400px;
			}
			#outputArea{
				width: 400px;
				background: #f5f5f5;
				disable;
			}
		</style>
	`;
	
}

function calcButton(){
	return `<button id="calcBtn">Cal</button>`;
}

function inputArea(){
	return `
<textarea id="inputArea" rows="2"></textarea>
`;
}


function outputArea(){
	return `
<textarea id="outputArea" rows="14" readonly></textarea>
`;
}




export function render() {
    return `
    	${styles()}
    	<div class="input-group">
			${calcButton()}
			${inputArea()}
			${outputArea()}
		</div>
	`; 
}

export function afterRender() {
		document.getElementById('calcBtn').addEventListener('click', () => {
        const input = document.getElementById('inputArea').value.trim();
        if (!input) return;
        const lines = input.split('\n');
        const results = [];
        for (const line of lines) {
            const parts = line.split(',');
            const type = parts[0].trim();
            const params = parts.slice(1).map(v => 
            {
            	const num = parseFloat(v);
            	return isNaN(num) ? v.trim() : num;
            });
            if (api[type]) {
                results.push(api[type](params));
            } else {
                results.push('公式不存在: ' + type);
            }
        }
        document.getElementById('outputArea').value = results.join('\n');
    });
} 
