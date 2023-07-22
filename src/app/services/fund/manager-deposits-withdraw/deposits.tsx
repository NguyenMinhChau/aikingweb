/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import {
	CustomercareLine,
	FileUploadSingle,
	General,
	Modal,
	SnackbarCp,
} from '../../../../../components';
import { useAppContext } from '../../../../../helpers';
import DataDepositsHistory from '../../../../../helpers/fakeData/depositsHistoryHeader';
import { indexTable } from '../../../../../helpers/tableIndex';
import { formatVND } from '../../../../../helpers/format/FormatMoney';
import moment from 'moment';
import { Skeleton } from '@mui/material';
import { actions } from '../../../../../appState/';
import {
	userGetDepositsByUserSV,
	userUploadBillsDepositsSV,
} from '../../../../../services/user';
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';
import Image from 'next/image';
import { getAllPaymentsSV } from '../../../../../services/admin';

const cx = className.bind(styles);

function DepositsHistory() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		file,
		dataDepositsHistory,
		searchValues: { deposits_history },
		pagination: { page, show },
	} = state.set;
	const [isProcessUploadDeposits, setIsProcessUploadDeposits] =
		useState(false);
	const [isModalUploadDeposits, setIsModalUploadDeposits] = useState(false);
	const [itemDeposits, setItemDeposits] = useState<any>(null);
	const [dataPayments, setDataPayments] = useState<any>([]);
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
	let showPage = 10;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	let dataDepositsHistoryFlag: any =
		dataDepositsHistory.sort((a: any, b: any) => b.id - a.id) || [];
	if (deposits_history) {
		dataDepositsHistoryFlag = dataDepositsHistoryFlag.filter(
			(item: any) => {
				return (
					item?.status
						?.toString()
						?.toLowerCase()
						.includes(deposits_history?.toLowerCase()) ||
					moment(item?.createdAt)
						.format('DD/MM/YYYY HH:mm:ss')
						?.toString()
						?.toLowerCase()
						.includes(deposits_history?.toLowerCase()) ||
					item?.note
						?.toString()
						?.toLowerCase()
						.includes(deposits_history?.toLowerCase()) ||
					formatVND(item?.amount)
						?.toString()
						?.toLowerCase()
						.includes(deposits_history?.toLowerCase()) ||
					formatVND(item?.amount)
						.replace(/\./g, '')
						?.toString()
						?.toLowerCase()
						.includes(deposits_history?.toLowerCase())
				);
			},
		);
	}
	const handleModalDepositsTrue = (e: any, item: any) => {
		e.stopPropagation();
		setIsModalUploadDeposits(true);
		setItemDeposits(item);
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
	function RenderBodyTable({ data }: { data: any }) {
		return (
			<>
				{data.map((item: any, index: number) => {
					const bankName = dataPayments?.filter(
						(x: any) => x?.id === item?.idPayment,
					)[0]?.bank_name;
					const accountName = dataPayments.filter(
						(x: any) => x?.id === item?.idPayment,
					)[0]?.account_name;
					const accountNumber = dataPayments.filter(
						(x: any) => x?.id === item?.idPayment,
					)[0]?.account_number;
					return (
						<tr
							key={index}
							onClick={
								item?.status !== 'Completed'
									? (e) =>
											handleModalDepositsTrue(e, {
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
								{formatVND(item?.amount)}
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
	const handleSendDepositsHistory = (dataToken: any) => {
		userGetDepositsByUserSV({
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
				handleSendDepositsHistory,
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
	const handleSendUpload = (dataToken: any) => {
		userUploadBillsDepositsSV({
			id_user: currentUser?.id,
			dispatch,
			id_deposits: itemDeposits?.id,
			image: file,
			token: dataToken?.token,
			setSnackbar,
			setIsProcessUploadDeposits,
			setIsModalUploadDeposits,
		});
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
		}
	};
	const urlImageFile = file.length > 0 && URL.createObjectURL(file[0]);
	return (
		<div>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<General
				className={cx('deposits_history')}
				valueSearch={deposits_history}
				nameSearch="deposits_history"
				dataHeaders={DataDepositsHistory().headers}
				noActions
				noRefresh
				totalData={dataDepositsHistoryFlag?.length}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
				dataPagiCus={dataDepositsHistoryFlag?.filter(
					(row: number, index: number) => {
						if (index + 1 >= start && index + 1 <= end) return true;
					},
				)}
			>
				<RenderBodyTable
					data={dataDepositsHistoryFlag?.filter(
						(row: number, index: number) => {
							if (index + 1 >= start && index + 1 <= end)
								return true;
						},
					)}
				/>
			</General>
			{isModalUploadDeposits && (
				<Modal
					openModal={(e: any) =>
						handleModalDepositsTrue(e, itemDeposits)
					}
					closeModal={handleModalDepositsFalse}
					titleHeader="Xem chi tiết hóa đơn"
					actionButtonText="Gửi"
					classNameButton={`infobgc`}
					isProcess={isProcessUploadDeposits}
					onClick={handleUploadBillDeposits}
				>
					<CustomercareLine
						nameIcon="fa-solid fa-rotate-right"
						colorIcon="success"
						title="Trạng thái:"
						textLink={itemDeposits?.status}
						colorStatus={`status ${
							colorStatus(itemDeposits) + 'bgc'
						}`}
					/>
					<CustomercareLine
						nameIcon="fa-regular fa-clock"
						colorIcon="info"
						title="Ngày nạp:"
						textLink={moment(itemDeposits?.createdAt).format(
							'DD/MM/YYYY HH:mm:ss',
						)}
					/>
					<CustomercareLine
						nameIcon="fa-solid fa-money-bill"
						colorIcon="warning"
						title="Số tiền nạp:"
						colorStatus="info"
						textLink={formatVND(itemDeposits?.amount || 0)}
					/>
					<CustomercareLine
						nameIcon="fa fa-bank"
						colorIcon="cancel"
						title="Ngân hàng thụ hưởng:"
						bankMethod
						bankName={itemDeposits?.bank_name}
						accountName={itemDeposits?.account_name}
						accountNumber={itemDeposits?.account_number}
					/>
					<CustomercareLine
						title="Hóa đơn:"
						link={`${process.env.NEXT_PUBLIC_URL_SERVER}${itemDeposits?.statement}`}
						textLink={itemDeposits?.statement?.replace(
							'/images',
							'',
						)}
					/>
					<FileUploadSingle label="Tải hình ảnh" />
					{(urlImageFile || itemDeposits?.statement) && (
						<div className={`${cx('view_image')}`}>
							<Image
								src={
									urlImageFile
										? urlImageFile
										: `${process.env.NEXT_PUBLIC_URL_SERVER}${itemDeposits?.statement}`
								}
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
	);
}

export default DepositsHistory;
