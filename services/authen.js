import { actions } from '../appState/';
import { authPost } from '../helpers/axios/axiosInstance';
import {
	getStore,
	removeStore,
	setStore,
} from '../helpers/localStore/localStore';
import routers from '../routers/routers';

// REGISTER AUTHEN
export const authRegisterSV = async (props = {}) => {
	const { email, password, username, router, setIsProcess, setSnackbar } =
		props;
	try {
		await authPost('register', {
			email: email,
			password: password,
			username: username,
		});
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: success,
			mesage: 'Đăng kí thành công',
		});
		router.push(routers.signin);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Đăng kí thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// LOGIN AUTHEN
export const authLoginSV = async (props = {}) => {
	const { email, password, setSnackbar, dispatch, router, setIsProcess } =
		props;
	try {
		const resPost = await authPost('login', {
			username: email,
			password: password,
		});
		// console.log('authLoginSV: ', resPost);
		await setStore({
			token: resPost?.metadata?.token,
			username: resPost?.metadata?.user?.payment?.username,
			email: resPost?.metadata?.user?.payment?.email,
			rule: resPost?.metadata?.user?.payment.rule,
			rank: resPost?.metadata?.user?.rank,
			id: resPost?.metadata?.user?._id,
			balance: resPost?.metadata?.user?.Wallet?.balance,
		});
		await dispatch(
			actions.setData({
				currentUser: getStore(),
				email: '',
				password: '',
			}),
		);
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Đăng nhập thành công!',
		});
		router.push(routers.home);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Đăng nhập thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// LOGOUT AUTHEN
export const authLogoutSV = async (props = {}) => {
	const { email_user, router, setSnackbar, dispatch, setIsProcess } = props;
	try {
		const resPost = await authPost(`logout/${email_user}`, {});
		// console.log('authLogoutSV: ', resPost);
		await removeStore();
		await dispatch(
			actions.setData({
				currentUser: getStore(),
			}),
		);
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Đăng xuất thành công!',
		});
		router.push(routers.home);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Đăng xuất thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
