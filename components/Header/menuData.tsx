import routers from '../../routers/routers';
import { Menu } from '../../types/menu';

const menuData: Menu[] = [
	{
		id: 1,
		title: 'Về chúng tôi',
		newTab: false,
		path: routers.aboutus,
	},
	// {
	// 	id: 2,
	// 	title: 'Đào tạo',
	// 	path: routers.training,
	// 	newTab: false,
	// },
	{
		id: 2,
		title: 'Sản phẩm & Dịch vụ',
		newTab: false,
		submenu: [
			{
				id: 21,
				title: 'Dịch vụ tư vấn đầu tư',
				path: routers.servicesInvestment,
				newTab: false,
			},
			{
				id: 22,
				title: 'Ủy thác đầu tư vàng',
				path: routers.investmentGold,
				newTab: false,
			},

			{
				id: 23,
				title: 'Quỹ tiết kiệm',
				newTab: false,
				submenu: [
					{
						id: 231,
						title: 'Trang chủ',
						path: routers.fundHome,
						newTab: false,
					},
					{
						id: 232,
						title: 'Nạp tiền',
						path: routers.fundDeposits,
						newTab: false,
					},
					{
						id: 233,
						title: 'Rút tiền',
						path: routers.fundWithdraw,
						newTab: false,
					},
					{
						id: 234,
						title: 'Giao dịch',
						path: routers.fundTransaction,
						newTab: false,
					},
					{
						id: 235,
						title: 'Tài khoản',
						path: routers.fundProfile,
						newTab: false,
					},
				],
			},
		],
	},
	{
		id: 3,
		title: 'Tin tức',
		path: routers.news,
		newTab: false,
	},
	{
		id: 4,
		title: 'Tuyển dụng',
		path: routers.recruitment,
		newTab: false,
	},
	{
		id: 5,
		title: 'Liên hệ',
		path: routers.contact,
		newTab: false,
	},
];
export default menuData;
