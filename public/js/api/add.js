export function calculate(params){
	return params.reduce((sum, val) => sum + val, 0);
}
