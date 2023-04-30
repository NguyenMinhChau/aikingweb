const KEY = 'loginDataWebAiking';

export const getStore = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const store = localStorage.getItem(KEY);
  return store ? JSON.parse(store) : null;
};
export const setStore = (data: any) => {
  return localStorage.setItem(KEY, JSON.stringify(data));
};
export const removeStore = () => {
  return localStorage.removeItem(KEY);
};
