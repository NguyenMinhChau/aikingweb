'use client';
import { useState, useEffect } from 'react';
import {
	Breadcrumb,
	Button,
	CustomercareLine,
	Divider,
	FileUploadSingle,
	FormInput,
	Modal,
	SelectValueCp,
	SnackbarCp,
} from '../../../../../components';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { useAppContext } from '../../../../../helpers';
import { actions } from '../../../../../appState/';
import { autoFormatNumberInputChange } from '../../../../../helpers/format/NumberFormat';
import Link from 'next/link';
import routers from '../../../../../routers/routers';
import { getAllPaymentAdminsSV } from '../../../../../services/admin';
import {
	userCreateDepositsSV,
	userUploadBillsDepositsSV,
} from '../../../../../services/user';
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';
import moment from 'moment';
import { formatVND } from '../../../../../helpers/format/FormatMoney';
import Image from 'next/image';

const cx = className.bind(styles);

const DepositsPage = () => {
	const { state, dispatch } = useAppContext();
	const { bankDeposits, amountDeposits, currentUser, file } = state.set;
	const [showSelect, setShowSelect] = useState(false);
	const [isProcessModalDeposits, setIsProcessModalDeposits] = useState(false);
	const [isModalUploadDeposits, setIsModalUploadDeposits] = useState(false);
	const [isProcessUploadDeposits, setIsProcessUploadDeposits] =
		useState(false);
	const [dataReturn, setDataReturn] = useState<any>(null);
	const [itemBank, setItemBank] = useState<any>(null);
	const [bankAdmins, setBankAdmins] = useState<any>([]);
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
	const handleModalDepositsTrue = (e: any) => {
		e.stopPropagation();
		setIsModalUploadDeposits(true);
	};
	const handleModalDepositsFalse = (e: any) => {
		e.stopPropagation();
		setIsModalUploadDeposits(false);
		dispatch(
			actions.setData({
				file: [],
				amountDeposits: '',
				bankDeposits: '',
			}),
		);
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
		if (!isModalUploadDeposits) {
			dispatch(
				actions.setData({
					bankDeposits: '',
					amountDeposits: '',
				}),
			);
		}
		getAllPaymentAdminsSV({
			setSnackbar,
			setBankAdmins,
		});
	}, []);
	const handleSenDeposits = (dataToken: any) => {
		userCreateDepositsSV({
			id_user: currentUser?.id,
			email_user: currentUser?.email,
			idPayment: bankDeposits?.id,
			amountVND: amountDeposits.replace(/\./g, ''),
			token: dataToken?.token,
			setIsProcessModalDeposits,
			setIsModalUploadDeposits,
			setSnackbar,
			setDataReturn,
			setItemBank,
		});
	};
	const handleSendUpload = (dataToken: any) => {
		userUploadBillsDepositsSV({
			id_user: currentUser?.id,
			dispatch,
			id_deposits: dataReturn?.id,
			image: file,
			token: dataToken?.token,
			setSnackbar,
			setIsProcessUploadDeposits,
			setIsModalUploadDeposits,
		});
	};
	const handleSubmit = async () => {
		if (currentUser) {
			if (!amountDeposits || !bankDeposits) {
				setSnackbar({
					open: true,
					type: 'error',
					message: 'Bạn chưa nhập đủ thông tin',
				});
			} else {
				setIsProcessModalDeposits(true);
				requestRefreshToken(
					currentUser,
					handleSenDeposits,
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
	const handleUploadBillDeposits = async () => {
		if (file.length === 0) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn chưa chọn file',
			});
		} else {
			setIsProcessUploadDeposits(true);
			setTimeout(() => {
				requestRefreshToken(
					currentUser,
					handleSendUpload,
					state,
					dispatch,
					actions,
					setSnackbar,
				);
				dispatch(
					actions.setData({
						amountDeposits: '',
						bankDeposits: '',
						file: [],
					}),
				);
			}, 3000);
		}
	};
	const urlImageFile = file.length > 0 && URL.createObjectURL(file[0]);
	return (
		<>
			<Breadcrumb pageName="Nạp tiền" description="Nạp tiền" />
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<div className="container">
				<h1 className="font-bold mb-3 text-center uppercase">
					Thông tin nạp tiền
				</h1>
				<Divider />
				<div className="flex justify-center items-center flex-col w-full">
					<div className="lg:w-1/2 sm:w-1/2 w-full">
						<SelectValueCp
							label="Tên ngân hàng thụ hưởng"
							value={bankDeposits?.bank_name}
							placeholder="---"
							data={bankAdmins}
							nameSet="bankDeposits"
							stateSelect={showSelect}
							setStateSelect={setShowSelect}
						/>
						<FormInput
							label="Số tiền nạp"
							placeholder="---"
							value={amountDeposits}
							name="amountDeposits"
							onChange={(e) => {
								dispatch(
									actions.setData({
										amountDeposits:
											autoFormatNumberInputChange(
												e.target.value,
											),
									}),
								);
							}}
							unit={amountDeposits && 'VND'}
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
							)} successbgcbold mb-3 w-full mt-1`}
							onClick={handleSubmit}
							isProcess={isProcessModalDeposits}
							disabled={isProcessModalDeposits}
						>
							Tiếp tục
						</Button>
					</div>
				</div>
				{isModalUploadDeposits && (
					<Modal
						openModal={handleModalDepositsTrue}
						closeModal={handleModalDepositsFalse}
						titleHeader="Tải hóa đơn nạp tiền"
						actionButtonText="Gửi"
						classNameButton={`infobgc`}
						isProcess={isProcessUploadDeposits}
						onClick={handleUploadBillDeposits}
					>
						<CustomercareLine
							nameIcon="fa-solid fa-rotate-right"
							colorIcon="success"
							title="Trạng thái:"
							colorStatus={`status ${
								colorStatus(dataReturn) + 'bgc'
							}`}
							textLink={dataReturn?.status}
						/>
						<CustomercareLine
							nameIcon="fa-regular fa-clock"
							colorIcon="info"
							title="Ngày rút:"
							textLink={moment(dataReturn?.createdAt).format(
								'DD/MM/YYYY HH:mm:ss',
							)}
						/>
						<CustomercareLine
							nameIcon="fa-solid fa-money-bill"
							colorIcon="warning"
							title="Số tiền rút:"
							colorStatus="info"
							textLink={formatVND(dataReturn?.amount || 0)}
						/>
						<CustomercareLine
							nameIcon="fa fa-bank"
							colorIcon="cancel"
							title="Ngân hàng thụ hưởng:"
							bankMethod
							bankName={itemBank?.bank_name}
							accountName={itemBank?.account_name}
							accountNumber={itemBank?.account_number}
						/>
						<FileUploadSingle label="Tải hình ảnh" />
						{urlImageFile && (
							<div className={`${cx('view_image')}`}>
								<Image
									src={urlImageFile}
									alt="image_upload"
									width={100}
									height={100}
									className={`${cx('image')}`}
								/>
							</div>
						)}
					</Modal>
				)}
			</div>
		</>
	);
};

export default DepositsPage;
