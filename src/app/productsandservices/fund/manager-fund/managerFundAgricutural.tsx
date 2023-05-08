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
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';
import { actions } from '../../../../../appState/';
import {
	formatVND,
	formatVNDCurrency,
} from '../../../../../helpers/format/FormatMoney';

const cx = className.bind(styles);

function ManagerFundAgricuturalPage({ data }: { data: any }) {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		dataManagerFundAgriculture,
		pagination: { page, show },
		searchValues: { manager_fund_agriculture },
	} = state.set;
	let showPage = 10;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	const [disbursement, setDisbursement] = useState([]);
	const [itemFundAgriculture, setItemFundAgriculture] = useState<any>(null);
	const [isModalDetailAgriculture, setIsModalDetailAgriculture] =
		useState(false);
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
	const handleModalDetailAgricultureTrue = (e: any) => {
		e.stopPropagation();
		setIsModalDetailAgriculture(true);
	};
	const handleModalDetailAgricultureFalse = (e: any) => {
		e.stopPropagation();
		setIsModalDetailAgriculture(false);
	};
	let dataManagerFundAgriFlag: any[] =
		data?.contractsAGRICULTURE?.sort((a: any, b: any) => b?.id - a?.id) ||
		[];
	if (manager_fund_agriculture) {
		dataManagerFundAgriFlag = dataManagerFundAgriFlag.filter((item) => {
			return (
				item?.id
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_agriculture?.toLowerCase()) ||
				item?.cycle
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_agriculture?.toLowerCase()) ||
				item?.status
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_agriculture?.toLowerCase()) ||
				item?.principal
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_agriculture?.toLowerCase()) ||
				item?.disbursement
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_agriculture?.toLowerCase()) ||
				moment(item?.date_start)
					.format('DD/MM/YYYY')
					?.toString()
					?.toLowerCase()
					.includes(manager_fund_agriculture?.toLowerCase())
			);
		});
	}
	useEffect(() => {
		dataManagerFundAgriFlag?.map((item) => {
			userGetDisbursementByIdContractSV({
				id_contract: item?.id,
				setSnackbar,
				setDisbursement,
			});
		});
	}, []);
	if (disbursement?.length <= dataManagerFundAgriFlag?.length) {
		dataManagerFundAgriFlag?.map((item) => {
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
	for (let i = 0; i < dataManagerFundAgriFlag?.length; i++) {
		for (let j = 0; j < uniqueDisbursement?.length; j++) {
			if (
				parseInt(dataManagerFundAgriFlag[i].id) ===
				parseInt(uniqueDisbursement[j].id)
			) {
				dataManagerFundAgriFlag[i].disbursement =
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
			setIsModalDetailAgriculture,
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
								setItemFundAgriculture(item);
								setIsModalDetailAgriculture(true);
							}}
						>
							<td>{indexTable(page, show, index)}</td>
							<td className="item-w200">
								{item?.id}/
								{dateFormat.dateFormat(item?.createdAt, 'YYYY')}
								/HDPTNN-
								{dateFormat.dateFormat(
									item?.date_start,
									'DD/MM/YYYY',
								)}
							</td>
							<td className="item-w100">{item?.cycle} mùa</td>
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
				className={cx('manager_fund_agriculture')}
				valueSearch={manager_fund_agriculture}
				nameSearch="manager_fund_agriculture"
				dataHeaders={DataManagerFundUsdHeader().headers}
				noActions
				noRefresh
				totalData={dataManagerFundAgriFlag?.length}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
				dataPagiCus={dataManagerFundAgriFlag?.filter((row, index) => {
					if (index + 1 >= start && index + 1 <= end) return true;
				})}
			>
				<RenderBodyTable
					data={dataManagerFundAgriFlag?.filter((row, index) => {
						if (index + 1 >= start && index + 1 <= end) return true;
					})}
				/>
			</General>
			{isModalDetailAgriculture && (
				<Modal
					openModal={handleModalDetailAgricultureTrue}
					closeModal={handleModalDetailAgricultureFalse}
					titleHeader="Chi tiết hợp đồng"
					actionButtonText="Hủy hợp đồng"
					classNameButton={`cancelbgcbold`}
					onClick={() =>
						handleCancelContract(itemFundAgriculture?.id)
					}
					isProcess={isProcessModal}
				>
					<CustomercareLine
						title="Mã HD:"
						textLink={`${itemFundAgriculture?.id}/${moment(
							itemFundAgriculture?.createdAt,
						).format('YYYY')}/HDPTNN`}
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
						textLink="QUỸ PHÁT TRIỂN NÔNG NGHIỆP"
						marginLeft={0}
						colorStatus={`warning`}
					/>
					<CustomercareLine
						title="Thời gian gửi:"
						textLink={moment(
							itemFundAgriculture?.date_start,
						).format('DD/MM/YYYY')}
						marginLeft={0}
					/>
					<CustomercareLine
						title="Kỳ hạn:"
						textLink={itemFundAgriculture?.cycle + ' mùa'}
						marginLeft={0}
					/>
					<CustomercareLine
						title="Vốn:"
						textLink={formatVND(itemFundAgriculture?.principal)}
						marginLeft={0}
						colorStatus={`info`}
					/>
					<CustomercareLine
						title="Giải ngân:"
						textLink={formatVNDCurrency(
							itemFundAgriculture?.disbursement,
						)}
						marginLeft={0}
						noneBorderBottom
						colorStatus={`success`}
					/>
				</Modal>
			)}
		</div>
	);
}

export default ManagerFundAgricuturalPage;
