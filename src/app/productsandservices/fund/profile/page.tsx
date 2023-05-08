'use client';
import React, { useState, useCallback, useEffect } from 'react';
import {
	Breadcrumb,
	CreditCard,
	CustomercareLine,
	Divider,
	FormInput,
	LoginRegisterCp,
	Modal,
	SelectValueCp,
	SnackbarCp,
} from '../../../../../components';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { useAppContext } from '../../../../../helpers';
import routers from '../../../../../routers/routers';
import Image from 'next/image';
import IMAGE from '../../../../../public/images/creditCard/logo-company.png';
import { actions } from '../../../../../appState/';
import { formatVND } from '../../../../../helpers/format/FormatMoney';
import { UploadIcon } from '../../../../../public/svgs';
import { dataBank } from '../../../../../helpers/dataBank';
import { adminGetUserByIdSV } from '../../../../../services/admin';
import {
	userAddPaymentSV,
	userChangePasswordSV,
	userUploadLicenseSV,
} from '../../../../../services/user';
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';

const cx = className.bind(styles);
type RenderImageDocumentType = {
	nameFile?: string;
	idFile?: string;
	urlImage?: string;
	urlImagePending?: string;
	onChange?: any;
};
const ProfilePage = () => {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		userById,
		email,
		otpCode,
		bankName,
		accountNumber,
		accountName,
		password,
		confirmPassword,
		oldPassword,
	} = state.set;
	const [showEye, setShowEye] = useState(false);
	const [isProcessModalEmail, setIsProcessModalEmail] = useState(false);
	const [modalEmail, setModalEmail] = useState(false);
	const [isShowOTP, setIsShowOTP] = useState(false);
	const [modalRecivingAccount, setModalRecivingAccount] = useState(false);
	const [showSelect, setShowSelect] = useState(false);
	const [isProcessModalReciving, setisProcessModalReciving] = useState(false);
	const [modalChangePwd, setmodalChangePwd] = useState(false);
	const [modalUpload, setModalUpload] = useState(false);
	const [isProcessModalPwd, setisProcessModalPwd] = useState(false);
	const [isProcessModalUpload, setisProcessModalUpload] = useState(false);
	const [uploadCCCDFont, setUploadCCCDFont] = useState<any>(null);
	const [paymentUser, setPaymentUser] = useState<any>(null);
	const [uploadCCCDBeside, setUploadCCCDBeside] = useState<any>(null);
	const [uploadLicenseFont, setUploadLicenseFont] = useState<any>(null);
	const [uploadLicenseBeside, setUploadLicenseBeside] = useState<any>(null);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const handleCloseSnackbar = (event: any, reason: any) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const handleModalEmailTrue = (e: any) => {
		e.stopPropagation();
		setModalEmail(true);
	};
	const handleModalEmailFalse = (e: any) => {
		e.stopPropagation();
		setIsShowOTP(false);
		setModalEmail(false);
		dispatch(
			actions.setData({
				email: '',
				otpCode: '',
			}),
		);
	};
	const handleShowEye = () => {
		setShowEye(!showEye);
	};
	const handleModalRecivingTrue = (e: any) => {
		e.stopPropagation();
		setModalRecivingAccount(true);
	};
	const handleModalRecivingFalse = (e: any) => {
		e.stopPropagation();
		setModalRecivingAccount(false);
		dispatch(
			actions.setData({
				bankName: '',
				accountName: '',
				accountNumber: '',
			}),
		);
	};
	const handleModalPwdTrue = (e: any) => {
		e.stopPropagation();
		setmodalChangePwd(true);
	};
	const handleModalPwdFalse = (e: any) => {
		e.stopPropagation();
		setmodalChangePwd(false);
		dispatch(
			actions.setData({
				oldPassword: '',
				password: '',
				confirmPassword: '',
			}),
		);
	};
	const handleModalUploadTrue = (e: any) => {
		e.stopPropagation();
		setModalUpload(true);
	};
	const handleModalUploadFalse = (e: any) => {
		e.stopPropagation();
		setModalUpload(false);
		setUploadCCCDFont(null);
		setUploadCCCDBeside(null);
		setUploadLicenseFont(null);
		setUploadLicenseBeside(null);
	};
	const handleClick = () => {
		setSnackbar({
			open: true,
			type: 'info',
			message: 'Giao diện đang được phát triển!',
		});
	};
	const RenderImageDocument = ({
		nameFile,
		idFile,
		urlImage,
		urlImagePending,
		onChange,
	}: RenderImageDocumentType) => {
		return (
			<label className={`${cx('image-item')}`} id={idFile}>
				{!urlImage && !urlImagePending ? (
					<>
						<UploadIcon className={`${cx('icon-upload')}`} />
					</>
				) : (
					<Image
						src={
							!urlImagePending
								? `${
										process.env.NEXT_PUBLIC_URL_SERVER
								  }/${urlImage?.replace('uploads/', '')}`
								: urlImagePending
						}
						alt=""
						width={200}
						height={200}
						className={`${cx('image-view')}`}
					/>
				)}
				<input
					type="file"
					id={idFile}
					className={`${cx('input-file')}`}
					name={nameFile}
					onChange={onChange}
				/>
			</label>
		);
	};
	const handleChangeUploadCCCDFont = useCallback(
		(e: any) => {
			const { files } = e.target;
			setUploadCCCDFont({
				url: URL.createObjectURL(files[0]),
				file: files[0],
			});
		},
		[uploadCCCDFont],
	);
	const handleChangeUploadCCCDBeside = useCallback(
		(e: any) => {
			const { files } = e.target;
			setUploadCCCDBeside({
				url: URL.createObjectURL(files[0]),
				file: files[0],
			});
		},
		[uploadCCCDBeside],
	);
	const handleChangeUploadLicenseFont = useCallback(
		(e: any) => {
			const { files } = e.target;
			setUploadLicenseFont({
				url: URL.createObjectURL(files[0]),
				file: files[0],
			});
		},
		[uploadLicenseFont],
	);
	const handleChangeUploadLicenseBeside = useCallback(
		(e: any) => {
			const { files } = e.target;
			setUploadLicenseBeside({
				url: URL.createObjectURL(files[0]),
				file: files[0],
			});
		},
		[uploadLicenseBeside],
	);
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
	const handleSendPwd = (dataToken: any) => {
		userChangePasswordSV({
			id_user: currentUser?.id,
			token: dataToken?.token,
			oldPassword: oldPassword,
			newPassword: password,
			setSnackbar,
			setisProcessModalPwd,
			setmodalChangePwd,
		});
	};
	const handleChangePwd = async () => {
		if (!password || !oldPassword || !confirmPassword) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Vui lòng nhập đầy đủ thông tin',
			});
		} else if (password !== confirmPassword) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Mật khẩu không khớp',
			});
		} else {
			setisProcessModalPwd(true);
			requestRefreshToken(
				currentUser,
				handleSendPwd,
				state,
				dispatch,
				actions,
				setSnackbar,
			);
		}
	};
	const handleSendUploadSV = (dataToken: any) => {
		userUploadLicenseSV({
			id_user: currentUser?.id,
			token: dataToken?.token,
			setSnackbar,
			setisProcessModalUpload,
			setModalUpload,
			imagePersonNationalityFont: uploadCCCDFont?.file,
			imagePersonNationalityBeside: uploadCCCDBeside?.file,
			imageLicenseFont: uploadLicenseFont?.file,
			imageLicenseBeside: uploadLicenseBeside?.file,
			setUploadCCCDFont,
			setUploadCCCDBeside,
			setUploadLicenseFont,
			setUploadLicenseBeside,
		});
	};
	const handleUpload = async () => {
		if (
			(userById?.uploadCCCDFont || uploadCCCDFont) &&
			(userById?.uploadCCCDBeside || uploadCCCDBeside) &&
			(userById?.uploadLicenseFont || uploadLicenseFont) &&
			(userById?.uploadLicenseBeside || uploadLicenseBeside)
		) {
			setisProcessModalUpload(true);
			requestRefreshToken(
				currentUser,
				handleSendUploadSV,
				state,
				dispatch,
				actions,
				setSnackbar,
			);
		} else {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Vui lòng chọn đầy đủ ảnh',
			});
		}
	};
	const handleAuthenOTP = async () => {
		if (!otpCode) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Vui lòng nhập mã OTP!',
			});
		} else {
			setIsProcessModalEmail(true);
			setTimeout(() => {
				setIsProcessModalEmail(false);
				setModalEmail(false);
				setIsShowOTP(false);
				console.log(otpCode);
				setSnackbar({
					open: true,
					type: 'info',
					message: 'Chức năng đang được phát triển!',
				});
				dispatch(actions.setData({ otpCode: '' }));
			}, 3000);
		}
	};
	const handleSubmitNewEmail = async () => {
		if (!email) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Vui lòng nhập email!',
			});
		} else {
			setIsProcessModalEmail(true);
			setTimeout(() => {
				setIsProcessModalEmail(false);
				console.log(email);
				setIsShowOTP(true);
				dispatch(actions.setData({ email: '' }));
			}, 3000);
		}
	};
	const handleSendMethod = (dataToken: any) => {
		userAddPaymentSV({
			id_user: currentUser?.id,
			account: accountNumber,
			bankName: bankName?.name,
			name: accountName,
			setSnackbar,
			setisProcessModalReciving,
			setModalRecivingAccount,
			token: dataToken?.token,
		});
	};
	const handleAddMethod = async () => {
		if (!bankName || !accountName || !accountNumber) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Vui lòng nhập đầy đủ thông tin',
			});
		} else {
			setisProcessModalReciving(true);
			requestRefreshToken(
				currentUser,
				handleSendMethod,
				state,
				dispatch,
				actions,
				setSnackbar,
			);
			adminGetUserByIdSV({
				id_user: currentUser?.id,
				dispatch,
				setSnackbar,
				setPaymentUser,
			});
			dispatch(
				actions.setData({
					bankName: '',
					accountName: '',
					accountNumber: '',
				}),
			);
		}
	};
	return (
		<>
			<Breadcrumb pageName="Tài khoản" description="Tài khoản" />
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<div className="container mb-5">
				<h1 className="font-bold mb-3 text-center uppercase">
					Thông tin cá nhân
				</h1>
				<Divider />
				<div className="flex flex-wrap lg:flex-nowrap sm:flex-nowrap justify-center items-center lg:items-start md:items-start flex-col lg:flex-row sm:flex-row w-full">
					<div
						className={`${cx(
							'item_container',
						)} lg:w-1/2 sm:w-1/2 w-full lg:mr-1 md:mr-1 p-3`}
					>
						{currentUser ? (
							<>
								<div className={`${cx('authen_container')}`}>
									<Image
										src={IMAGE}
										alt="image_user"
										className={`${cx('image_user')}`}
									/>
									<div
										className={`${cx(
											'authen_email_container',
										)}`}
									>
										<div className={`${cx('name_user')}`}>
											{currentUser?.username ||
												'Aiking Group'}
										</div>
										<div
											className={`${cx('email_authen')}`}
											onClick={handleModalEmailTrue}
										>
											<span>
												{currentUser?.email ||
													'aikinginvestment@gmail.com'}
											</span>
											<i className="bx bx-chevron-right"></i>
										</div>
										<div
											className={`${cx(
												'btn_authen',
												'success',
											)}`}
										>
											Đã xác thực
										</div>
									</div>
								</div>
								<CustomercareLine
									nameIcon="bx bx-wallet"
									colorIcon="success"
									title="Tổng tài sản:"
									price={formatVND(currentUser?.balance || 0)}
									eye
									showEye={showEye}
									handleShowEye={handleShowEye}
								/>
								<CustomercareLine
									nameIcon="bx bxs-credit-card-alt"
									colorIcon="cancel"
									link={'##'}
									textLink="Tài khoản nhận tiền"
									onClick={handleModalRecivingTrue}
								/>
								<CustomercareLine
									nameIcon="fa-solid fa-arrows-rotate"
									colorIcon="info"
									link={'##'}
									textLink="Đổi mật khẩu"
									onClick={handleModalPwdTrue}
								/>
								<CustomercareLine
									nameIcon="fas fa-upload"
									colorIcon="success"
									link={'##'}
									textLink="Giấy phép lái xe/CCCD"
									onClick={handleModalUploadTrue}
								/>
								<CustomercareLine
									nameIcon="fas fa-link"
									colorIcon="warning"
									link={'##'}
									textLink="Tài khoản liên kết"
									noneBorderBottom
									onClick={handleClick}
								/>
							</>
						) : (
							<LoginRegisterCp />
						)}
					</div>
					<div
						className={`${cx(
							'item_container',
						)} lg:w-1/2 sm:w-1/2 w-full lg:ml-1 md:ml-1 p-3`}
					>
						<CustomercareLine
							nameIcon="fa-regular fa-newspaper"
							colorIcon="success"
							link={'##'}
							textLink="Điều kiện và điều khoản"
							onClick={handleClick}
						/>
						<CustomercareLine
							nameIcon="fa-solid fa-user-plus"
							colorIcon="warning"
							link={'##'}
							textLink="Mời bạn bè"
							onClick={handleClick}
						/>
						<CustomercareLine
							nameIcon="fa-solid fa-users"
							colorIcon="cancel"
							link={'##'}
							textLink="Hoa hồng cho nhà đầu tư"
							onClick={handleClick}
						/>
						<CustomercareLine
							nameIcon="fa-solid fa-circle-info"
							colorIcon="info"
							link={'##'}
							textLink="Hướng dẫn sử dụng"
							onClick={handleClick}
						/>
						<CustomercareLine
							nameIcon="fa-solid fa-phone"
							colorIcon="success"
							link={`${routers.fundCustomerCare}`}
							textLink="CSKH"
							noneBorderBottom={!currentUser}
						/>
					</div>
				</div>
			</div>
			{modalEmail && (
				<Modal
					openModal={handleModalEmailTrue}
					closeModal={handleModalEmailFalse}
					titleHeader={isShowOTP ? 'Xác thực OTP' : 'Thay đổi email'}
					actionButtonText={isShowOTP ? 'Xác thực' : 'Gửi OTP'}
					classNameButton={'infobgc'}
					isProcess={isProcessModalEmail}
					onClick={isShowOTP ? handleAuthenOTP : handleSubmitNewEmail}
				>
					{isShowOTP ? (
						<FormInput
							label="Mã OTP"
							placeholder="Nhập mã"
							name="otpCode"
							value={otpCode}
							onChange={(e) =>
								dispatch(
									actions.setData({
										otpCode: e.target.value,
									}),
								)
							}
						/>
					) : (
						<FormInput
							label="Nhập email mới"
							placeholder="Ví dụ: example@gmail.com"
							name="email"
							value={email}
							onChange={(e) =>
								dispatch(
									actions.setData({ email: e.target.value }),
								)
							}
						/>
					)}
				</Modal>
			)}
			{modalRecivingAccount && (
				<Modal
					openModal={handleModalRecivingTrue}
					closeModal={handleModalRecivingFalse}
					titleHeader="Tài khoản nhận tiền"
					actionButtonText="Gửi"
					classNameButton={`warningbgc`}
					isProcess={isProcessModalReciving}
					onClick={handleAddMethod}
					hideButton={checkbank}
				>
					<p className={`${cx('text_desc')} info fwb mb8`}>
						Nếu đã có tài khoản nhưng không hiện thông tin. Vui lòng
						F5 lại trang, xin cảm ơn!
					</p>
					{checkbank ? (
						<CreditCard
							bankName={paymentUser?.bank_name}
							cardNumber={paymentUser?.account_number}
							accountName={paymentUser?.account_name}
						/>
					) : (
						<>
							<FormInput
								label="Số tài khoản"
								placeholder="---"
								name="accountNumber"
								value={accountNumber}
								onChange={(e) =>
									dispatch(
										actions.setData({
											accountNumber: e.target.value,
										}),
									)
								}
							/>
							<FormInput
								label="Tên tài khoản"
								placeholder="---"
								name="accountName"
								value={accountName}
								onChange={(e) =>
									dispatch(
										actions.setData({
											accountName: e.target.value,
										}),
									)
								}
							/>
							<SelectValueCp
								label="Tên ngân hàng"
								value={bankName?.name}
								placeholder="---"
								data={dataBank}
								nameSet="bankName"
								stateSelect={showSelect}
								setStateSelect={setShowSelect}
							/>
						</>
					)}
				</Modal>
			)}
			{modalChangePwd && (
				<Modal
					openModal={handleModalPwdTrue}
					closeModal={handleModalPwdFalse}
					titleHeader="Thay đổi mật khẩu"
					actionButtonText="Gửi"
					isProcess={isProcessModalPwd}
					classNameButton={`warningbgc`}
					onClick={handleChangePwd}
				>
					<FormInput
						label="Mật khẩu cũ"
						placeholder="Nhập mật khẩu cũ"
						name="oldPassword"
						value={oldPassword}
						showPwd
						onChange={(e: any) =>
							dispatch(
								actions.setData({
									oldPassword: e.target.value,
								}),
							)
						}
					/>
					<FormInput
						label="Mật khẩu mới"
						placeholder="Nhập mật khẩu mới"
						name="password"
						value={password}
						showPwd
						onChange={(e) =>
							dispatch(
								actions.setData({ password: e.target.value }),
							)
						}
					/>
					<FormInput
						label="Xác thực mật khẩu"
						placeholder="Xác thực"
						name="confirmPassword"
						value={confirmPassword}
						showPwd
						onChange={(e) =>
							dispatch(
								actions.setData({
									confirmPassword: e.target.value,
								}),
							)
						}
					/>
				</Modal>
			)}
			{modalUpload && (
				<Modal
					openModal={handleModalUploadTrue}
					closeModal={handleModalUploadFalse}
					titleHeader="Tải giấy tờ"
					actionButtonText="Gửi"
					isProcess={isProcessModalUpload}
					classNameButton={`warningbgc`}
					onClick={handleUpload}
				>
					<div className={`${cx('container-document')}`}>
						<p className={`${cx('text_desc')} info fwb mb8`}>
							Nếu đã tải giấy tờ nhưng không hiện thông tin. Vui
							lòng F5 lại trang, xin cảm ơn!
						</p>
						<div className={`${cx('document-title')}`}>
							1. Căn cước công dân
						</div>
						<div className={`${cx('doucment-image-container')}`}>
							<RenderImageDocument
								nameFile="uploadCCCDFont"
								idFile="uploadCCCDFont"
								urlImage={userById?.uploadCCCDFont}
								onChange={handleChangeUploadCCCDFont}
								urlImagePending={uploadCCCDFont?.url}
							/>
							<RenderImageDocument
								nameFile="uploadCCCDBeside"
								idFile="uploadCCCDBeside"
								urlImage={userById?.uploadCCCDBeside}
								onChange={handleChangeUploadCCCDBeside}
								urlImagePending={uploadCCCDBeside?.url}
							/>
						</div>
					</div>
					<div className={`${cx('container-document')}`}>
						<div className={`${cx('document-title')}`}>
							2. Giấy phép lái xe
						</div>
						<div className={`${cx('doucment-image-container')}`}>
							<RenderImageDocument
								nameFile="uploadLicenseFont"
								idFile="uploadLicenseFont"
								urlImage={userById?.uploadLicenseFont}
								onChange={handleChangeUploadLicenseFont}
								urlImagePending={uploadLicenseFont?.url}
							/>
							<RenderImageDocument
								nameFile="uploadLicenseBeside"
								idFile="uploadLicenseBeside"
								urlImage={userById?.uploadLicenseBeside}
								onChange={handleChangeUploadLicenseBeside}
								urlImagePending={uploadLicenseBeside?.url}
							/>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default ProfilePage;
