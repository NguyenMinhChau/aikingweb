export const formatVND = money => {
  if (money) {
    return money?.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
  }
};

export const autoFormatNumberInputChange = number => {
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
export const convertNumberMultiple = (number, multipleNumber) => {
  const numberConvert = parseInt(number.toString().replace(/\D/g, ''), 10);
  const multiplied = numberConvert * multipleNumber;
  //console.log(autoFormatNumberInputChange(multiplied)); //x.xxx
  return multiplied;
};
