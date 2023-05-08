import { actions } from '../appState/';
import {
	adminGet,
	userDelete,
	userGet,
	userPost,
	userPut,
} from '../helpers/axios/axiosInstance';
import routers from '../routers/routers';

// FORGOT PASSWORD USER
export const userForgotPwdSV = async (props = {}) => {
	const { email_user, setIsProcess, router, setSnackbar } = props;
	try {
		const resGet = await userGet(`forgot/password/${email_user}`, {});
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Gửi mã thành công, vui lòng kiểm tra email!',
		});
		router.push(routers.signin);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Gửi mã thất bại',
		});
	}
};
// OTP FORGOT PASSWORD USER
export const userOTPForgotPwdSV = async (props = {}) => {
	const { code, setSnackbar, setIsProcess, router } = props;
	try {
		const resGet = await userGet(`otpForGot/${code}`, {});
		// console.log('userOTPForgotPwdSV: ', resGet);
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: resGet?.message || 'Xác thực thành công',
		});
		router.push(routers.signin);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Xác thực thất bại',
		});
	}
};
// CREATE DEPOSITS
export const userCreateDepositsSV = async (props = {}) => {
	const {
		id_user,
		email_user,
		idPayment,
		amountVND,
		token,
		setIsProcessModalDeposits,
		setIsModalUploadDeposits,
		setSnackbar,
		setDataReturn,
		setItemBank,
	} = props;
	try {
		const resPost = await userPost(`deposit/${id_user}`, {
			idPayment,
			status: 'Pending',
			amount: amountVND,
			note: `mobile_${email_user}`,
			token: token,
		});
		// console.log('userCreateDepositsSV: ', resPost);
		setIsProcessModalDeposits(false);
		setIsModalUploadDeposits(true);
		setDataReturn(resPost?.metadata);
		if (setItemBank) {
			const resGetPayment = await adminGet(
				`payment/${
					resPost?.metadata?.idPayment || resPost?.metadata?.paymentId
				}`,
				{},
			);
			setItemBank(resGetPayment?.metadata);
		}
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Vui lòng tải lên hóa đơn thanh toán!',
		});
	} catch (err) {
		console.log(err);
		setIsProcessModalDeposits(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Nạp tiền thất bại',
		});
	}
};
// UPLOAD BILLS DEPOSITS
export const userUploadBillsDepositsSV = async (props = {}) => {
	const {
		id_deposits,
		image,
		token,
		setSnackbar,
		setIsProcessUploadDeposits,
		setIsModalUploadDeposits,
		id_user,
		dispatch,
	} = props;
	const object = {
		image: image[0].image,
		imageName: image[0].fileName,
		statement: image[0],
	};
	try {
		const resPut = await userPut(
			`deposit/image/${id_deposits}`,
			{
				...object,
			},
			{
				headers: {
					token: token,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		// console.log('userUploadBillsDepositsSV: ', resPut);
		const resGet = await userGet(`deposit/${id_user}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		dispatch(
			actions.setData({
				dataDepositsHistory: resGet?.metadata,
			}),
		);
		setIsProcessUploadDeposits(false);
		setIsModalUploadDeposits(false);
		setSnackbar({
			open: true,
			type: 'error',
			message:
				'Tải hóa đơn nạp tiền thành công, vui lòng chờ người quản trị xác nhận!',
		});
	} catch (err) {
		// console.log(err);
		setIsProcessUploadDeposits(false);
		setSnackbar({
			open: true,
			type: 'error',
			message:
				err?.response?.data?.message || 'Tải hóa đơn nạp tiền thất bại',
		});
	}
};
// GET ALL DEPOSITS BY USER
export const userGetDepositsByUserSV = async (props = {}) => {
	const { id_user, setSnackbar, token, dispatch } = props;
	try {
		const resGet = await userGet(`deposit/${id_user}`, {
			headers: {
				token: token,
			},
		});
		// console.log('userGetDepositsByUserSV: ', resGet);
		dispatch(
			actions.setData({
				dataDepositsHistory: resGet?.metadata,
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải dữ liệu thất bại',
		});
	}
};
// CREATE WITHDRAW
export const userCreateWithdrawSV = async (props = {}) => {
	const {
		id_user,
		email_user,
		amountVND,
		idPayment,
		setSnackbar,
		setIsProcessModalWithdraw,
		setModalVerifyWithdraw,
		setItemWithdraw,
		token,
	} = props;
	try {
		const resPost = await userPost(`withdraw/${id_user}`, {
			idPayment,
			status: 'Pending',
			amount: amountVND,
			note: `mobile_${email_user}`,
			token: token,
		});
		// console.log('userCreateWithdrawSV: ', resPost);
		setItemWithdraw(resPost?.metadata?.withdraw);
		setIsProcessModalWithdraw(false);
		setModalVerifyWithdraw(true);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Vui lòng nhập mã xác thực để rút tiền!',
		});
		const resGetPayment = await adminGet(`payment/${idPayment}`, {});
	} catch (err) {
		setIsProcessModalWithdraw(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Rút tiền thất bại',
		});
	}
};
// RESEND OTP WITHDRAW
export const userResendOtpWithdrawSV = async (props = {}) => {
	const { id_withdraw, id_user, setSnackbar, token, setIsProcessResendOTP } =
		props;
	try {
		const resGet = await userGet(
			`withdraw/otp/resend/${id_user}/${id_withdraw}`,
			{
				token: token,
				headers: {
					token: token,
				},
			},
		);
		// console.log('userResendOtpWithdrawSV: ', resGet);
		setIsProcessResendOTP(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Gửi lại mã OTP thành công, vui lòng kiểm tra email!',
		});
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Gửi mã OTP thất bại!',
		});
	}
};
// CANCEL WITHDRAW
export const userCancelWithdrawSV = async (props = {}) => {
	const {
		id_withdraw,
		setSnackbar,
		token,
		setIsProcessCancelWithdraw,
		setModalVerifyWithdraw,
		id_user,
		dispatch,
	} = props;
	try {
		const resDel = await userDelete(`withdraw/cancel/${id_withdraw}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		const resGet = await userGet(`withdraw/${id_user}`, {
			headers: {
				token: token,
			},
		});
		dispatch(
			actions.setData({
				dataWithdrawsHistory: resGet?.metadata,
			}),
		);
		setIsProcessCancelWithdraw(false);
		setModalVerifyWithdraw(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Hủy yêu cầu rút tiền thành công!',
		});
	} catch (err) {
		setIsProcessCancelWithdraw(false);
		setSnackbar({
			open: true,
			type: 'error',
			message:
				err?.response?.data?.message ||
				'Hủy yêu cầu rút tiền thất bại!',
		});
	}
};
// VERIFY WITHDRAW OTP
export const userVerifyWithdrawSV = async (props = {}) => {
	const {
		code,
		setSnackbar,
		token,
		setIsProcessModalWithdraw,
		setModalVerifyWithdraw,
		id_user,
		dispatch,
	} = props;
	try {
		const resPut = await userPut('withdraw/otp', {
			otp: code,
			headers: {
				token: token,
			},
		});
		// console.log('userVerifyWithdrawSV: ', resPut);
		const resGetAll = await userGet(`withdraw/${id_user}`, {
			headers: {
				token: token,
			},
		});
		dispatch(
			actions.setData({
				dataWithdrawsHistory: resGetAll?.metadata,
			}),
		);
		setIsProcessModalWithdraw(false);
		setModalVerifyWithdraw(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Xác thực rút tiền thành công',
		});
	} catch (err) {
		setIsProcessModalWithdraw(false);
		setSnackbar({
			open: true,
			type: 'error',
			message:
				err?.response?.data?.message || 'Xác thực rút tiền thất bại',
		});
	}
};
// GET ALL WITHDRAWS BY USER
export const userGetWithdrawByUserSV = async (props = {}) => {
	const { id_user, setSnackbar, token, dispatch } = props;
	try {
		const resGet = await userGet(`withdraw/${id_user}`, {
			headers: {
				token: token,
			},
		});
		dispatch(
			actions.setData({
				dataWithdrawsHistory: resGet?.metadata,
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải dữ liệu thất bại',
		});
	}
};
// GET ALL WITHDRAWS/DEPOSITS BY USER
export const userGetWithdrawDepositsByUserSV = async (props = {}) => {
	const { id_user, setSnackbar, token, dispatch } = props;
	try {
		const resGetWithdraw = await userGet(`withdraw/${id_user}`, {
			headers: {
				token: token,
			},
		});
		const resGetDeposits = await userGet(`deposit/${id_user}`, {
			headers: {
				token: token,
			},
		});
		dispatch(setDepositsHistoryPL(resGetDeposits?.metadata));
		dispatch(setWithdrawsHistoryPL(resGetWithdraw?.metadata));
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải dữ liệu thất bại',
		});
	}
};
// ADD PAYMENT USER
export const userAddPaymentSV = async (props = {}) => {
	const {
		id_user,
		account,
		token,
		bankName,
		name,
		setSnackbar,
		setisProcessModalReciving,
		setModalRecivingAccount,
		router,
	} = props;
	try {
		const resPut = await userPut(`payment/${id_user}`, {
			accountNumber: account,
			bankName,
			accountName: name,
			token: token,
			headers: {
				token: token,
			},
		});
		// console.log('userAddPaymentSV: ', resPut);
		setisProcessModalReciving(false);
		setModalRecivingAccount(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Thêm phương thức thanh toán thành công',
		});
	} catch (err) {
		setisProcessModalReciving(false);
		setModalRecivingAccount(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Thêm phương thức thanh toán thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const getPaymentByIds = async (props = {}) => {
	const { setSnackbar, id_payment, setPaymentUser } = props;
	try {
		const resGet = await adminGet(`payment/${id_payment}`, {});
		// console.log('getPaymentByIds: ', resGet);
		setPaymentUser(resGet?.metadata);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
// CHANGE PASSWORD USER
export const userChangePasswordSV = async (props = {}) => {
	const {
		id_user,
		token,
		oldPassword,
		newPassword,
		setSnackbar,
		setisProcessModalPwd,
		setmodalChangePwd,
	} = props;
	try {
		const resPut = await userPut(`password/${id_user}`, {
			password: oldPassword,
			new_password: newPassword,
			headers: {
				token: token,
			},
		});
		// console.log('userChangePasswordSV: ', resPut);
		setisProcessModalPwd(false);
		setmodalChangePwd(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Đổi mật khẩu thành công',
		});
	} catch (err) {
		setisProcessModalPwd(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Đổi mật khẩu thất bại. ${
				err?.response?.data?.message || 'Không tìm thấy url'
			}`,
		});
	}
};
// LẤY TỔNG TIỀN GIẢI NGÂN
export const userGetTotalMoneySV = async (props = {}) => {
	const {
		setSnackbar,
		typeContract,
		cycleContract,
		principalContract,
		setDisbursement,
		token,
	} = props;
	try {
		const resPost = await userPost('contract/disbursement/filed', {
			type: typeContract,
			cycle: cycleContract,
			principal: principalContract,
			token: token,
			headers: {
				token: token,
			},
		});
		setDisbursement(resPost?.metadata);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tính tiền giải ngân thất bại. ${err?.response?.data?.message}`,
		});
	}
};
// THÊM HỢP ĐỒNG (CONTRACT)
export const userAddContractSV = async (props = {}) => {
	const {
		id_user,
		cycle,
		principal,
		type,
		timeSend,
		setSnackbar,
		setIsProcessSubmit,
		setIsModalSubmit,
		router,
		token,
		dispatch,
	} = props;
	try {
		const resPost = await userPost(`contract/${id_user}`, {
			cycle, // kỳ hạn
			principal: principal, // số tiền gửi
			type, // quỹ
			day: timeSend, // thời gian gửi
			headers: {
				token: token,
			},
		});
		// console.log('userAddContractSV: ', resPost);
		setIsProcessSubmit(false);
		setIsModalSubmit(false);
		dispatch(
			actions.setData({
				investmentFund: '',
				period: '',
				sendingTime: new Date(),
				deposits: '',
			}),
		);
		alert(
			'Thông tin này đã được gửi về bộ phận quản lý quỹ, bộ phận sẽ sớm liên hệ quý khách để tiến hành làm hợp đồng!',
		);
		router.push(routers.fundManager);
	} catch (err) {
		setIsProcessSubmit(false);
		setIsModalSubmit(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Thêm hợp đồng thất bại',
		});
	}
};
// GET CONTRACT
export const userGetContractSV = async (props = {}) => {
	const { setSnackbar, token, id_user, dispatch } = props;
	try {
		const resGet = await userGet(`contract/${id_user}`, {
			headers: {
				token: token,
			},
		});
		// console.log('userGetContractSV: ', resGet);
		dispatch(
			actions.setData({
				dataContracts: resGet?.metadata,
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
// LẤY TIỀN GIẢI NGÂN THEO ID CONTRACT
export const userGetDisbursementByIdContractSV = async (props = {}) => {
	const { id_contract, token, setSnackbar, setDisbursement } = props;
	try {
		const resGet = await userGet(`contract/disbursement/${id_contract}`, {
			headers: {
				token: token,
			},
		});
		// console.log('userGetDisbursementByIdContractSV: ', resGet);
		setDisbursement((prev) => [...prev, resGet?.metadata]);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Lấy dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
// HỦY HỢP ĐỒNG
export const userCancelContractSV = async (props = {}) => {
	const {
		id_contract,
		id_user,
		setSnackbar,
		token,
		setIsProcessModal,
		setIsModalDetail,
		setIsModalDetailAgriculture,
		dispatch,
	} = props;
	try {
		const resPost = await userGet(`contract/destroy/${id_contract}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		// console.log('userCancelContractSV: ', resPost);
		const resGet = await userGet(`contract/${id_user}`, {
			headers: {
				token: token,
			},
		});
		dispatch(
			actions.setData({
				dataContracts: resGet?.metadata,
			}),
		);
		setIsProcessModal(false);
		setIsModalDetail && setIsModalDetail(false);
		setIsModalDetailAgriculture && setIsModalDetailAgriculture(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Hủy hợp đồng thành công. Vui lòng chờ admin xét duyệt.',
		});
	} catch (err) {
		setIsProcessModal(false);
		setIsModalDetail && setIsModalDetail(false);
		setIsModalDetailAgriculture && setIsModalDetailAgriculture(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Hủy hợp đồng thất bại. ${
				err?.response?.data?.message || 'Không tìm thấy url'
			}`,
		});
	}
};
// UPLOAD LICENSE USER
export const userUploadLicenseSV = async (props = {}) => {
	const {
		id_user,
		token,
		setSnackbar,
		imagePersonNationalityFont,
		imagePersonNationalityBeside,
		imageLicenseFont,
		imageLicenseBeside,
		setisProcessModalUpload,
		setModalUpload,
		setUploadCCCDFont,
		setUploadCCCDBeside,
		setUploadLicenseFont,
		setUploadLicenseBeside,
	} = props;
	const object = {
		cccdFont: imagePersonNationalityFont,
		cccdBeside: imagePersonNationalityBeside,
		licenseFont: imageLicenseFont,
		licenseBeside: imageLicenseBeside,
	};
	try {
		await userPut(
			`image/${id_user}`,
			{
				...object,
			},
			{
				headers: {
					token: token,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		setisProcessModalUpload(false);
		setModalUpload(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Cập nhật giấy tờ thành công!',
		});
		setUploadCCCDFont(null);
		setUploadCCCDBeside(null);
		setUploadLicenseFont(null);
		setUploadLicenseBeside(null);
	} catch (err) {
		setisProcessModalUpload(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật giấy tờ thất bại, lỗi ${
				err?.response?.data?.message || '500 Internal Server Error'
			}`,
		});
	}
};
// LẤY TÀI SẢN
export const userGetAssetSV = async (props = {}) => {
	const { id_user, token, setSnackbar, dispatch } = props;
	try {
		const resGet = await userGet(`dashboard/${id_user}`, {
			headers: {
				token: token,
			},
		});
		dispatch(
			actions.setData({
				dataAssets: resGet?.metadata,
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải tài sản thất bại. ${err?.response?.data?.message}`,
		});
	}
};
