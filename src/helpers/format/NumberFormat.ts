export const autoFormatNumberInputChange = (number: number) => {
	return number
		.toString()
		.replace(/\D/g, '')
		.split('')
		.reverse()
		.join('')
		.replace(/(\d{3})(?=\d)/g, '$1.')
		.split('')
		.reverse()
		.join('');
};
export const convertNumberMultiple = (
	number: number,
	multipleNumber: number,
) => {
	const numberConvert = parseInt(number.toString().replace(/\D/g, ''), 10);
	const multiplied = numberConvert * multipleNumber;
	//console.log(autoFormatNumberInputChange(multiplied)); //x.xxx
	return multiplied;
};
