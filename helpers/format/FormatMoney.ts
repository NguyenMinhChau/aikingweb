//https://www.samanthaming.com/tidbits/30-how-to-format-currency-in-es6/
// FORMAT USD
export const formatUSD = (number: number) => {
	const numberConvert = parseInt(number.toString().replace(/\D/g, ''), 10);
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		// notation: 'compact', // compact, short, long - rút gọn
		// compactDisplay: 'short'  ,
	}).format(numberConvert);
};
export const coinUSD = (number: number) => {
	return (
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			// notation: 'compact', // compact, short, long - rút gọn
			// compactDisplay: 'short'  ,
		})
			.format(number)
			.replace('$', '') + ' USD'
	);
};
// FORMAT VND
export const formatVND = (number: number) => {
	const numberConvert = parseInt(number.toString().replace(/\D/g, ''), 10);
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
		// notation: 'compact', // compact, short, long - rút gọn
		// compactDisplay: 'short'  ,
	}).format(numberConvert);
};
export const formatVNDCurrency = (number: number) => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
		// notation: 'compact', // compact, short, long - rút gọn
		// compactDisplay: 'short'  ,
	}).format(number);
};
export const precisionRound = (number: number) => {
	let precision = 5;
	let factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
};
