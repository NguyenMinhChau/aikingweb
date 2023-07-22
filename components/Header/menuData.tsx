import routers from '../../routers/routers';
import { Menu } from '../../types/menu';

const menuData: Menu[] = [
	{
		id: 1,
		title: 'Về chúng tôi',
		newTab: false,
		path: routers.aboutus,
	},
	{
		id: 2,
		title: 'Dịch vụ',
		newTab: false,
		submenu: [
			{
				id: 21,
				title: 'Lập trình',
				path: routers.developer,
				newTab: false,
			},
			{
				id: 22,
				title: 'Tư vấn đầu tư',
				newTab: false,
				submenu: [
					{
						id: 221,
						title: 'Tư vấn ủy thác tích lũy vàng',
						newTab: false,
						path: routers.investmentGold,
					},
					{
						id: 222,
						title: 'Tư vấn đầu tư tiết kiệm',
						newTab: false,
						submenu: [
							{
								id: 2221,
								title: 'Trang chủ',
								path: routers.fundHome,
								newTab: false,
							},
							{
								id: 2222,
								title: 'Nạp tiền',
								path: routers.fundDeposits,
								newTab: false,
							},
							{
								id: 2223,
								title: 'Rút tiền',
								path: routers.fundWithdraw,
								newTab: false,
							},
							{
								id: 2224,
								title: 'Giao dịch',
								path: routers.fundTransaction,
								newTab: false,
							},
							{
								id: 2225,
								title: 'Tài khoản',
								path: routers.fundProfile,
								newTab: false,
							},
						],
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
