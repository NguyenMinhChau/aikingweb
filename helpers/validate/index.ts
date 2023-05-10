const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegrex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

export const checkPwd = (password: string) => {
	return passwordRegex.test(password);
};
export const checkEmail = (email: string) => {
	return emailRegrex.test(email);
};
