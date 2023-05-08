'use client';
import { useState, useEffect } from 'react';
import {
	Breadcrumb,
	Button,
	CreditCard,
	CustomercareLine,
	Divider,
	FormInput,
	Modal,
	SnackbarCp,
} from '../../../../../components';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { actions } from '../../../../../appState/';
import { dateFormat, useAppContext } from '../../../../../helpers';
import { autoFormatNumberInputChange } from '../../../../../helpers/format/NumberFormat';
import Link from 'next/link';
import routers from '../../../../../routers/routers';
import { formatVND } from '../../../../../helpers/format/FormatMoney';
import moment from 'moment';
import {
	userCancelWithdrawSV,
	userCreateWithdrawSV,
	userResendOtpWithdrawSV,
	userVerifyWithdrawSV,
} from '../../../../../services/user';
import { adminGetUserByIdSV } from '../../../../../services/admin';
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';

const cx = className.bind(styles);

const WithdrawPage = () => {
	const { state, dispatch } = useAppContext();
	const { amountWithdraw, otpCode, currentUser, userById } = state.set;
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const [isProcessModalWithdraw, setIsProcessModalWithdraw] = useState(false);
	const [isProcessResendOTP, setIsProcessResendOTP] = useState(false);
	const [modalVerifyWithdraw, setModalVerifyWithdraw] = useState(false);
	const [itemWithdraw, setItemWithdraw] = useState<any>(null);
	const [paymentUser, setPaymentUser] = useState<any>(null);
	const [isProcessCancelWithdraw, setIsProcessCancelWithdraw] =
		useState(false);
	const handleModalWithdrawTrue = (e: any) => {
		e.stopPropagation();
		setModalVerifyWithdraw(true);
	};
	const handleModalWithdrawFalse = (e: any) => {
		e.stopPropagation();
		setModalVerifyWithdraw(false);
	};
	const handleCloseSnackbar = (event: any, reason: any) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const colorStatus = (item: any) => {
		switch (item?.status) {
			case 'Completed':
				return 'success';
			case 'Pending':
			case 'Confirmed':
				return 'warning';
			case 'Canceled':
				return 'cancel';
			default:
				return 'info';
		}
	};
	useEffect(() => {
		if (currentUser) {
			adminGetUserByIdSV({
				id_user: currentUser?.id,
				dispatch,
				setSnackbar,
				setPaymentUser,
			});
		}
	}, []);
	const checkbank = userById?.payment?.bank;

	const handleSendWithdrawSV = (data: any) => {
		userCreateWithdrawSV({
			id_user: currentUser?.id,
			idPayment: userById?.payment?.bank,
			email_user: currentUser?.email,
			amountVND: Number(amountWithdraw.replace(/\./g, '')),
			setSnackbar,
			token: data?.token,
			setIsProcessModalWithdraw,
			setModalVerifyWithdraw,
			userById: userById,
			setItemWithdraw,
		});
	};
	const handleSendWithdraw = async (e: any) => {
		if (currentUser) {
			if (!amountWithdraw) {
				setSnackbar({
					open: true,
					type: 'error',
					message: 'Bạn chưa nhập số tiền rút',
				});
			} else if (!checkbank) {
				setSnackbar({
					open: true,
					type: 'error',
					message: 'Bạn chưa thêm tài khoản ngân hàng',
				});
			} else {
				setIsProcessModalWithdraw(true);
				requestRefreshToken(
					currentUser,
					handleSendWithdrawSV,
					state,
					dispatch,
					actions,
					setSnackbar,
				);
			}
		} else {
			setSnackbar({
				open: true,
				type: 'error',
				message:
					'Vui lòng đăng nhập hoặc đăng ký để sử dụng tính năng này!',
			});
		}
	};
	const handleSendOTP = (dataToken: any) => {
		userVerifyWithdrawSV({
			id_user: currentUser?.id,
			dispatch,
			code: otpCode,
			token: dataToken?.token,
			setSnackbar,
			setIsProcessModalWithdraw,
			setModalVerifyWithdraw,
		});
	};
	const handleAuthenWithdraw = async (e: any) => {
		if (!otpCode) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn chưa nhập mã xác thực',
			});
		} else {
			setIsProcessModalWithdraw(true);
			requestRefreshToken(
				currentUser,
				handleSendOTP,
				state,
				dispatch,
				actions,
				setSnackbar,
			);
			dispatch(
				actions.setData({
					amountWithdraw: '',
					otpCode: '',
				}),
			);
		}
	};
	const handleCancelWithdrawSV = (dataToken: any, id: any) => {
		userCancelWithdrawSV({
			id_user: currentUser?.id,
			dispatch,
			id_withdraw: id,
			token: dataToken?.token,
			setSnackbar,
			setIsProcessCancelWithdraw,
			setModalVerifyWithdraw,
		});
	};
	const handleCancelWithdraw = async (id: any) => {
		setIsProcessCancelWithdraw(true);
		requestRefreshToken(
			currentUser,
			handleCancelWithdrawSV,
			state,
			dispatch,
			actions,
			setSnackbar,
			id,
		);
		dispatch(
			actions.setData({
				amountWithdraw: '',
				otpCode: '',
			}),
		);
	};
	const resendOtpSV = (dataToken: any, id: any) => {
		userResendOtpWithdrawSV({
			id_user: currentUser.id,
			id_withdraw: id,
			dispatch,
			token: dataToken?.token,
			setSnackbar,
			setIsProcessResendOTP,
		});
	};
	const handleResendOTP = async (id: any) => {
		setIsProcessResendOTP(true);
		requestRefreshToken(
			currentUser,
			resendOtpSV,
			state,
			dispatch,
			actions,
			setSnackbar,
			id,
		);
	};
	return (
		<>
			<Breadcrumb pageName="Rút tiền" description="Rút tiền" />
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<div className="container mb-5">
				<h1 className="font-bold mb-3 text-center uppercase">
					Thông tin rút tiền
				</h1>
				<Divider />
				<div className="flex flex-wrap lg:flex-nowrap sm:flex-nowrap justify-center items-center lg:items-start md:items-start flex-col lg:flex-row sm:flex-row w-full">
					<div className="lg:w-1/2 sm:w-1/2 w-full lg:mr-1 md:mr-1">
						<FormInput
							label="Số tiền rút"
							placeholder="---"
							value={amountWithdraw}
							name="amountWithdraw"
							onChange={(e) =>
								dispatch(
									actions.setData({
										amountWithdraw:
											autoFormatNumberInputChange(
												e.target.value,
											),
									}),
								)
							}
							unit={amountWithdraw && 'VND'}
						/>
						<Link
							href={routers.historyDepositWithdraw}
							className="font-bold text-primary"
						>
							Xem lịch sử nạp/rút tiền
						</Link>
						<Button
							className={`${cx(
								'btn_submit',
							)} successbgcbold w-full mb-3 mt-1`}
							onClick={handleSendWithdraw}
							isProcess={isProcessModalWithdraw}
							disabled={isProcessModalWithdraw}
						>
							Tiếp tục
						</Button>
					</div>
					<div className="lg:w-1/2 sm:w-1/2 w-full lg:ml-1 md:ml-1">
						<p className="font-bold text-sm mb-2">
							Tài khoản nhận tiền
						</p>
						{checkbank ? (
							<CreditCard
								bankName={paymentUser?.bank_name}
								cardNumber={paymentUser?.account_number}
								accountName={paymentUser?.account_name}
							/>
						) : (
							<div>
								Vui lòng tạo{' '}
								<Link
									href={routers.fundProfile}
									className="font-bold text-primary"
								>
									tài khoản nhận tiền
								</Link> trước khi thực hiện rút.
							</div>
						)}
					</div>
				</div>
			</div>
			{modalVerifyWithdraw && (
				<Modal
					openModal={handleModalWithdrawTrue}
					closeModal={handleModalWithdrawFalse}
					titleHeader="Xác thực rút tiền"
					actionButtonText="Gửi"
					classNameButton={`infobgc`}
					isProcess={isProcessModalWithdraw}
					isProcessCancel={isProcessCancelWithdraw}
					onClick={handleAuthenWithdraw}
					onClickCancel={() => handleCancelWithdraw(itemWithdraw?.id)}
					textCancel="Xóa lệnh rút"
				>
					<CustomercareLine
						nameIcon="fa-solid fa-rotate-right"
						colorIcon="success"
						colorStatus={`status ${
							colorStatus(itemWithdraw || 'info') + 'bgc'
						}`}
						title="Trạng thái:"
						textLink={itemWithdraw?.status || 'Pending'}
					/>
					<CustomercareLine
						nameIcon="fa-regular fa-clock"
						colorIcon="info"
						title="Ngày rút:"
						textLink={moment(itemWithdraw?.createdAt).format(
							'DD/MM/YYYY HH:mm:ss',
						)}
					/>
					<CustomercareLine
						nameIcon="fa-solid fa-money-bill"
						colorIcon="warning"
						title="Số tiền rút:"
						colorStatus="info"
						textLink={formatVND(itemWithdraw?.amount || 0)}
					/>
					<CustomercareLine
						nameIcon="fa fa-bank"
						colorIcon="cancel"
						title="Ngân hàng thụ hưởng:"
						bankMethod
						bankName={paymentUser?.bank_name}
						accountName={paymentUser?.account_name}
						accountNumber={paymentUser?.account_number}
					/>
					<FormInput
						label="Mã xác thực"
						placeholder="---"
						value={otpCode}
						name="otpCode"
						onChange={(e) =>
							dispatch(
								actions.setData({ otpCode: e.target.value }),
							)
						}
						classNameField={`mt8`}
					/>
					<div
						className={`${cx(
							'text_resend',
						)} cursor-pointer font-bold cancel inline-block`}
						onClick={
							isProcessResendOTP
								? () => {}
								: () => handleResendOTP(itemWithdraw?.id)
						}
					>
						{isProcessResendOTP ? 'Đang gửi mã...' : 'Gửi lại mã'}
					</div>
				</Modal>
			)}
		</>
	);
};

export default WithdrawPage;
