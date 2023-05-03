import routers from '../../routers/routers';
import { Menu } from '@/types/menu';

const menuData: Menu[] = [
  {
    id: 1,
    title: 'Về chúng tôi',
    newTab: false,
    submenu: [
      {
        id: 11,
        title: 'Giới thiệu',
        path: routers.introduce,
        newTab: false,
      },
      {
        id: 12,
        title: 'Báo cáo tài chính',
        path: routers.financeReport,
        newTab: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Đào tạo',
    path: routers.training,
    newTab: false,
  },
  {
    id: 3,
    title: 'Sản phẩm & Dịch vụ',
    newTab: false,
    submenu: [
      {
        id: 31,
        title: 'Web',
        path: routers.web,
        newTab: false,
      },
      {
        id: 32,
        title: 'Dịch vụ cung cấp phần mềm',
        path: routers.services,
        newTab: false,
      },
      {
        id: 33,
        title: 'Quỹ tiết kiệm',
        newTab: false,
        submenu: [
          {
            id: 331,
            title: 'Trang chủ',
            path: routers.fundHome,
            newTab: false,
          },
          {
            id: 332,
            title: 'Nạp tiền',
            path: routers.fundDeposits,
            newTab: false,
          },
          {
            id: 333,
            title: 'Rút tiền',
            path: routers.fundWithdraw,
            newTab: false,
          },
          {
            id: 334,
            title: 'Giao dịch',
            path: routers.fundTransaction,
            newTab: false,
          },
          {
            id: 335,
            title: 'Tài khoản',
            path: routers.fundProfile,
            newTab: false,
          },
        ],
      },
    ],
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
