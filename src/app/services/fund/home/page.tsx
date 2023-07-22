/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import {
	Breadcrumb,
	Divider,
	SliderFund,
	SnackbarCp,
	TotalAssetsAndFund,
	TotalItem,
} from '../../../../../components';
import ServicesLinkItem from './servicesLinkItem';
import routers from '../../../../../routers/routers';
import {
	DataFundAgricutural,
	DataFundUSD,
	useAppContext,
} from '../../../../../helpers';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { userGetAssetSV } from '../../../../../services/user';
import requestRefreshToken from '../../../../../helpers/axios/refreshToken';
import { actions } from '../../../../../appState/';
import { styled } from '@mui/material';

type ItemStylesContainerType = {
	theme?: any;
	cols?: any;
	spacing?: string;
};

const ItemStylesContainer = styled('div')(
	({ theme, cols, spacing }: ItemStylesContainerType) => ({
		display: 'flex',
		flexWrap: 'wrap',
		gap: '16px',
		width: '100%',
		height: '100%',
		margin: '20px 0',
		'& .item_content': {
			// mobile
			[theme.breakpoints.up('xs')]: {
				flex: `1 1 calc((100% / 1) - (${spacing} * 2))`,
			},
			// Tablet
			[theme.breakpoints.between('sm', 'md')]: {
				flex: `1 1 calc((100% / 2) - (${spacing} * 2))`,
			},
			// PC
			[theme.breakpoints.up('lg')]: {
				flex: `1 1 calc((100% / ${cols}) - (${spacing} * 2))`,
			},
			borderRadius: '8px',
			backgroundColor: '#fff',
			border: '1px solid #ccc',
			color: '#000',
			overflow: 'hidden',
			padding: '10px',
		},
	}),
);

const WebPage = () => {
	const { state, dispatch } = useAppContext();
	const { dataAssets, currentUser } = state.set;
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const [isShow, setIsShow] = useState(false);
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
	const development = () => {
		setSnackbar({
			open: true,
			type: 'info',
			message: 'Giao diện đang phát triển',
		});
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
			<Breadcrumb pageName="Quỹ tiết kiệm" description="Quỹ tiết kiệm" />
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				typeSnackbar={snackbar.type}
				messageSnackbar={snackbar.message}
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
										} info`}
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
					<div className="text-center text-[22px] font-bold text-primary uppercase">
						Vì sao bạn nên đầu tư tiết kiệm?
					</div>
					<ItemStylesContainer cols={4} spacing="8px">
						<div className="item_content flex items-center justify-start gap-2">
							<div className="text-[16px] w-full text-center font-medium leading-6">
								Lãi suất hấp dẫn
							</div>
						</div>
						<div className="item_content flex items-center justify-start gap-2">
							<div className="text-[16px] w-full text-center font-medium leading-6">
								Tích lũy an nhàn, sinh lợi đều đặn
							</div>
						</div>
						<div className="item_content flex items-center justify-start gap-2">
							<div className="text-[16px] w-full text-center font-medium leading-6">
								Hợp đồng uy tín
							</div>
						</div>
						<div className="item_content flex items-center justify-start gap-2">
							<div className="text-[16px] w-full text-center font-medium leading-6">
								Đội ngũ tư vấn tận tâm, hỗ trợ khách hàng mọi
								lúc mọi nơi
							</div>
						</div>
					</ItemStylesContainer>
					<h1 className="font-bold mb-3">Các dịch vụ</h1>
					<div className="flex flex-wrap">
						<ServicesLinkItem
							href={routers.fund}
							nameIcon="bx bxs-bank text-xl"
							title="Quỹ"
						/>
						<ServicesLinkItem
							// href={routers.home}
							nameIcon="bx bx-donate-heart"
							title="Đầu tư"
							onClick={development}
						/>
						<ServicesLinkItem
							// href={routers.home}
							nameIcon="fa-solid fa-users"
							title="Đối tác"
							onClick={development}
						/>
						<ServicesLinkItem
							href={routers.fundCustomerCare}
							nameIcon="bx bx-phone"
							title="CSKH"
						/>
					</div>
					<Divider />
					<h1 className="font-bold mb-3">Các gói đầu tư</h1>
					<div className="flex flex-wrap sm:flex-nowrap w-full">
						<div className="lg:w-1/2 w-full sm:w-1/2 h-60 rounded-lg overflow-hidden relative lg:ml-1 sm:ml-1 my-1">
							<Swiper
								slidesPerView={1}
								spaceBetween={0}
								centeredSlides={true}
								autoplay={{
									delay: 2500,
									disableOnInteraction: false,
								}}
								pagination={{
									clickable: true,
								}}
								modules={[Autoplay, Pagination]}
								className="mySwiper h-full"
							>
								{DataFundUSD.map((item, index) => (
									<SwiperSlide key={index}>
										<SliderFund item={item} />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
						<div className="lg:w-1/2 w-full sm:w-1/2 rounded-lg overflow-hidden relative h-60 lg:ml-1 sm:ml-1 my-1">
							<Swiper
								slidesPerView={1}
								spaceBetween={0}
								centeredSlides={true}
								autoplay={{
									delay: 2500,
									disableOnInteraction: false,
								}}
								pagination={{
									clickable: true,
								}}
								modules={[Autoplay, Pagination]}
								className="mySwiper h-full"
							>
								{DataFundAgricutural.map((item, index) => (
									<SwiperSlide key={index}>
										<SliderFund item={item} />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WebPage;
