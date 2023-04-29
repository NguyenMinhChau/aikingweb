const KEY = 'loginDataWebAiking';

export const getStore = () => {
  const store = localStorage.getItem(KEY);
  return store ? JSON.parse(store) : null;
};
export const setStore = (data: any) => {
  return localStorage.setItem(KEY, JSON.stringify(data));
};
export const removeStore = () => {
  return localStorage.removeItem(KEY);
};
