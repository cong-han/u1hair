const MATERIALS = {
	'PET':[12,1.4,11],
	'VMPET':[12,1.4,13.5],
	'KPET':[14,1.6,17],
	'OPP':[25,0.925,11],
	'BOPP':[20,0.925,12],
	'NY':[15,1.14,24],
	'xNY':[25,1.14,24],
	'AL':[7,2.7,35],
	'PE':[50,0.925,14],
	'CPP':[50,0.925,13],
	'RCPP':[50,0.925,16],
	'VMCPP':[25,0.925,14],
};

export function calculate(params){
	const width = params[0];
	const height = params[1];
	const halfDepth = params[2];
	const materialStr = params[3];
	const auxiliaryPrice = params[4] ?? 0.28;
	const wasteRate = params[5] ?? 0.05;
	const laborRate = params[6] ?? 0.68;
	const usdRate = params[7] ?? 6.8;

	// 解析材料结构 "pet12/al7/pe50"
    const layers = materialStr.split('/').map(layer => {
        const match = layer.match(/^([a-zA-Z]+)(\d+)$/);
        if (!match) return null;
        const name = match[1].toUpperCase();
        const thick = parseFloat(match[2]);
        const material = MATERIALS[name];
        if (!material) return null;
        return {
            name: name,
            thick: thick,
            rawDensity: material[1],
            rawPrice: material[2],
        };
    }).filter(Boolean);

    const area = width * (height + halfDepth) * 2 / 1000000;
    let totalGSM = 0;
    let basicMaterialCost = 0;
    for (const layer of layers){
    	const gsm = layer.thick * layer.rawDensity;
    	layer.gsm = gsm;
    	totalGSM += gsm;
    	const cost = area * layer.gsm / 1000 * layer.rawPrice;
    	layer.cost = cost;
    	basicMaterialCost += cost;
    }
    
    const totalMaterialCost = basicMaterialCost + auxiliaryPrice * area;
	const wasteCost = totalMaterialCost * wasteRate;
	const laborCost = (totalMaterialCost+wasteCost)/laborRate*(1-laborRate);
	const totalCost = totalMaterialCost + wasteCost + laborCost;
	
	return `

	Unit Cost:
	原材料：${basicMaterialCost.toFixed(4)}
	油墨：${(auxiliaryPrice * area).toFixed(4)}
	损耗：${wasteCost.toFixed(4)}
	人工：${laborCost.toFixed(4)}
	单元成本：${totalCost.toFixed(4)}

	FOB Price for 10000pcs:
	RMB ${totalCost.toFixed(4)*10000}
	USD ${(totalCost*10000/usdRate).toFixed(0)} (usdRate:${usdRate})	
	`;
}
