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

const ACCESSORIES = {
	'zipper': {method: 'width', price: 0.11},
	'spout': {method: 'piece', price: 0},
};

export function calculate(params){
	const dimension = String(params[0] || '');   // "(120+30)*(200+30)"
	const materialStr = String(params[1] || '');
	const auxiliaryPrice = params[2] ?? 0.28;
	const wasteRate = params[3] ?? 0.05;
	const laborRate = params[4] ?? 0.68;
	const usdRate = params[5] ?? 6.8;
	//return materialStr;


// dcode "(120+10)*(230_45)+zipper"

	const match = dimension.match(/^\((\d+(?:\.\d+)?)\+(\d+(?:\.\d+)?)\)\*\((\d+(?:\.\d+)?)\+(\d+(?:\.\d+)?)\)(?:\+(.+))?$/);
    if (!match)  return '错误：尺寸格式应为 (宽+值)*(高+值)+配件名（配件可选）';
	const width  = parseFloat(match[1]) + parseFloat(match[2]);
	const height = parseFloat(match[3]) + parseFloat(match[4]);
	const area = width * height * 2 / 1000000;
	const accessoryName = match[5] ? match[5].trim().toLowerCase() : null;

	let accessoryCost = 0;
	if (accessoryName){
		const acc = ACCESSORIES[accessoryName];
		if(!acc) return `error: no such accessory "${accessoryName}"`;
		switch (acc.method){
			case 'piece': accessoryCost = acc.price; break;
			case 'width':accessoryCost = acc.price * parseFloat(match[1])/1000; break;
			default:return `no find method`;
		}
	}
	//return accessoryCost;


// dcode "pet12/al7/pe50"
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

   // return basicMaterialCost;
     
    const auxiliaryCost = auxiliaryPrice * area;
    const totalMaterialCost = basicMaterialCost + auxiliaryCost;
	const wasteCost = totalMaterialCost * wasteRate;
	const laborCost = (totalMaterialCost+wasteCost)/laborRate*(1-laborRate);
	const totalCost = totalMaterialCost + wasteCost + laborCost + accessoryCost;


	
 	return ` 		
 	面积：${area}
 	原材料：${basicMaterialCost.toFixed(4)}
 	油墨及附加：${auxiliaryCost.toFixed(4)}
 	损耗：${wasteCost.toFixed(4)}
 	人工：${laborCost.toFixed(4)}
	附件：${accessoryCost}
 	单元成本价：${totalCost.toFixed(4)} 

 	FOB Price for 1000pcs:
 	RMB ${(totalCost*1000).toFixed(0)}
 	USD exchange Rate: ${usdRate}
 	USD ${(totalCost*1000/usdRate).toFixed(0)} 	
 	`;
	//return 0;
}
