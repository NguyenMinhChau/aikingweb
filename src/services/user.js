/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
  adminGet,
  userDelete,
  userGet,
  userPost,
  userPut,
} from '../utils/axios/axiosInstance';
import {routersMain} from '../routers/Main';
import {routers} from '../routers/Routers';
import {toastShow} from '../utils/toast';
import {setFundsPL} from '../app/payloads/sendFunds';
import {
  setDepositsHistoryPL,
  setWithdrawsHistoryPL,
} from '../app/payloads/history';
import {setDataContractPL} from '../app/payloads/contracts';
import {setDataAssetsPL} from '../app/payloads/assets';

// FORGOT PASSWORD USER
export const userForgotPwdSV = async (props = {}) => {
  const {email_user, setIsProcess, navigation, toast} = props;
  try {
    const resGet = await userGet(`forgot/password/${email_user}`, {});
    setIsProcess(false);
    toastShow(toast, 'Gửi mã thành công, vui lòng kiểm tra email!');
    // console.log('userForgotPwdSV: ', resGet);
    // navigation.navigate(routersMain.ResetPwd);
    navigation.navigate(routersMain.Login);
  } catch (err) {
    setIsProcess(false);
    toastShow(toast, err?.response?.data?.message || 'Gửi mã thất bại');
  }
};
// OTP FORGOT PASSWORD USER
export const userOTPForgotPwdSV = async (props = {}) => {
  const {code, toast, setIsProcess, navigation} = props;
  try {
    const resGet = await userGet(`otpForGot/${code}`, {});
    // console.log('userOTPForgotPwdSV: ', resGet);
    setIsProcess(false);
    toastShow(toast, resGet?.message || 'Xác thực thành công');
    navigation.navigate(routersMain.Login);
  } catch (err) {
    setIsProcess(false);
    toastShow(toast, err?.response?.data?.message || 'Xác thực thất bại');
  }
};
// CREATE DEPOSITS
export const userCreateDepositsSV = async (props = {}) => {
  const {
    id_user,
    email_user,
    idPayment,
    amountVND,
    token,
    setIsProcess,
    navigation,
    itemBank,
    toast,
  } = props;
  try {
    const resPost = await userPost(`deposit/${id_user}`, {
      idPayment,
      status: 'Pending',
      amount: amountVND,
      note: `mobile_${email_user}`,
      token: token,
    });
    // console.log('userCreateDepositsSV: ', resPost);
    setIsProcess(false);
    toastShow(toast, 'Vui lòng tải lên hóa đơn thanh toán!');
    navigation.navigate({
      name: routersMain.UploadDeposits,
      params: {
        data: resPost?.metadata,
        itemBank: itemBank,
      },
    });
  } catch (err) {
    setIsProcess(false);
    toastShow(toast, err?.response?.data?.message || 'Nạp tiền thất bại');
  }
};
// UPLOAD BILLS DEPOSITS
export const userUploadBillsDepositsSV = async (props = {}) => {
  const {
    id_deposits,
    image,
    token,
    toast,
    setIsProcess,
    navigation,
    id_user,
    dispatch,
  } = props;
  const object = {
    image: image[0].image,
    imageName: image[0].fileName,
    statement: image[0],
  };
  try {
    await userPut(
      `deposit/image/${id_deposits}`,
      {
        ...object,
      },
      {
        headers: {
          token: token,
        },
      },
    );
    // console.log('userUploadBillsDepositsSV: ', resPut);
    const resGet = await userGet(`deposit/${id_user}`, {
      token: token,
      headers: {
        token: token,
      },
    });
    dispatch(setDepositsHistoryPL(resGet?.metadata));
    setIsProcess(false);
    toastShow(
      toast,
      'Tải hóa đơn nạp tiền thành công, vui lòng chờ người quản trị xác nhận!',
    );
    navigation.navigate(routersMain.History);
  } catch (err) {
    setIsProcess(false);
    toastShow(
      toast,
      err?.response?.data?.message || 'Tải hóa đơn nạp tiền thất bại',
    );
  }
};
// GET ALL DEPOSITS BY USER
export const userGetDepositsByUserSV = async (props = {}) => {
  const {id_user, toast, token, dispatch} = props;
  try {
    const resGet = await userGet(`deposit/${id_user}`, {
      headers: {
        token: token,
      },
    });
    // console.log('userGetDepositsByUserSV: ', resGet);
    dispatch(setDepositsHistoryPL(resGet?.metadata));
  } catch (err) {
    toastShow(toast, err?.response?.data?.message || 'Tải dữ liệu thất bại');
  }
};
// CREATE WITHDRAW
export const userCreateWithdrawSV = async (props = {}) => {
  const {
    id_user,
    email_user,
    amountVND,
    idPayment,
    toast,
    setIsProcess,
    navigation,
    token,
    userById,
  } = props;
  try {
    const resPost = await userPost(`withdraw/${id_user}`, {
      idPayment,
      status: 'Pending',
      amount: amountVND,
      note: `mobile_${email_user}`,
      token: token,
    });
    // console.log('userCreateWithdrawSV: ', resPost);
    setIsProcess(false);
    toastShow(toast, 'Vui lòng nhập mã xác thực để rút tiền!');
    const resGetPayment = await adminGet(`payment/${idPayment}`, {});
    navigation.navigate({
      name: routersMain.VerifyWithdraw,
      params: {
        data: {
          data: resPost?.metadata,
          amount: amountVND,
          accountNumber: resGetPayment?.metadata?.account_number,
          accountName: resGetPayment?.metadata?.account_name,
          bankName: resGetPayment?.metadata?.bank_name,
        },
      },
    });
  } catch (err) {
    setIsProcess(false);
    toastShow(toast, err?.response?.data?.message || 'Rút tiền thất bại');
  }
};
// RESEND OTP WITHDRAW
export const userResendOtpWithdrawSV = async (props = {}) => {
  const {id_withdraw, id_user, toast, token, setIsProcessResendOTP} = props;
  try {
    const resGet = await userGet(
      `withdraw/otp/resend/${id_user}/${id_withdraw}`,
      {
        token: token,
        headers: {
          token: token,
        },
      },
    );
    // console.log('userResendOtpWithdrawSV: ', resGet);
    setIsProcessResendOTP(false);
    toastShow(toast, 'Gửi lại mã OTP thành công, vui lòng kiểm tra email!');
  } catch (err) {
    toastShow(toast, err?.response?.data?.message || 'Gửi mã OTP thất bại!');
  }
};
// CANCEL WITHDRAW
export const userCancelWithdrawSV = async (props = {}) => {
  const {
    id_withdraw,
    toast,
    token,
    setIsProcessCancel,
    id_user,
    dispatch,
    navigation,
  } = props;
  try {
    const resDel = await userDelete(`withdraw/cancel/${id_withdraw}`, {
      token: token,
      headers: {
        token: token,
      },
    });
    const resGet = await userGet(`withdraw/${id_user}`, {
      headers: {
        token: token,
      },
    });
    dispatch(setWithdrawsHistoryPL(resGet?.metadata));
    setIsProcessCancel(false);
    toastShow(toast, 'Hủy yêu cầu rút tiền thành công!');
    navigation.navigate(routersMain.History);
  } catch (err) {
    setIsProcessCancel(false);
    toastShow(
      toast,
      err?.response?.data?.message || 'Hủy yêu cầu rút tiền thất bại!',
    );
  }
};
// VERIFY WITHDRAW OTP
export const userVerifyWithdrawSV = async (props = {}) => {
  const {code, toast, token, setIsProcess, navigation, id_user, dispatch} =
    props;
  try {
    const resPut = await userPut('withdraw/otp', {
      otp: code,
      headers: {
        token: token,
      },
    });
    // console.log('userVerifyWithdrawSV: ', resPut);
    const resGetAll = await userGet(`withdraw/${id_user}`, {
      headers: {
        token: token,
      },
    });
    dispatch(setWithdrawsHistoryPL(resGetAll?.metadata));
    setIsProcess(false);
    toastShow(toast, 'Xác thực rút tiền thành công');
    navigation.navigate(routersMain.History);
  } catch (err) {
    setIsProcess(false);
    toastShow(
      toast,
      err?.response?.data?.message || 'Xác thực rút tiền thất bại',
    );
  }
};
// GET ALL WITHDRAWS BY USER
export const userGetWithdrawByUserSV = async (props = {}) => {
  const {id_user, toast, token, dispatch} = props;
  try {
    const resGet = await userGet(`withdraw/${id_user}`, {
      headers: {
        token: token,
      },
    });
    dispatch(setWithdrawsHistoryPL(resGet?.metadata));
  } catch (err) {
    toastShow(toast, err?.response?.data?.message || 'Tải dữ liệu thất bại');
  }
};
// GET ALL WITHDRAWS/DEPOSITS BY USER
export const userGetWithdrawDepositsByUserSV = async (props = {}) => {
  const {id_user, toast, token, dispatch} = props;
  try {
    const resGetWithdraw = await userGet(`withdraw/${id_user}`, {
      headers: {
        token: token,
      },
    });
    const resGetDeposits = await userGet(`deposit/${id_user}`, {
      headers: {
        token: token,
      },
    });
    dispatch(setDepositsHistoryPL(resGetDeposits?.metadata));
    dispatch(setWithdrawsHistoryPL(resGetWithdraw?.metadata));
  } catch (err) {
    toastShow(toast, err?.response?.data?.message || 'Tải dữ liệu thất bại');
  }
};
// ADD PAYMENT USER
export const userAddPaymentSV = async (props = {}) => {
  const {
    id_user,
    account,
    token,
    bankName,
    name,
    toast,
    setIsProcess,
    navigation,
  } = props;
  try {
    const resPut = await userPut(`payment/${id_user}`, {
      accountNumber: account,
      bankName,
      accountName: name,
      token: token,
      headers: {
        token: token,
      },
    });
    // console.log('userAddPaymentSV: ', resPut);
    setIsProcess(false);
    toastShow(toast, 'Thêm phương thức thanh toán thành công');
    navigation.navigate(routers.Profile);
  } catch (err) {
    setIsProcess(false);
    toastShow(
      toast,
      `Thêm phương thức thanh toán thất bại. ${err?.response?.data?.message}`,
    );
  }
};
export const getPaymentByIds = async (props = {}) => {
  const {toast, id_payment, setPaymentUser} = props;
  try {
    const resGet = await adminGet(`payment/${id_payment}`, {});
    // console.log('getPaymentByIds: ', resGet);
    setPaymentUser(resGet?.metadata);
  } catch (err) {
    toastShow(toast, `Lấy dữ liệu thất bại. ${err?.response?.data?.message}`);
  }
};
// CHANGE PASSWORD USER
export const userChangePasswordSV = async (props = {}) => {
  const {
    id_user,
    token,
    oldPassword,
    newPassword,
    toast,
    setIsProcess,
    navigation,
  } = props;
  try {
    const resPut = await userPut(`password/${id_user}`, {
      password: oldPassword,
      new_password: newPassword,
      headers: {
        token: token,
      },
    });
    // console.log('userChangePasswordSV: ', resPut);
    setIsProcess(false);
    toastShow(toast, 'Đổi mật khẩu thành công');
    navigation.navigate(routers.Profile);
  } catch (err) {
    setIsProcess(false);
    toastShow(
      toast,
      `Đổi mật khẩu thất bại. ${
        err?.response?.data?.message || 'Không tìm thấy url'
      }`,
    );
  }
};
// LẤY TỔNG TIỀN GIẢI NGÂN
export const userGetTotalMoneySV = async (props = {}) => {
  const {
    toast,
    typeContract,
    cycleContract,
    principalContract,
    setDisbursement,
    token,
  } = props;
  try {
    const resPost = await userPost('contract/disbursement/filed', {
      type: typeContract,
      cycle: cycleContract,
      principal: principalContract,
      token: token,
      headers: {
        token: token,
      },
    });
    // console.log('userGetTotalMoneySV: ', resPost);
    setDisbursement(resPost?.metadata);
  } catch (err) {
    toastShow(
      toast,
      `Tính tiền giải ngân thất bại. ${err?.response?.data?.message}`,
    );
  }
};
// THÊM HỢP ĐỒNG (CONTRACT)
export const userAddContractSV = async (props = {}) => {
  const {
    id_user,
    cycle,
    principal,
    type,
    timeSend,
    toast,
    setIsProcessSubmit,
    setIsModalSubmit,
    navigation,
    token,
    dispatch,
  } = props;
  try {
    const resPost = await userPost(`contract/${id_user}`, {
      cycle, // kỳ hạn
      principal: principal, // số tiền gửi
      type, // quỹ
      day: timeSend, // thời gian gửi
      headers: {
        token: token,
      },
    });
    // console.log('userAddContractSV: ', resPost);
    setIsProcessSubmit(false);
    setIsModalSubmit(false);
    toastShow(
      toast,
      'Thông tin này đã được gửi về bộ phận quản lý quỹ, bộ phận sẽ sớm liên hệ quý khách để tiến hành làm hợp đồng.',
      'info',
      8000,
    );
    dispatch(
      setFundsPL({
        fund: '',
        send_time: '',
        period: '',
        deposits: '',
        interest_rate: '',
        interest_payment_period: '',
        principal_payment_time: '',
      }),
    );
    navigation.navigate(routersMain.FundManagement);
  } catch (err) {
    setIsProcessSubmit(false);
    setIsModalSubmit(false);
    toastShow(toast, err?.response?.data?.message || 'Thêm hợp đồng thất bại');
  }
};
// GET CONTRACT
export const userGetContractSV = async (props = {}) => {
  const {toast, token, id_user, dispatch} = props;
  try {
    const resGet = await userGet(`contract/${id_user}`, {
      headers: {
        token: token,
      },
    });
    // console.log('userGetContractSV: ', resGet);
    dispatch(setDataContractPL(resGet?.metadata));
  } catch (err) {
    toastShow(toast, `Lấy dữ liệu thất bại. ${err?.response?.data?.message}`);
  }
};
// LẤY TIỀN GIẢI NGÂN THEO ID CONTRACT
export const userGetDisbursementByIdContractSV = async (props = {}) => {
  const {id_contract, token, toast, setDisbursement} = props;
  try {
    const resGet = await userGet(`contract/disbursement/${id_contract}`, {
      headers: {
        token: token,
      },
    });
    // console.log('userGetDisbursementByIdContractSV: ', resGet);
    setDisbursement(prev => [...prev, resGet?.metadata]);
  } catch (err) {
    toastShow(toast, `Lấy dữ liệu thất bại. ${err?.response?.data?.message}`);
  }
};
// HỦY HỢP ĐỒNG
export const userCancelContractSV = async (props = {}) => {
  const {
    id_contract,
    id_user,
    toast,
    token,
    setIsProcessModal,
    setIsModalDetail,
    dispatch,
  } = props;
  try {
    const resPost = await userGet(`contract/destroy/${id_contract}`, {
      token: token,
      headers: {
        token: token,
      },
    });
    // console.log('userCancelContractSV: ', resPost);
    const resGet = await userGet(`contract/${id_user}`, {
      headers: {
        token: token,
      },
    });
    dispatch(setDataContractPL(resGet?.metadata));
    setIsProcessModal(false);
    setIsModalDetail(false);
    toastShow(toast, 'Hủy hợp đồng thành công. Vui lòng chờ admin xét duyệt.');
  } catch (err) {
    setIsProcessModal(false);
    setIsModalDetail(false);
    toastShow(
      toast,
      `Hủy hợp đồng thất bại thất bại. ${
        err?.response?.data?.message || 'Không tìm thấy url'
      }`,
    );
  }
};
// UPLOAD LICENSE USER
export const userUploadLicenseSV = async (props = {}) => {
  const {id_user, navigation, token, toast, imageForm, setIsProcess} = props;
  // const object = {
  //   cccdFont: imageForm[0],
  //   cccdBeside: imageForm[1],
  //   licenseFont: imageForm[2],
  //   licenseBeside: imageForm[3],
  // };
  const object = {
    image1: {
      base64: imageForm[0].image,
      name: imageForm[0].fileName,
    },
    image2: {
      base64: imageForm[1].image,
      name: imageForm[1].fileName,
    },
    image3: {
      base64: imageForm[2].image,
      name: imageForm[2].fileName,
    },
    image4: {
      base64: imageForm[3].image,
      name: imageForm[3].fileName,
    },
  };
  try {
    await userPut(
      `image/${id_user}`,
      {
        ...object,
      },
      {
        headers: {
          token: token,
        },
      },
    );
    setIsProcess(false);
    toastShow(toast, 'Cập nhật giấy tờ thành công!');
    navigation.navigate(routers.Profile);
  } catch (err) {
    console.log(err);
    setIsProcess(false);
    toastShow(
      toast,
      `Cập nhật giấy tờ thất bại, lỗi ${
        err?.response?.data?.message || '500 Internal Server Error'
      }.`,
      'error',
      5000,
    );
  }
};
// LẤY TÀI SẢN
export const userGetAssetSV = async (props = {}) => {
  const {id_user, token, toast, dispatch} = props;
  try {
    const resGet = await userGet(`dashboard/${id_user}`, {
      token: token,
      headers: {
        token: token,
      },
    });
    dispatch(setDataAssetsPL(resGet?.metadata));
  } catch (err) {
    toastShow(
      toast,
      `Tải tài sản thất bại. ${err?.response?.data?.message}`,
      'error',
      5000,
    );
  }
};
