export function hexEncode(str: string): string {
	let result: string = "0x";
	for(let i = 0; i < str.length; i++) {
		result += str.charCodeAt(i).toString(16);
	}
	return result;
}

export function hexToChar(str: string): string {
	let result: string = "";
	for(let i = 2; i < str.length; i+=2) {
		const hex: any = `0x${str[i]}${str[i+1]}`;
		result += String.fromCharCode(hex) 
	}
	return result;
}
