/* eslint-disable prettier/prettier */
import {Home, Profile, Transaction, Deposits, Withdraw} from '../layouts';

export const routers = {
  Home: 'Trang chủ',
  Deposits: 'Nạp tiền',
  Withdraw: 'Rút tiền',
  Transaction: 'Giao dịch',
  Profile: 'Tài khoản',
};

const RouterObject = [
  {
    name: routers.Home,
    component: Home,
    icon: 'home',
    color: null,
    size: null,
  },
  {
    name: routers.Deposits,
    component: Deposits,
    icon: 'wallet',
    color: null,
    size: null,
  },
  {
    name: routers.Withdraw,
    component: Withdraw,
    icon: 'money-check-alt',
    color: null,
    size: null,
  },
  {
    name: routers.Transaction,
    component: Transaction,
    icon: 'hand-holding-usd',
    color: null,
    size: null,
  },
  // {
  //   name: routers.Home,
  //   component: Home,
  //   icon: 'home',
  //   color: null,
  //   size: null,
  //   custom: true,
  // },
  {
    name: routers.Profile,
    component: Profile,
    icon: 'user',
    color: null,
    size: null,
  },
];

export default RouterObject;
