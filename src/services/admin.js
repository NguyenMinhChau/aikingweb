/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {setUserByIdPL} from '../app/payloads/user';
import {
  adminDelete,
  adminGet,
  adminPost,
  adminPut,
} from '../utils/axios/axiosInstance';
import {toastShow} from '../utils/toast';

// ADD RATE
export const adminAddRateSV = async (props = {}) => {
  const {rate, toast} = props;
  try {
    const resPost = await adminPost('addRate', {
      rate,
    });
    // console.log('adminAddRateSV: ', resPost);
  } catch (err) {
    toastShow(toast, `Thêm giá thất bại, lỗi ${err?.response?.data?.message}`);
  }
};
// GET RATE
export const adminGetRateSV = async (props = {}) => {
  const {id_rate, toast} = props;
  try {
    const resGet = await adminGet(`getRate/${id_rate}`, {});
    // console.log('adminGetRateSV: ', resGet);
  } catch (err) {
    toastShow(toast, `Lấy giá thất bại, lỗi ${err?.response?.data?.message}`);
  }
};
// UPDATE RATE
export const adminUpdateRateSV = async (props = {}) => {
  const {id_rate, rate, toast} = props;
  try {
    const resPut = await adminPut(`updateRate/${id_rate}`, {
      rate,
    });
    // console.log('adminUpdateRateSV: ', resPut);
  } catch (err) {
    toastShow(toast, `Sửa giá thất bại, lỗi ${err?.response?.data?.message}`);
  }
};
// DELETE RATE
export const adminDeleteRateSV = async (props = {}) => {
  const {id_rate, toast} = props;
  try {
    const resDelete = await adminDelete(`deleteRate/${id_rate}`, {});
    // console.log('adminDeleteRateSV: ', resDelete);
  } catch (err) {
    toastShow(toast, `Xóa giá thất bại, lỗi ${err?.response?.data?.message}`);
  }
};
// GET ALL USERS
export const adminGetAllUsersSV = async (props = {}) => {
  const {toast} = props;
  try {
    const resGet = await adminGet('allUsers', {});
    // console.log('adminGetAllUsersSV: ', resGet);
  } catch (err) {
    toastShow(
      toast,
      `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// GET USER BY ID
export const adminGetUserByIdSV = async (props = {}) => {
  const {id_user, dispatch, toast, setPaymentUser} = props;
  try {
    const resGet = await adminGet(`user/${id_user}`, {});
    // console.log('adminGetUserByIdSV: ', resGet);
    dispatch(setUserByIdPL(resGet?.metadata));
    if (setPaymentUser) {
      const resGetPayment = await adminGet(
        `payment/${resGet?.metadata?.payment?.bank}`,
        {},
      );
      // console.log('getPaymentByIds: ', resGetPayment);
      setPaymentUser(resGetPayment?.metadata);
    }
  } catch (err) {
    toastShow(toast, `Đã xảy ra lỗi. ${err?.response?.data?.message}`);
  }
};
export const getAllPaymentAdmins = async (props = {}) => {
  const {toast, setBankAdmins} = props;
  try {
    const resGet = await adminGet('payment', {});
    // console.log('getAllPaymentAdmins: ', resGet);
    setBankAdmins(resGet?.metadata.filter(x => x.type_payment === 'admin'));
  } catch (err) {
    toastShow(toast, `Đã xảy ra lỗi. ${err?.response?.data?.message}`);
  }
};
// UPDATE USER BY ID
export const adminUpdateUserByIdSV = async (props = {}) => {
  const {id_user, toast} = props;
  try {
    const resPut = await adminPut(`updateUser/${id_user}`, {});
    // console.log('adminUpdateUserByIdSV: ', resPut);
  } catch (err) {
    toastShow(
      toast,
      `Sửa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// DELETE USER BY ID
export const adminDeleteUserByIdSV = async (props = {}) => {
  const {id_user, toast} = props;
  try {
    const resDel = await adminDelete(`deleteUser/${id_user}`, {});
    console.log('adminDeleteUserByIdSV: ', resDel);
  } catch (err) {
    toastShow(
      toast,
      `Xóa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// GET ALL PAYMENTS
export const adminGetAllPaymentsSV = async (props = {}) => {
  const {toast} = props;
  try {
    const resGet = await adminGet('getPayments', {});
    // console.log('adminGetAllPaymentsSV: ', resGet);
  } catch (err) {
    toastShow(
      toast,
      `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// GET PAYMENT BY ID
export const adminGetPaymentByIdSV = async (props = {}) => {
  const {id_payment, toast, setDataBank} = props;
  try {
    const resGet = await adminGet(`payment/${id_payment}`, {});
    if (setDataBank) {
      setDataBank(resGet?.metadata);
    }
    // console.log('adminGetPaymentByIdSV: ', resGet);
  } catch (err) {
    toastShow(
      toast,
      `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// ADD PAYMENT
export const adminAddPaymentSV = async (props = {}) => {
  const {payment, toast} = props;
  try {
    const resPost = await adminPost('addPayment', {
      payment,
    });
    // console.log('adminAddPaymentSV: ', resPost);
  } catch (err) {
    toastShow(
      toast,
      `Thêm phương thức thanh toán thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// UPDATE PAYMENT
export const adminUpdatePaymentSV = async (props = {}) => {
  const {id_payment, toast} = props;
  try {
    const resPut = await adminPut(`updatePayment/${id_payment}`, {});
    // console.log('adminUpdatePaymentSV: ', resPut);
  } catch (err) {
    toastShow(
      toast,
      `Sửa phương thức thanh toán thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// DELETE PAYMENT
export const adminDeletePaymentSV = async (props = {}) => {
  const {id_payment, toast} = props;
  try {
    const resDel = await adminDelete(`deletePayment/${id_payment}`, {});
    // console.log('adminDeletePaymentSV: ', resDel);
  } catch (err) {
    toastShow(
      toast,
      `Xóa phương thức thanh toán thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// GET ALL DEPOSITS
export const adminGetAllDepositsSV = async (props = {}) => {
  const {toast} = props;
  try {
    const resGet = await adminGet('deposits', {});
    // console.log('adminGetAllDepositsSV: ', resGet);
  } catch (err) {
    toastShow(
      toast,
      `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// GET DEPOSIT BY ID
export const adminGetDepositByIdSV = async (props = {}) => {
  const {id_deposit, toast} = props;
  try {
    const resGet = await adminGet(`deposit/${id_deposit}`, {});
    // console.log('adminGetDepositByIdSV: ', resGet);
  } catch (err) {
    toastShow(
      toast,
      `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// UPDATE DEPOSITS
export const adminUpdateDepositSV = async (props = {}) => {
  const {id_deposit, toast} = props;
  try {
    const resPut = await adminPut(`updateDeposit/${id_deposit}`, {});
    // console.log('adminUpdateDepositSV: ', resPut);
  } catch (err) {
    toastShow(
      toast,
      `Sửa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// DELETE DEPOSIT
export const adminDeleteDepositSV = async (props = {}) => {
  const {id_deposit, toast} = props;
  try {
    const resDel = await adminDelete(`deleteDeposit/${id_deposit}`, {});
    // console.log('adminDeleteDepositSV: ', resDel);
  } catch (err) {
    toastShow(
      toast,
      `Xóa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// UPDATE STATUS DEPOSITS
export const adminUpdateStatusDepositSV = async (props = {}) => {
  const {id_deposit, status, toast} = props;
  try {
    const resPut = await adminPut(`handleDeposit/${id_deposit}`, {
      status,
    });
    // console.log('adminUpdateStatusDepositSV: ', resPut);
  } catch (err) {
    toastShow(
      toast,
      `Cập nhật dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// GET ALL WITHDRAWS
export const adminGetAllWithdrawsSV = async (props = {}) => {
  const {toast} = props;
  try {
    const resGet = await adminGet('withdraws', {});
    // console.log('adminGetAllWithdrawsSV: ', resGet);
  } catch (err) {
    toastShow(
      toast,
      `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// GET WITHDRAW BY ID
export const adminGetWithdrawByIdSV = async (props = {}) => {
  const {id_withdraw, toast} = props;
  try {
    const resGet = await adminGet(`withdraw/${id_withdraw}`, {});
    // console.log('adminGetWithdrawByIdSV: ', resGet);
  } catch (err) {
    toastShow(
      toast,
      `Lấy dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// UPDATE WITHDRAW
export const adminUpdateWithdrawSV = async (props = {}) => {
  const {id_withdraw, toast} = props;
  try {
    const resPut = await adminPut(`updateWithdraw/${id_withdraw}`, {});
    // console.log('adminUpdateWithdrawSV: ', resPut);
  } catch (err) {
    toastShow(
      toast,
      `Sửa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// DELETE WITHDRAW
export const adminDeleteWithdrawSV = async (props = {}) => {
  const {id_withdraw, toast} = props;
  try {
    const resDel = await adminDelete(`deleteWithdraw/${id_withdraw}`, {});
    // console.log('adminDeleteWithdrawSV: ', resDel);
  } catch (err) {
    toastShow(
      toast,
      `Xóa dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// UPDATE STATUS WITHDRAW
export const adminUpdateStatusWithdrawSV = async (props = {}) => {
  const {id_withdraw, status, toast} = props;
  try {
    const resPut = await adminPut(`handleWithdraw/${id_withdraw}`, {
      status,
    });
    // console.log('adminUpdateStatusWithdrawSV: ', resPut);
  } catch (err) {
    toastShow(
      toast,
      `Cập nhật dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
// UPDATE STATUS CONTRACT
export const adminUpdateStatusContractSV = async (props = {}) => {
  const {id_contract, status, toast} = props;
  try {
    const resPut = await adminPut(`handleContract/${id_contract}`, {
      status,
    });
    // console.log('adminUpdateStatusContractSV: ', resPut);
  } catch (err) {
    toastShow(
      toast,
      `Cập nhật dữ liệu thất bại, lỗi ${err?.response?.data?.message}`,
    );
  }
};
