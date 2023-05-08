'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Breadcrumb,
	Button,
	Divider,
	FormInput,
	Modal,
	SelectDateCp,
	SelectValueCp,
	TotalItem,
	TotalAssetsAndFund,
	SnackbarCp,
	CustomercareLine,
} from '../../../../../components';
import {
	moneyFormat,
	numberFormat,
	useAppContext,
	useDebounce,
} from '../../../../../helpers';
import { setData } from '../../../../../appState/reducer';
import className from 'classnames/bind';
import styles from './styles.module.css';
import {
	userAddContractSV,
	userGetAssetSV,
	userGetContractSV,
	userGetTotalMoneySV,
} from '../../../../../services/user';
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';
import { actions } from '../../../../../appState/';
import {
	formatVND,
	formatVNDCurrency,
} from '../../../../../helpers/format/FormatMoney';
import moment from 'moment';
const cx = className.bind(styles);
const DATA_INVESTMENT = [
	{
		id: 1,
		name: 'Quỹ đầu tư USD',
	},
	{
		id: 2,
		name: 'Quỹ phát triển nông nghiệp',
	},
];

function SendFundPage() {
	const { state, dispatch } = useAppContext();
	const {
		item,
		dataAssets,
		sendingTime,
		period,
		deposits,
		investmentFund,
		currentUser,
		dataContracts,
	} = state.set;
	const [isShow, setIsShow] = useState(false);
	const [showSelect, setShowSelect] = useState(false);
	const [isModalContract, setIsModalContract] = useState(false);
	const [isModalSubmit, setIsModalSubmit] = useState(false);
	const [isProcessSubmit, setIsProcessSubmit] = useState(false);
	const [isProcessSendFund, setIsProcessSendFund] = useState(false);
	const [disbursement, setDisbursement] = useState(0);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const router = useRouter();
	const handleCloseSnackbar = (event: any, reason: any) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const handleModalContractTrue = (e: any) => {
		e.stopPropagation();
		setIsModalContract(true);
	};
	const handleModalContractFalse = (e: any) => {
		e.stopPropagation();
		setIsModalContract(false);
	};
	const handleModalSubmitTrue = (e: any) => {
		e.stopPropagation();
		setIsModalSubmit(true);
	};
	const handleModalSubmitFalse = (e: any) => {
		e.stopPropagation();
		setIsModalSubmit(false);
	};
	const toogleIsShow = () => {
		setIsShow(!isShow);
	};
	const valueSelectTypeFund = investmentFund?.name
		? investmentFund?.name
		: item?.type === process.env.NEXT_PUBLIC_TYPE_USD
		? 'Quỹ đầu tư USD'
		: item?.type === process.env.NEXT_PUBLIC_TYPE_AGRICUTURAL
		? 'Quỹ phát triển nông nghiệp'
		: '';
	const periodFund = () => {
		if (period) {
			return period;
		} else {
			return item?.period?.toString();
		}
	};
	const unitFund = () => {
		if (investmentFund) {
			return investmentFund?.id === 1
				? 'Tháng'
				: investmentFund?.id === 2
				? 'Mùa'
				: '';
		} else {
			return item?.type === process.env.NEXT_PUBLIC_TYPE_USD
				? 'Tháng'
				: item?.type === process.env.NEXT_PUBLIC_TYPE_AGRICUTURAL
				? 'Mùa'
				: '';
		}
	};
	const depositsFund = () => {
		if (investmentFund) {
			return '---';
		} else if (item?.capital) {
			return (
				`Bạn chọn gói ${
					item?.type === process.env.NEXT_PUBLIC_TYPE_AGRICUTURAL
						? 'hạn mức '
						: ''
				}` +
				item?.capital?.toString()?.replace('M', '') +
				' triệu đồng'
			);
		} else {
			return '---';
		}
	};
	const codeHD = () => {
		if (investmentFund) {
			return investmentFund?.id === 1 ? 'HDQDTUSD' : 'HDQPTNN';
		} else {
			return item?.type === process.env.NEXT_PUBLIC_TYPE_USD
				? 'HDQDTUSD'
				: 'HDQPTNN';
		}
	};
	const packageHD = () => {
		if (investmentFund) {
			return investmentFund?.id === 1
				? 'QUỸ ĐẦU TƯ USD'
				: 'QUỸ PHÁT TRIỂN NÔNG NGHIỆP';
		} else {
			return item?.type === process.env.NEXT_PUBLIC_TYPE_USD
				? 'QUỸ ĐẦU TƯ USD'
				: 'QUỸ PHÁT TRIỂN NÔNG NGHIỆP';
		}
	};
	const useDebouncePeriod = useDebounce(period, 3000);
	const useDebounceDeposits = useDebounce(deposits, 3000);
	const handleTypeContract = () => {
		if (investmentFund) {
			return investmentFund?.id === 1 ? 'USD' : 'AGRICULTURE';
		} else {
			return item?.type === process.env.NEXT_PUBLIC_TYPE_USD
				? 'USD'
				: 'AGRICULTURE';
		}
	};
	const handleSendAssets = (dataToken: any) => {
		userGetAssetSV({
			id_user: currentUser?.id,
			token: dataToken?.token,
			dispatch,
			setSnackbar,
		});
	};
	const handleSendContract = (dataToken: any) => {
		userGetContractSV({
			id_user: currentUser?.id,
			setSnackbar,
			dispatch,
			token: dataToken?.token,
		});
	};
	const handleGetMoneySV = (dataToken: any) => {
		userGetTotalMoneySV({
			setSnackbar,
			typeContract: handleTypeContract(),
			cycleContract: parseInt(useDebouncePeriod || item?.period),
			principalContract: useDebounceDeposits.replace(/\./g, ''),
			setDisbursement,
			token: dataToken?.token,
		});
	};
	const handleSendFund = (dataToken: any) => {
		userAddContractSV({
			id_user: currentUser?.id,
			cycle: period,
			principal: deposits.replace(/\./g, ''),
			type:
				investmentFund?.id === 1
					? 'USD'
					: investmentFund?.id === 2
					? 'AGRICULTURE'
					: '',
			timeSend: moment(sendingTime).format('YYYY-MM-DD HH:mm:ss'),
			setSnackbar,
			dispatch,
			setIsModalSubmit,
			setIsProcessSubmit,
			token: dataToken?.token,
			router,
		});
	};
	const handleContinue = async () => {
		if (currentUser) {
			if (
				(!period && !item?.period) ||
				!deposits ||
				(!investmentFund && !item?.type)
			) {
				setSnackbar({
					open: true,
					type: 'error',
					message: 'Vui lòng nhập đầy đủ thông tin',
				});
			} else if (moment(sendingTime).isBefore(new Date())) {
				setSnackbar({
					open: true,
					type: 'error',
					message: 'Thời gian gửi không hợp lệ',
				});
			} else if (
				(investmentFund?.id === 2 ||
					item?.type === process.env.NEXT_PUBLIC_TYPE_AGRICUTURAL) &&
				parseInt(period || item?.period) === 1
			) {
				setSnackbar({
					open: true,
					type: 'error',
					message:
						'Quỹ phát triển nông nghiệp phải gửi từ 2 mùa trở lên.',
				});
			} else if (!disbursement) {
				setSnackbar({
					open: true,
					type: 'error',
					message: 'Vui lòng chờ tính toán tổng giải ngân.',
				});
			} else {
				setIsModalSubmit(true);
			}
		} else {
			setSnackbar({
				open: true,
				type: 'error',
				message:
					'Vui lòng đăng nhập hoặc đăng kí để sử dụng tính năng này!',
			});
		}
	};
	const handleSubmit = async () => {
		setIsProcessSubmit(true);
		requestRefreshToken(
			currentUser,
			handleSendFund,
			state,
			dispatch,
			actions,
			setSnackbar,
		);
	};
	useEffect(() => {
		setDisbursement(0);
		if (
			(investmentFund || item?.type) &&
			(useDebouncePeriod || item?.period) &&
			useDebounceDeposits
		) {
			requestRefreshToken(
				currentUser,
				handleGetMoneySV,
				state,
				dispatch,
				actions,
				setSnackbar,
			);
		}
	}, [
		investmentFund || item?.type,
		useDebouncePeriod || item?.period,
		useDebounceDeposits,
	]);
	useEffect(() => {
		dispatch(
			actions.setData({
				deposits: '',
				sendingTime: new Date(),
				investmentFund: '',
				period: '',
			}),
		);
		requestRefreshToken(
			currentUser,
			handleSendContract,
			state,
			dispatch,
			actions,
			setSnackbar,
		);
		requestRefreshToken(
			currentUser,
			handleSendAssets,
			state,
			dispatch,
			actions,
			setSnackbar,
		);
	}, []);
	const totalAssets = dataAssets?.fundWallet + 0 + dataAssets?.surplus;
	const DATA_MERGE =
		dataContracts &&
		dataContracts?.contractsUSD &&
		dataContracts?.contractsAGRICULTURE &&
		[
			...dataContracts.contractsUSD,
			...dataContracts.contractsAGRICULTURE,
		]?.sort((a, b) => {
			return a?.id - b?.id;
		});
	const ID_FINAL = DATA_MERGE && DATA_MERGE[DATA_MERGE.length - 1]?.id;
	return (
		<>
			<Breadcrumb pageName="Gửi quỹ" description="Gửi quỹ" />
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<div className="container">
				{currentUser && (
					<>
						<h1 className="font-bold mb-3">
							Tài sản{' '}
							<span onClick={toogleIsShow}>
								<i
									className={`fa ${
										isShow ? 'fa-eye' : 'fa-eye-slash'
									} cancel`}
								></i>
							</span>
						</h1>
						<TotalAssetsAndFund>
							<TotalItem
								title="Tổng tài sản"
								price={totalAssets}
								isShow={isShow}
							/>
							<TotalItem
								title="Ví quỹ"
								price={dataAssets?.fundWallet || 0}
								isShow={isShow}
							/>
							<TotalItem
								title="Ví đầu tư"
								price={0}
								isShow={isShow}
							/>
							<TotalItem
								title="Số dư"
								price={dataAssets?.surplus || 0}
								isShow={isShow}
							/>
						</TotalAssetsAndFund>
						<Divider />
					</>
				)}
				<h1 className="font-bold mb-3 text-center uppercase">
					Thông tin gửi quỹ
				</h1>
				<Divider />
				<div className="flex justify-center items-center flex-col w-full">
					<div className="lg:w-1/2 sm:w-1/2 w-full">
						<SelectValueCp
							label="Chọn quỹ đầu tư"
							value={valueSelectTypeFund}
							placeholder="---"
							data={DATA_INVESTMENT}
							nameSet="investmentFund"
							stateSelect={showSelect}
							setStateSelect={setShowSelect}
						/>
						<SelectDateCp
							label="Thời gian gửi"
							value={sendingTime}
							nameSet="sendingTime"
						/>
						<FormInput
							label="Kỳ hạn"
							placeholder="---"
							value={periodFund()}
							name="period"
							onChange={(e: any) => {
								if (item?.period) {
									item.period = '';
								}
								dispatch(setData({ period: e.target.value }));
							}}
							classNameField={`mt8`}
							unit={unitFund()}
						/>
						<FormInput
							label="Số tiền gửi"
							placeholder={depositsFund()}
							type="text"
							value={deposits}
							name="deposits"
							onChange={(e) => {
								dispatch(
									setData({
										deposits:
											numberFormat.autoFormatNumberInputChange(
												e.target.value,
											),
									}),
								);
							}}
							unit={deposits && 'VND'}
						/>
						<FormInput
							label="Tổng tiền giải ngân"
							value={moneyFormat.formatVNDCurrency(
								disbursement || 0,
							)}
							readOnly
						/>
						<div
							className="text-primary cursor-pointer font-bold underline inline-block"
							onClick={handleModalContractTrue}
						>
							*Các quy định về hợp đồng
						</div>
						<Button
							className={`${cx('btn_submit')}`}
							onClick={handleContinue}
							isProcess={isProcessSendFund}
							disabled={isProcessSendFund || !disbursement}
						>
							Tiếp tục
						</Button>
					</div>
				</div>
			</div>
			{isModalContract && (
				<Modal
					openModal={handleModalContractTrue}
					closeModal={handleModalContractFalse}
					titleHeader="Quy định về hợp đồng"
					hideButton={true}
				>
					<div className={`${cx('contract_container')}`}>
						<div className={`${cx('text_contract_desc')} info`}>
							Đang cập nhật...
						</div>
					</div>
				</Modal>
			)}
			{isModalSubmit && (
				<Modal
					openModal={handleModalSubmitTrue}
					closeModal={handleModalSubmitFalse}
					titleHeader="Xác nhận hợp đồng"
					actionButtonText="Xác nhận"
					classNameButton={`infobgcbold`}
					onClick={handleSubmit}
					isProcess={isProcessSubmit}
				>
					<CustomercareLine
						title="Mã HD:"
						textLink={`${
							ID_FINAL ? ID_FINAL + 1 : 1
						}/${new Date().getFullYear()}/${codeHD()}`}
						marginLeft={0}
						colorStatus="status infobgc"
					/>
					<CustomercareLine
						title="Tên:"
						textLink={currentUser?.username}
						marginLeft={0}
					/>
					<CustomercareLine
						title="Gói:"
						textLink={packageHD()}
						marginLeft={0}
						colorStatus="warning"
					/>
					<CustomercareLine
						title="Thời gian gửi:"
						textLink={moment(sendingTime).format('DD/MM/YYYY')}
						marginLeft={0}
					/>
					<CustomercareLine
						title="Kỳ hạn:"
						textLink={`${period || item?.period} ${unitFund()}`}
						marginLeft={0}
					/>
					<CustomercareLine
						title="Vốn:"
						textLink={formatVND(deposits || 0)}
						marginLeft={0}
						colorStatus="cancel"
					/>
					<CustomercareLine
						title="Giải ngân:"
						textLink={formatVNDCurrency(disbursement || 0)}
						marginLeft={0}
						colorStatus="info"
						noneBorderBottom
					/>
				</Modal>
			)}
		</>
	);
}

export default SendFundPage;
