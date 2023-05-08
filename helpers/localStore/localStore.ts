const KEY = 'loginDataWebAiking';

export const getStore = () => {
	if (typeof window !== 'undefined') {
		const store = localStorage?.getItem(KEY);
		return store ? JSON.parse(store) : null;
	}
};
export const setStore = (data: any) => {
	if (typeof window !== 'undefined') {
		return localStorage?.setItem(KEY, JSON.stringify(data));
	}
};
export const removeStore = () => {
	if (typeof window !== 'undefined') {
		return localStorage?.removeItem(KEY);
	}
};
