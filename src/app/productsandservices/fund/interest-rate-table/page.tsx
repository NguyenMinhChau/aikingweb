/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import InterestRateUSD from './usd';
import InterestRateAgricutural from './agricutural';
import styles from './styles.module.css';
import {
	Breadcrumb,
	Divider,
	SnackbarCp,
	TotalAssetsAndFund,
	TotalItem,
} from '../../../../../components';
import { useAppContext } from '../../../../../helpers';
import { userGetAssetSV } from '../../../../../services/user';
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';
import { actions } from '../../../../../appState/';
const LIST_TABS = [
	{
		id: 1,
		title: 'Quỹ đầu tư USD',
		component: InterestRateUSD,
	},
	{
		id: 2,
		title: 'Quỹ phát triển nông nghiệp',
		component: InterestRateAgricutural,
	},
];
function InterestRateTablePage() {
	const { state, dispatch } = useAppContext();
	const { dataAssets, currentUser } = state.set;
	const [idTab, setIdTab] = useState(1);
	const [isShow, setIsShow] = useState(false);
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
	useEffect(() => {
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
			<Breadcrumb pageName="Quỹ tham khảo" description="Quỹ tham khảo" />
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
				<div className={`${styles.table_interest_container}`}>
					<div className={`${styles.table_interest_list}`}>
						{LIST_TABS.map((item, index) => (
							<div
								className={`${styles.table_interest_item} ${
									idTab === item?.id ? styles.active : ''
								}`}
								key={index}
								onClick={() => setIdTab(item?.id)}
							>
								<div
									className={`${styles.table_interest_item_title}`}
								>
									{item.title}
								</div>
							</div>
						))}
					</div>
					<div className={`${styles.body_components}`}>
						{LIST_TABS.map((item, index) => {
							if (item?.id === idTab) {
								const Component = item?.component;
								return <Component key={index} />;
							}
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default InterestRateTablePage;
