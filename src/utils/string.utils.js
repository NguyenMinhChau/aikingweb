export const getProvincFromPop = pop =>
  typeof pop === 'string' ? pop.slice(0, 3) : null;

export function capitalizeFLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
