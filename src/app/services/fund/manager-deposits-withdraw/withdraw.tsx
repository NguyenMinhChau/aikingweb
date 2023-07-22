/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import {
	CustomercareLine,
	FormInput,
	General,
	Modal,
	SnackbarCp,
} from '../../../../../components';
import { dateFormat, useAppContext } from '../../../../../helpers';
import DataWithdrawsHistory from '../../../../../helpers/fakeData/withdrawsHistoryHeader';
import { indexTable } from '../../../../../helpers/tableIndex';
import { formatVND } from '../../../../../helpers/format/FormatMoney';
import { Skeleton } from '@mui/material';
import moment from 'moment';
import { actions } from '../../../../../appState';
import {
	userCancelWithdrawSV,
	userGetWithdrawByUserSV,
	userResendOtpWithdrawSV,
	userVerifyWithdrawSV,
} from '../../../../../services/user';
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';
import { getAllPaymentsSV } from '../../../../../services/admin';

const cx = className.bind(styles);

function WithdrawsHistory() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		userById,
		otpCode,
		dataWithdrawsHistory,
		pagination: { page, show },
		searchValues: { withdraws_history },
	} = state.set;
	const [modalVerifyWithdraw, setModalVerifyWithdraw] = useState(false);
	const [isProcessCancelWithdraw, setIsProcessCancelWithdraw] =
		useState(false);
	const [itemWithdraw, setItemWithdraw] = useState<any>(null);
	const [isProcessModalWithdraw, setIsProcessModalWithdraw] = useState(false);
	const [isProcessResendOTP, setIsProcessResendOTP] = useState(false);
	const [dataPayments, setDataPayments] = useState<any>([]);
	let dataWithdrawsHistoryFlag: any =
		dataWithdrawsHistory.sort((a: any, b: any) => b.id - a.id) || [];
	if (withdraws_history) {
		dataWithdrawsHistoryFlag = dataWithdrawsHistoryFlag.filter(
			(item: any) => {
				return (
					item?.status
						?.toString()
						?.toLowerCase()
						.includes(withdraws_history?.toLowerCase()) ||
					moment(item?.createdAt)
						.format('DD/MM/YYYY HH:mm:ss')
						?.toString()
						?.toLowerCase()
						.includes(withdraws_history?.toLowerCase()) ||
					formatVND(item?.amount)
						?.toString()
						?.toLowerCase()
						.includes(withdraws_history?.toLowerCase()) ||
					item?.note
						?.toString()
						?.toLowerCase()
						.includes(withdraws_history?.toLowerCase()) ||
					formatVND(item?.amount)
						.replace(/\./g, '')
						?.toString()
						?.toLowerCase()
						.includes(withdraws_history?.toLowerCase())
				);
			},
		);
	}
	let showPage = 10;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
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
	const handleModalWithdrawTrue = (e: any, item: any) => {
		e.stopPropagation();
		setModalVerifyWithdraw(true);
		setItemWithdraw(item);
	};
	const handleModalWithdrawFalse = (e: any) => {
		e.stopPropagation();
		setModalVerifyWithdraw(false);
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
	function RenderBodyTable({ data }: { data: any }) {
		return (
			<>
				{data.map((item: any, index: number) => {
					const bankName = dataPayments?.filter(
						(x: any) => x?.id === item?.paymentId,
					)[0]?.bank_name;
					const accountName = dataPayments.filter(
						(x: any) => x?.id === item?.paymentId,
					)[0]?.account_name;
					const accountNumber = dataPayments.filter(
						(x: any) => x?.id === item?.paymentId,
					)[0]?.account_number;
					return (
						<tr
							key={index}
							onClick={
								item?.status === 'Pending'
									? (e) =>
											handleModalWithdrawTrue(e, {
												...item,
												bank_name: bankName,
												account_name: accountName,
												account_number: accountNumber,
											})
									: () => {}
							}
						>
							<td>{indexTable(page, show, index)}</td>
							<td className="item-w100">
								{formatVND(item?.amount || 0)}
							</td>
							<td className="item-w100">
								{moment(item?.createdAt).format(
									'DD/MM/YYYY HH:mm:ss',
								)}
							</td>
							<td className="item-w100">
								{accountName} - {bankName} - {accountNumber}
							</td>
							<td className="item-w150">
								{item?.note ? (
									item?.note
								) : (
									<Skeleton width={50} />
								)}
							</td>
							<td className="item-w100">
								<span
									className={`status ${
										colorStatus(item) + 'bgc'
									}`}
								>
									{item?.status}
								</span>
							</td>
						</tr>
					);
				})}
			</>
		);
	}
	const handleSendWithdrawsHistory = (dataToken: any) => {
		userGetWithdrawByUserSV({
			id_user: currentUser?.id,
			dispatch,
			setSnackbar,
			token: dataToken?.token,
		});
	};
	useEffect(() => {
		if (currentUser) {
			requestRefreshToken(
				currentUser,
				handleSendWithdrawsHistory,
				state,
				dispatch,
				actions,
				setSnackbar,
			);
		}
		getAllPaymentsSV({
			setSnackbar,
			setDataPayments,
		});
	}, []);
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
		<div>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<General
				className={cx('withdraws_history')}
				valueSearch={withdraws_history}
				nameSearch="withdraws_history"
				dataHeaders={DataWithdrawsHistory().headers}
				noActions
				noRefresh
				totalData={dataWithdrawsHistoryFlag?.length}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
				dataPagiCus={dataWithdrawsHistoryFlag?.filter(
					(row: number, index: number) => {
						if (index + 1 >= start && index + 1 <= end) return true;
					},
				)}
			>
				<RenderBodyTable
					data={dataWithdrawsHistoryFlag?.filter(
						(row: number, index: number) => {
							if (index + 1 >= start && index + 1 <= end)
								return true;
						},
					)}
				/>
			</General>
			{modalVerifyWithdraw && (
				<Modal
					openModal={(e: any) =>
						handleModalWithdrawTrue(e, itemWithdraw)
					}
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
						title="Trạng thái:"
						textLink={itemWithdraw?.status || 'Pending'}
						colorStatus={`status ${
							colorStatus(itemWithdraw || 'info') + 'bgc'
						}`}
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
						bankName={itemWithdraw?.bank_name}
						accountName={itemWithdraw?.account_name}
						accountNumber={itemWithdraw?.account_number}
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
						)} font-bold cancel inline-block cursor-pointer`}
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
		</div>
	);
}

export default WithdrawsHistory;
