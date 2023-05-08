'use client';
import React, { useEffect, useState } from 'react';
import {
	Breadcrumb,
	Divider,
	SnackbarCp,
	TotalAssetsAndFund,
	TotalItem,
} from '../../../../components';
import routers from '../../../../routers/routers';
import ServicesLinkItem from './home/servicesLinkItem';
import { useAppContext } from '../../../../helpers';
import { userGetAssetSV } from '../../../../services/user';
import requestRefreshToken from '../../../../helpers/axios/refreshToken';
import { actions } from '../../../../appState/';

function FundPage() {
	const { state, dispatch } = useAppContext();
	const { dataAssets, currentUser } = state.set;
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
	const totalFund =
		dataAssets?.contractsUSD + dataAssets?.contractsAGRICULTURE;
	return (
		<>
			<Breadcrumb pageName="Quỹ" description="Quỹ" />
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<div className="container mb-5">
				<div className="w-full">
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
								<div className="w-full flex flex-col lg:flex-row lg:flex-nowrap md:flex-nowrap md:flex-row justify-between ">
									<TotalItem
										title="Tổng quỹ"
										price={totalFund || 0}
										isShow={isShow}
									/>
									<TotalItem
										title="Quỹ đầu tư USD"
										price={dataAssets?.contractsUSD || 0}
										isShow={isShow}
									/>
									<TotalItem
										title="Quỹ phát triển nông nghiệp"
										price={
											dataAssets?.contractsAGRICULTURE ||
											0
										}
										isShow={isShow}
									/>
								</div>
							</TotalAssetsAndFund>
							<Divider />
						</>
					)}
					<h1 className="font-bold mb-3">Các dịch vụ</h1>
					<div className="flex flex-wrap">
						<ServicesLinkItem
							href={routers.fundInterestRateTable}
							nameIcon="bx bxs-bank text-xl"
							title="Quỹ tham khảo"
						/>
						<ServicesLinkItem
							href={routers.fundSend}
							nameIcon="bx bx-donate-heart"
							title="Gửi quỹ"
						/>
						<ServicesLinkItem
							href={routers.fundManager}
							nameIcon="fa-solid fa-users"
							title="Quản lý quỹ"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default FundPage;
