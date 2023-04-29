'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import {
	Breadcrumb,
	Divider,
	SliderFund,
	SnackbarCp,
} from '../../../../components';
import ServicesLinkItem from './servicesLinkItem';
import routers from '../../../../routers/routers';
import { DataFundAgricutural, DataFundUSD } from '../../../../helpers';
import 'swiper/css';
import { useState } from 'react';

const WebPage = () => {
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
	const development = () => {
		setSnackbar({
			open: true,
			type: 'info',
			message: 'Giao diện đang phát triển',
		});
	};
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
