'use client';
import React, { useState } from 'react';
import {
	Breadcrumb,
	Button,
	Divider,
	FormInput,
	SelectDateCp,
	SelectValueCp,
} from '../../../../components';
import {
	moneyFormat,
	numberFormat,
	useAppContext,
} from '../../../../helpers';
import { setData } from '../../../../appState/reducer';
import className from 'classnames/bind';
import styles from './styles.module.css';
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
	const [showSelect, setShowSelect] = useState(false);
	const [isModalContract, setIsModalContract] = useState(false);
	const [disbursement, setDisbursement] = useState({ disbursement: 0 });
	const handleModalContractTrue = (e: any) => {
		e.stopPropagation();
		setIsModalContract(true);
	};
	const handleModalContractFalse = (e: any) => {
		e.stopPropagation();
		setIsModalContract(false);
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
			return item?.type === process.env.REACT_APP_TYPE_USD
				? 'Tháng'
				: item?.type === process.env.REACT_APP_TYPE_AGRICUTURAL
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
					item?.type === process.env.REACT_APP_TYPE_AGRICUTURAL
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
	return (
		<>
			<Breadcrumb pageName="Gửi quỹ" description="Gửi quỹ" />
			<div className="container">
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
								disbursement?.disbursement || 0,
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
							// onClick={handleContinue}
							// isProcess={isProcessSendFund}
							// disabled={
							// 	isProcessSendFund ||
							// 	!disbursement?.disbursement
							// }
						>
							Tiếp tục
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default SendFundPage;
