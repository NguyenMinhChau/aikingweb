/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import {
	CustomercareLine,
	General,
	Modal,
	SnackbarCp,
} from '../../../../../components';
import { dateFormat, moneyFormat, useAppContext } from '../../../../../helpers';
import DataManagerFundUsdHeader from '../../../../../helpers/fakeData/dataManagerFundUsdHeader';
import { indexTable } from '../../../../../helpers/tableIndex';
import moment from 'moment';
import {
	userCancelContractSV,
	userGetDisbursementByIdContractSV,
} from '../../../../../services/user';
import {
	formatVND,
	formatVNDCurrency,
} from '../../../../../helpers/format/FormatMoney';
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';
import { actions } from '../../../../../appState/';

const cx = className.bind(styles);

function ManagerFundUSDPage({ data }: { data: any }) {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		dataManagerFundUSD,
		pagination: { page, show },
		searchValues: { manager_fund_usd },
	} = state.set;
	let showPage = 10;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	const [disbursement, setDisbursement] = useState([]);
	const [itemFund, setItemFund] = useState<any>(null);
	const [isModalDetail, setIsModalDetail] = useState(false);
	const [isProcessModal, setIsProcessModal] = useState(false);
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
	const handleModalDetailTrue = (e: any) => {
		e.stopPropagation();
		setIsModalDetail(true);
	};
	const handleModalDetailFalse = (e: any) => {
		e.stopPropagation();
		setIsModalDetail(false);
	};
	let dataManagerFundUSDFlag: any[] =
		data?.contractsUSD?.sort((a: any, b: any) => b?.id - a?.id) || [];
	if (manager_fund_usd) {
		dataManagerFundUSDFlag = dataManagerFundUSDFlag.filter((item) => {
			return (
				item?.id
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_usd?.toLowerCase()) ||
				item?.cycle
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_usd?.toLowerCase()) ||
				item?.status
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_usd?.toLowerCase()) ||
				item?.principal
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_usd?.toLowerCase()) ||
				item?.disbursement
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_usd?.toLowerCase()) ||
				moment(item?.date_start)
					.format('DD/MM/YYYY')
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_usd?.toLowerCase())
			);
		});
	}
	useEffect(() => {
		dataManagerFundUSDFlag?.map((item) => {
			userGetDisbursementByIdContractSV({
				id_contract: item?.id,
				setSnackbar,
				setDisbursement,
			});
		});
	}, []);
	if (disbursement?.length <= dataManagerFundUSDFlag?.length) {
		dataManagerFundUSDFlag?.map((item) => {
			userGetDisbursementByIdContractSV({
				id_contract: item?.id,
				setSnackbar,
				setDisbursement,
			});
		});
	}
	const uniqueDisbursement: any[] = disbursement.filter(
		(v: any, i, a) => a.findIndex((t: any) => t?.id === v?.id) === i,
	);
	for (let i = 0; i < dataManagerFundUSDFlag?.length; i++) {
		for (let j = 0; j < uniqueDisbursement?.length; j++) {
			if (
				parseInt(dataManagerFundUSDFlag[i].id) ===
				parseInt(uniqueDisbursement[j].id)
			) {
				dataManagerFundUSDFlag[i].disbursement =
					uniqueDisbursement[j].total;
			}
		}
	}
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
	const handleCancelContractSV = (dataToken: any, id: number) => {
		userCancelContractSV({
			id_contract: id,
			id_user: currentUser?.id,
			setSnackbar,
			token: dataToken?.token,
			setIsProcessModal,
			setIsModalDetail,
			dispatch,
		});
	};
	const handleCancelContract = async (id: number) => {
		setIsProcessModal(true);
		requestRefreshToken(
			currentUser,
			handleCancelContractSV,
			state,
			dispatch,
			actions,
			setSnackbar,
			id,
		);
	};
	function RenderBodyTable({ data }: { data: any }) {
		return (
			<>
				{data.map((item: any, index: number) => {
					return (
						<tr
							key={index}
							onClick={() => {
								setItemFund(item);
								setIsModalDetail(true);
							}}
						>
							<td>{indexTable(page, show, index)}</td>
							<td className="item-w200">
								{item?.id}/
								{dateFormat.dateFormat(item?.createdAt, 'YYYY')}
								/HDQDTUSD-
								{dateFormat.dateFormat(
									item?.date_start,
									'DD/MM/YYYY',
								)}
							</td>
							<td className="item-w100">{item?.cycle} tháng</td>
							<td className="item-w100">
								{moneyFormat.formatVND(item?.principal)}
							</td>
							<td className="item-w150">
								{item?.disbursement
									? moneyFormat.formatVNDCurrency(
											item?.disbursement,
									  )
									: 'Đang tải'}
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
	return (
		<div>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<General
				className={cx('manager_fund_usd')}
				valueSearch={manager_fund_usd}
				nameSearch="manager_fund_usd"
				dataHeaders={DataManagerFundUsdHeader().headers}
				noActions
				noRefresh
				totalData={dataManagerFundUSDFlag?.length}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
				dataPagiCus={dataManagerFundUSDFlag?.filter((row, index) => {
					if (index + 1 >= start && index + 1 <= end) return true;
				})}
			>
				<RenderBodyTable
					data={dataManagerFundUSDFlag?.filter((row, index) => {
						if (index + 1 >= start && index + 1 <= end) return true;
					})}
				/>
			</General>
			{isModalDetail && (
				<Modal
					openModal={handleModalDetailTrue}
					closeModal={handleModalDetailFalse}
					titleHeader="Chi tiết hợp đồng"
					actionButtonText="Hủy hợp đồng"
					classNameButton={`cancelbgcbold`}
					onClick={() => handleCancelContract(itemFund?.id)}
					isProcess={isProcessModal}
				>
					<CustomercareLine
						title="Mã HD:"
						textLink={`${itemFund?.id}/${moment(
							itemFund?.createdAt,
						).format('YYYY')}/HDQDTUSD`}
						marginLeft={0}
						colorStatus={`status cancelbgcbold`}
					/>
					<CustomercareLine
						title="Tên:"
						textLink={currentUser?.username}
						marginLeft={0}
					/>
					<CustomercareLine
						title="Gói:"
						textLink="QUỸ ĐẦU TƯ USD"
						marginLeft={0}
						colorStatus={`warning`}
					/>
					<CustomercareLine
						title="Thời gian gửi:"
						textLink={moment(itemFund?.date_start).format(
							'DD/MM/YYYY',
						)}
						marginLeft={0}
					/>
					<CustomercareLine
						title="Kỳ hạn:"
						textLink={itemFund?.cycle + ' tháng'}
						marginLeft={0}
					/>
					<CustomercareLine
						title="Vốn:"
						textLink={formatVND(itemFund?.principal)}
						marginLeft={0}
						colorStatus={`info`}
					/>
					<CustomercareLine
						title="Giải ngân:"
						textLink={formatVNDCurrency(itemFund?.disbursement)}
						marginLeft={0}
						noneBorderBottom
						colorStatus={`success`}
					/>
				</Modal>
			)}
		</div>
	);
}

export default ManagerFundUSDPage;
