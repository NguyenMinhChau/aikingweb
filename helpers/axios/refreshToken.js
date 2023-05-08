import jwt_decode from 'jwt-decode';
import { getStore, setStore } from '../localStore/localStore';
import { refreshToken } from './axiosInstance';

const requestRefreshToken = async (
	currentUser,
	handleFunc,
	state,
	dispatch,
	actions,
	setSnackbar,
	id,
) => {
	try {
		const accessToken = currentUser?.token;
		if (accessToken) {
			const decodedToken = await jwt_decode(accessToken);
			const date = new Date();
			if (decodedToken.exp < date.getTime() / 1000) {
				const res = await refreshToken(
					`refreshToken/${currentUser?.email}`,
				);
				if (res.status === 200) {
					const refreshUser = {
						...currentUser,
						token: res.metadata.toString(),
					};
					await setStore(refreshUser);
					dispatch(
						actions.setData({
							currentUser: getStore(),
						}),
					);
					currentUser.token = `${res.metadata}`;
					handleFunc(refreshUser, id ? id : '');
					return refreshUser;
				} else {
					setSnackbar({
						open: true,
						type: 'error',
						message:
							'Refresh token không tìm thấy. Vui lòng đăng xuất và đăng nhập lại, xin cảm ơn!',
					});
				}
			} else {
				handleFunc(currentUser, id ? id : '');
				return currentUser;
			}
		}
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lỗi ${err?.response?.data?.message}`,
		});
	}
};
export default requestRefreshToken;
