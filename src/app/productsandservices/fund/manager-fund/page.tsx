'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import {
	Breadcrumb,
	Divider,
	TotalItem,
	TotalAssetsAndFund,
	SnackbarCp,
} from '../../../../../components';
import ManagerFundUSDPage from './managerFundUSD';
import ManagerFundAgricuturalPage from './managerFundAgricutural';
import { useAppContext } from '../../../../../helpers';
import {
	userGetAssetSV,
	userGetContractSV,
} from '../../../../../services/user';
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';
import { actions } from '../../../../../appState/';

const cx = classNames.bind(styles);
const LIST_TABS = [
	{
		id: 1,
		title: 'Quỹ đầu tư USD',
		component: ManagerFundUSDPage,
	},
	{
		id: 2,
		title: 'Quỹ phát triển nông nghiệp',
		component: ManagerFundAgricuturalPage,
	},
];
function ManagerFundPage() {
	const { state, dispatch } = useAppContext();
	const { currentUser, dataContracts, dataAssets } = state.set;
	const [isShow, setIsShow] = useState(false);
	const [idTab, setIdTab] = useState(1);
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
	const toogleIsShow = () => {
		setIsShow(!isShow);
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
	useEffect(() => {
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
	return (
		<>
			<Breadcrumb pageName="Quản lý quỹ" description="Quản lý quỹ" />
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
				<div className={`${cx('table_manager_container')}`}>
					<div className={`${cx('table_manager_list')}`}>
						{LIST_TABS.map((item, index) => (
							<div
								className={`${cx(
									'table_manager_item',
									idTab === item?.id ? 'active' : '',
								)}`}
								key={index}
								onClick={() => setIdTab(item?.id)}
							>
								<div
									className={`${cx(
										'table_manager_item_title',
									)}`}
								>
									{item.title}
								</div>
							</div>
						))}
					</div>
					<div className={`${cx('body_components')}`}>
						{LIST_TABS.map((item, index) => {
							if (item?.id === idTab) {
								const Component = item?.component;
								return (
									<Component
										key={index}
										data={dataContracts}
									/>
								);
							}
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default ManagerFundPage;
