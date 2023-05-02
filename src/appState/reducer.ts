import { getStore } from '@/helpers/localStore/localStore';
import { SET_DATA, SET_TOGGLE } from './actions';

export const initialState: any = {
  set: {
    currentUser: getStore(),
    userById: null,
    item: null,
    username: '',
    email: '',
    password: '',
    otpCode: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    oldPassword: '',
    confirmPassword: '',
    amountWithdraw: '',
    amountDeposits: '',
    bankDeposits: null,
    bandWithdraw: null,
    file: [],
    dataDepositsHistory: [],
    dataWithdrawsHistory: [],
    dataContracts: [],
    dataAssets: null,
    dataManagerFundUSD: [],
    dataManagerFundAgriculture: [],
    investmentFund: '',
    period: '',
    sendingTime: new Date(),
    deposits: '',
    pagination: {
      page: 1,
      show: 10,
    },
    sort: 'asc',
    searchValues: {
      deposits_history: '',
      withdraws_history: '',
      manager_fund_usd: '',
      manager_fund_agriculture: '',
    },
  },
  toggle: {},
};

export const setData = (payload: any) => {
  return {
    type: SET_DATA,
    payload,
  };
};

export const toogle = (payload: any) => {
  return {
    type: SET_TOGGLE,
    payload,
  };
};

export default function reducer(state = initialState, action: any) {
  switch (action?.type) {
    case SET_DATA:
      return {
        ...state,
        set: {
          ...state.set,
          ...action.payload,
        },
      };
    case SET_TOGGLE:
      return {
        ...state,
        toogle: {
          ...state.toggle,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
