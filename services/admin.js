import { actions } from '../appState/';
import {
	adminDelete,
	adminGet,
	adminPost,
	adminPut,
} from '../helpers/axios/axiosInstance';

// GET ALLPAYMENT ADMINS
export const getAllPaymentAdminsSV = async (props = {}) => {
	const { setSnackbar, setBankAdmins } = props;
	try {
		const resGet = await adminGet('payment', {});
		// console.log('getAllPaymentAdmins: ', resGet);
		setBankAdmins(
			resGet?.metadata.filter((x) => x.type_payment === 'admin'),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Đã xảy ra lỗi. ${err?.response?.data?.message}`,
		});
	}
};
export const getAllPaymentsSV = async (props = {}) => {
	const { setSnackbar, setDataPayments } = props;
	try {
		const resGet = await adminGet('payment', {});
		// console.log('getAllPaymentAdmins: ', resGet);
		setDataPayments(resGet?.metadata);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Đã xảy ra lỗi. ${err?.response?.data?.message}`,
		});
	}
};

// ADD RATE
export const adminAddRateSV = async (props = {}) => {
	const { rate, setSnackbar } = props;
	try {
		const resPost = await adminPost('addRate', {
			rate,
		});
		// console.log('adminAddRateSV: ', resPost);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Thêm giá thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// GET RATE
export const adminGetRateSV = async (props = {}) => {
	const { id_rate, setSnackbar } = props;
	try {
		const resGet = await adminGet(`getRate/${id_rate}`, {});
		// console.log('adminGetRateSV: ', resGet);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy giá thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// UPDATE RATE
export const adminUpdateRateSV = async (props = {}) => {
	const { id_rate, rate, setSnackbar } = props;
	try {
		const resPut = await adminPut(`updateRate/${id_rate}`, {
			rate,
		});
		// console.log('adminUpdateRateSV: ', resPut);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Sửa giá thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// DELETE RATE
export const adminDeleteRateSV = async (props = {}) => {
	const { id_rate, setSnackbar } = props;
	try {
		const resDelete = await adminDelete(`deleteRate/${id_rate}`, {});
		// console.log('adminDeleteRateSV: ', resDelete);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa giá thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// GET ALL USERS
export const adminGetAllUsersSV = async (props = {}) => {
	const { setSnackbar } = props;
	try {
		const resGet = await adminGet('allUsers', {});
		// console.log('adminGetAllUsersSV: ', resGet);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// GET USER BY ID
export const adminGetUserByIdSV = async (props = {}) => {
	const { id_user, dispatch, setSnackbar, setPaymentUser } = props;
	try {
		const resGet = await adminGet(`user/${id_user}`, {});
		// console.log('adminGetUserByIdSV: ', resGet);
		dispatch(
			actions.setData({
				userById: resGet?.metadata,
			}),
		);
		if (setPaymentUser) {
			const resGetPayment = await adminGet(
				`payment/${resGet?.metadata?.payment?.bank}`,
				{},
			);
			// console.log('getPaymentByIds: ', resGetPayment);
			setPaymentUser(resGetPayment?.metadata);
		}
	} catch (err) {
		console.log(err);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Đã xảy ra lỗi. ${err?.response?.data?.message}`,
		});
	}
};
export const getAllPaymentAdmins = async (props = {}) => {
	const { setSnackbar, setBankAdmins } = props;
	try {
		const resGet = await adminGet('payment', {});
		// console.log('getAllPaymentAdmins: ', resGet);
		setBankAdmins(
			resGet?.metadata.filter((x) => x.type_payment === 'admin'),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Đã xảy ra lỗi. ${err?.response?.data?.message}`,
		});
	}
};
// UPDATE USER BY ID
export const adminUpdateUserByIdSV = async (props = {}) => {
	const { id_user, setSnackbar } = props;
	try {
		const resPut = await adminPut(`updateUser/${id_user}`, {});
		// console.log('adminUpdateUserByIdSV: ', resPut);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Sửa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// DELETE USER BY ID
export const adminDeleteUserByIdSV = async (props = {}) => {
	const { id_user, setSnackbar } = props;
	try {
		const resDel = await adminDelete(`deleteUser/${id_user}`, {});
		console.log('adminDeleteUserByIdSV: ', resDel);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// GET ALL PAYMENTS
export const adminGetAllPaymentsSV = async (props = {}) => {
	const { setSnackbar } = props;
	try {
		const resGet = await adminGet('getPayments', {});
		// console.log('adminGetAllPaymentsSV: ', resGet);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// GET PAYMENT BY ID
export const adminGetPaymentByIdSV = async (props = {}) => {
	const { id_payment, setSnackbar, setDataBank } = props;
	try {
		const resGet = await adminGet(`payment/${id_payment}`, {});
		if (setDataBank) {
			setDataBank(resGet?.metadata);
		}
		// console.log('adminGetPaymentByIdSV: ', resGet);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// ADD PAYMENT
export const adminAddPaymentSV = async (props = {}) => {
	const { payment, setSnackbar } = props;
	try {
		const resPost = await adminPost('addPayment', {
			payment,
		});
		// console.log('adminAddPaymentSV: ', resPost);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Thêm phương thức thanh toán thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// UPDATE PAYMENT
export const adminUpdatePaymentSV = async (props = {}) => {
	const { id_payment, setSnackbar } = props;
	try {
		const resPut = await adminPut(`updatePayment/${id_payment}`, {});
		// console.log('adminUpdatePaymentSV: ', resPut);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Sửa phương thức thanh toán thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// DELETE PAYMENT
export const adminDeletePaymentSV = async (props = {}) => {
	const { id_payment, setSnackbar } = props;
	try {
		const resDel = await adminDelete(`deletePayment/${id_payment}`, {});
		// console.log('adminDeletePaymentSV: ', resDel);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa phương thức thanh toán thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// GET ALL DEPOSITS
export const adminGetAllDepositsSV = async (props = {}) => {
	const { setSnackbar } = props;
	try {
		const resGet = await adminGet('deposits', {});
		// console.log('adminGetAllDepositsSV: ', resGet);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// GET DEPOSIT BY ID
export const adminGetDepositByIdSV = async (props = {}) => {
	const { id_deposit, setSnackbar } = props;
	try {
		const resGet = await adminGet(`deposit/${id_deposit}`, {});
		// console.log('adminGetDepositByIdSV: ', resGet);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// UPDATE DEPOSITS
export const adminUpdateDepositSV = async (props = {}) => {
	const { id_deposit, setSnackbar } = props;
	try {
		const resPut = await adminPut(`updateDeposit/${id_deposit}`, {});
		// console.log('adminUpdateDepositSV: ', resPut);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Sửa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// DELETE DEPOSIT
export const adminDeleteDepositSV = async (props = {}) => {
	const { id_deposit, setSnackbar } = props;
	try {
		const resDel = await adminDelete(`deleteDeposit/${id_deposit}`, {});
		// console.log('adminDeleteDepositSV: ', resDel);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// UPDATE STATUS DEPOSITS
export const adminUpdateStatusDepositSV = async (props = {}) => {
	const { id_deposit, status, setSnackbar } = props;
	try {
		const resPut = await adminPut(`handleDeposit/${id_deposit}`, {
			status,
		});
		// console.log('adminUpdateStatusDepositSV: ', resPut);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// GET ALL WITHDRAWS
export const adminGetAllWithdrawsSV = async (props = {}) => {
	const { setSnackbar } = props;
	try {
		const resGet = await adminGet('withdraws', {});
		// console.log('adminGetAllWithdrawsSV: ', resGet);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// GET WITHDRAW BY ID
export const adminGetWithdrawByIdSV = async (props = {}) => {
	const { id_withdraw, setSnackbar } = props;
	try {
		const resGet = await adminGet(`withdraw/${id_withdraw}`, {});
		// console.log('adminGetWithdrawByIdSV: ', resGet);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// UPDATE WITHDRAW
export const adminUpdateWithdrawSV = async (props = {}) => {
	const { id_withdraw, setSnackbar } = props;
	try {
		const resPut = await adminPut(`updateWithdraw/${id_withdraw}`, {});
		// console.log('adminUpdateWithdrawSV: ', resPut);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Sửa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// DELETE WITHDRAW
export const adminDeleteWithdrawSV = async (props = {}) => {
	const { id_withdraw, setSnackbar } = props;
	try {
		const resDel = await adminDelete(`deleteWithdraw/${id_withdraw}`, {});
		// console.log('adminDeleteWithdrawSV: ', resDel);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// UPDATE STATUS WITHDRAW
export const adminUpdateStatusWithdrawSV = async (props = {}) => {
	const { id_withdraw, status, setSnackbar } = props;
	try {
		const resPut = await adminPut(`handleWithdraw/${id_withdraw}`, {
			status,
		});
		// console.log('adminUpdateStatusWithdrawSV: ', resPut);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};
// UPDATE STATUS CONTRACT
export const adminUpdateStatusContractSV = async (props = {}) => {
	const { id_contract, status, setSnackbar } = props;
	try {
		const resPut = await adminPut(`handleContract/${id_contract}`, {
			status,
		});
		// console.log('adminUpdateStatusContractSV: ', resPut);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
		});
	}
};

export const getAllForumContentSV = async (props = {}) => {
	const { token, setSnackbar, dispatch, state } = props;
	try {
		const resGet = await adminGet(
			'forum',
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		dispatch(
			actions.setData({
				dataForum: resGet?.metadata,
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};

export const getForumByIdSV = async (props = {}) => {
	const { id_post, setSnackbar, dispatch, state, token } = props;
	try {
		const resGet = await adminGet(
			`forum/${id_post}`,
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		dispatch(
			actions.setData({
				setItem: {
					...state.set.edit,
					dataItem: resGet?.metadata,
				},
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
