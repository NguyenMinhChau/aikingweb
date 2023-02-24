/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
// import {getAsyncStore} from '../utils/localStore/localStore';
import {
  SET_CURRENT_USER,
  SET_USER_BY_ID,
  SET_FORM,
  SET_MESSAGE,
  SET_TOKEN_FORGOT,
  SET_RECEIVING_ACCOUNT,
  SET_DEPOSITS,
  SET_WITHDRAWS,
  SET_CONTRACTS,
  SET_SEND_FUNDS,
  SET_DATA_DEPOSITS_HISTORY,
  SET_DATA_WITHDRAWS_HISTORY,
  SET_DATA_CONTRACTS,
  SET_DATA_ASSETS,
} from './actions';

const initialState = {
  currentUser: null,
  userById: null,
  tokenForgot: null,
  dataDepositsHistory: [],
  dataWithdrawsHistory: [],
  dataContracts: [],
  dataAssets: null,
  receivingAccount: {
    accountName: '',
    accountNumber: '',
    bankName: '',
  },
  deposits: {
    amount: '',
    bankId: '',
  },
  withdraw: {
    amount: '',
    otpCode: '',
  },
  contract: {
    cycle: '',
    principal: '',
    rate: '',
    otpCode: '',
  },
  send_funds: {
    fund: '',
    send_time: '',
    period: '',
    deposits: '',
    interest_rate: '',
    interest_payment_period: '',
    principal_payment_time: '',
  },
  message: {
    del: '',
    cre: '',
    upd: '',
    error: '',
  },
  form: {
    email: '',
    username: '',
    password: '',
    phone: '',
    oldPwd: '',
    confirmPwd: '',
    otpCode: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_USER_BY_ID:
      return {
        ...state,
        userById: action.payload,
      };
    case SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload,
        },
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          ...action.payload,
        },
      };
    case SET_TOKEN_FORGOT:
      return {
        ...state,
        tokenForgot: action.payload,
      };
    case SET_RECEIVING_ACCOUNT:
      return {
        ...state,
        receivingAccount: {
          ...state.receivingAccount,
          ...action.payload,
        },
      };
    case SET_DEPOSITS:
      return {
        ...state,
        deposits: {
          ...state.deposits,
          ...action.payload,
        },
      };
    case SET_WITHDRAWS:
      return {
        ...state,
        withdraw: {
          ...state.withdraw,
          ...action.payload,
        },
      };
    case SET_CONTRACTS:
      return {
        ...state,
        contract: {
          ...state.contract,
          ...action.payload,
        },
      };
    case SET_SEND_FUNDS:
      return {
        ...state,
        send_funds: {
          ...state.send_funds,
          ...action.payload,
        },
      };
    case SET_DATA_DEPOSITS_HISTORY:
      return {
        ...state,
        dataDepositsHistory: action.payload,
      };
    case SET_DATA_WITHDRAWS_HISTORY:
      return {
        ...state,
        dataWithdrawsHistory: action.payload,
      };
    case SET_DATA_CONTRACTS:
      return {
        ...state,
        dataContracts: action.payload,
      };
    case SET_DATA_ASSETS:
      return {
        ...state,
        dataAssets: action.payload,
      };
    default:
      break;
  }
};

export {initialState};
export default reducer;
