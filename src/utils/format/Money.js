/* eslint-disable prettier/prettier */
export const formatVND = number => {
  const numberConvert = parseInt(number?.toString()?.replace(/\D/g, ''), 10);
  // const numberConvert = Math.round(number / 1000) * 1000;
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    // notation: 'compact', // compact, short, long - rút gọn
    // compactDisplay: 'short'  ,
  }).format(numberConvert);
};
export const formatVNDCurency = number => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    // notation: 'compact', // compact, short, long - rút gọn
    // compactDisplay: 'short'  ,
  }).format(number);
};
export const formatUSD = number => {
  const numberConvert = parseInt(number?.toString()?.replace(/\D/g, ''), 10);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // notation: 'compact', // compact, short, long - rút gọn
    // compactDisplay: 'short'  ,
  }).format(numberConvert);
};
export const formatUSDT = usdt => {
  return usdt
    ?.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'USD',
    })
    ?.replace(/\$/g, 'D');
};
export const precisionRound = number => {
  let precision = 5;
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};
