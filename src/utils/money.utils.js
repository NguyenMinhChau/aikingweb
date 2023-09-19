export const formatVND = money => {
  if (money) {
    return money?.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
  }
};
