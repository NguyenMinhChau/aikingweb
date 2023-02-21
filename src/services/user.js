/* eslint-disable prettier/prettier */
import {
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

// FORGOT PASSWORD USER
export const userForgotPwdSV = async (props = {}) => {
  const {email_user, setIsProcess, navigation, toast} = props;
  const resPost = await userPost(`forgotPassword/${email_user}`, {});
  // console.log('userForgotPwdSV: ', resPost);
  switch (resPost.code) {
    case 0:
      setIsProcess(false);
      toastShow(toast, 'Gửi mã thành công, vui lòng kiểm tra email!');
      navigation.navigate(routersMain.ResetPwd);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(toast, resPost?.message || 'Gửi mã thất bại');
      break;
    default:
      break;
  }
};
// OTP FORGOT PASSWORD USER
export const userOTPForgotPwdSV = async (props = {}) => {
  const {code, toast, setIsProcess, navigation} = props;
  const resGet = await userGet(`otpForGot/${code}`, {});
  // console.log('userOTPForgotPwdSV: ', resGet);
  switch (resGet.code) {
    case 0:
      setIsProcess(false);
      toastShow(toast, resGet?.message || 'Xác thực thành công');
      navigation.navigate(routersMain.Login);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(toast, resGet?.message || 'Xác thực thất bại');
      break;
    default:
      break;
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
  const resPost = await userPost(`deposit/${id_user}`, {
    idPayment,
    status: 'Pending',
    amount: amountVND,
    note: `mobile_${email_user}`,
    token: token,
  });
  // console.log('userCreateDepositsSV: ', resPost);
  switch (resPost.code) {
    case 0:
      setIsProcess(false);
      toastShow(toast, 'Vui lòng tải lên hóa đơn thanh toán!');
      navigation.navigate({
        name: routersMain.UploadDeposits,
        params: {
          data: resPost?.data,
          itemBank: itemBank,
        },
      });
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(toast, resPost?.message || 'Nạp tiền thất bại');
      break;
    default:
      break;
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
  };
  const resPut = await userPut(
    `additionImageDeposit/${id_deposits}`,
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
  switch (resPut.code) {
    case 0:
      const resGet = await userGet(`deposits/${id_user}`, {
        headers: {
          token: token,
        },
      });
      dispatch(setDepositsHistoryPL(resGet?.data));
      setIsProcess(false);
      toastShow(
        toast,
        'Tải hóa đơn nạp tiền thành công, vui lòng chờ người quản trị xác nhận!',
      );
      navigation.navigate(routersMain.Deposits);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(toast, resPut?.message || 'Tải hóa đơn nạp tiền thất bại');
      break;
    default:
      break;
  }
};
// GET ALL DEPOSITS BY USER
export const userGetDepositsByUserSV = async (props = {}) => {
  const {id_user, toast, token, dispatch} = props;
  const resGet = await userGet(`deposits/${id_user}`, {
    headers: {
      token: token,
    },
  });
  // console.log('userGetDepositsByUserSV: ', resGet);
  switch (resGet.code) {
    case 0:
      dispatch(setDepositsHistoryPL(resGet?.data));
      // toastShow(toast, 'Tải dữ liệu thành công');
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      toastShow(toast, resGet?.message || 'Tải dữ liệu thất bại');
      break;
    default:
      break;
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
  const resPost = await userPost(`withdraw/${id_user}`, {
    idPayment,
    status: 'Pending',
    amount: amountVND,
    note: `mobile_${email_user}`,
    token: token,
  });
  // console.log('userCreateWithdrawSV: ', resPost);
  switch (resPost.code) {
    case 0:
      setIsProcess(false);
      toastShow(toast, 'Vui lòng nhập mã xác thực để rút tiền!');
      navigation.navigate({
        name: routersMain.VerifyWithdraw,
        params: {
          data: {
            data: resPost?.data,
            amount: amountVND,
            accountNumber: userById?.payment?.bank?.account,
            accountName: userById?.payment?.bank?.name,
            bankName: userById?.payment?.bank?.bankName,
          },
        },
      });
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(toast, resPost?.message || 'Rút tiền thất bại');
      break;
    default:
      break;
  }
};
// RESEND OTP WITHDRAW
export const userResendOtpWithdrawSV = async (props = {}) => {
  const {id_withdraw, toast, token, setIsProcessResendOTP} = props;
  const resPost = await userPost(`withdraw/otp/resend/${id_withdraw}`, {
    token: token,
    headers: {
      token: token,
    },
  });
  // console.log('userResendOtpWithdrawSV: ', resPost);
  switch (resPost.code) {
    case 0:
      setIsProcessResendOTP(false);
      toastShow(toast, 'Gửi lại mã OTP thành công, vui lòng kiểm tra email!');
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      toastShow(toast, resPost?.message || 'Gửi mã OTP thất bại!');
      break;
    default:
      break;
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
  const resDel = await userDelete(`withdraw/cancel/${id_withdraw}`, {
    token: token,
    headers: {
      token: token,
    },
  });
  console.log('userCancelWithdrawSV: ', resDel);
  switch (resDel.code) {
    case 0:
      const resGet = await userGet(`withdraws/${id_user}`, {
        headers: {
          token: token,
        },
      });
      dispatch(setWithdrawsHistoryPL(resGet?.data));
      setIsProcessCancel(false);
      toastShow(toast, 'Hủy yêu cầu rút tiền thành công!');
      navigation.navigate(routersMain.Withdraw);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcessCancel(false);
      toastShow(toast, resDel?.message || 'Hủy yêu cầu rút tiền thất bại!');
      break;
    default:
      break;
  }
};
// VERIFY WITHDRAW OTP
export const userVerifyWithdrawSV = async (props = {}) => {
  const {code, toast, token, setIsProcess, navigation, id_user, dispatch} =
    props;
  const resGet = await userGet(`enterOtpWithdraw/${code}`, {
    headers: {
      token: token,
    },
  });
  // console.log('userVerifyWithdrawSV: ', resGet);
  switch (resGet.code) {
    case 0:
      const resGetAll = await userGet(`withdraws/${id_user}`, {
        headers: {
          token: token,
        },
      });
      dispatch(setWithdrawsHistoryPL(resGetAll?.data));
      setIsProcess(false);
      toastShow(toast, 'Xác thực rút tiền thành công');
      navigation.navigate(routersMain.Withdraw);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(toast, resGet?.message || 'Xác thực rút tiền thất bại');
      break;
    default:
      break;
  }
};
// GET ALL WITHDRAWS BY USER
export const userGetWithdrawByUserSV = async (props = {}) => {
  const {id_user, toast, token, dispatch} = props;
  const resGet = await userGet(`withdraws/${id_user}`, {
    headers: {
      token: token,
    },
  });
  // console.log('userGetWithdrawByUserSV: ', resGet);
  switch (resGet.code) {
    case 0:
      dispatch(setWithdrawsHistoryPL(resGet?.data));
      // toastShow(toast, 'Tải dữ liệu thành công');
      break;
    case 1:
    case 2:
    case 304:
      toastShow(toast, resGet?.message || 'Tải dữ liệu thất bại');
      break;
    default:
      break;
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
  const resPut = await userPut(`addPayment/${id_user}`, {
    account,
    bankName,
    name,
    token: token,
    headers: {
      token: token,
    },
  });
  // console.log('userAddPaymentSV: ', resPut);
  switch (resPut.code) {
    case 0:
      setIsProcess(false);
      toastShow(toast, 'Thêm phương thức thanh toán thành công');
      navigation.navigate(routers.Profile);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(
        toast,
        `Thêm phương thức thanh toán thất bại. ${resPut?.message}`,
      );
      break;
    default:
      break;
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
  const resPut = await userPut(`password/${id_user}`, {
    password: oldPassword,
    new_password: newPassword,
    headers: {
      token: token,
    },
  });
  // console.log('userChangePasswordSV: ', resPut);
  switch (resPut.code) {
    case 0:
      setIsProcess(false);
      toastShow(toast, 'Đổi mật khẩu thành công');
      navigation.navigate(routers.Profile);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(toast, `Đổi mật khẩu thất bại. ${resPut?.message}`);
      break;
    default:
      break;
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
  const resPost = await userPost('/disbursement/field', {
    typeContract,
    cycleContract,
    principalContract,
    token: token,
    headers: {
      token: token,
    },
  });
  // console.log('userGetTotalMoneySV: ', resPost);
  switch (resPost.code) {
    case 0:
      setDisbursement(resPost?.data);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      toastShow(toast, `Tính tiền giải ngân thất bại. ${resPost?.message}`);
      break;
    default:
      break;
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
  const resPost = await userPost(`addContract/${id_user}`, {
    cycle, // kỳ hạn
    principal, // số tiền gửi
    type, // quỹ
    day: timeSend, // thời gian gửi
    headers: {
      token: token,
    },
  });
  // console.log('userAddContractSV: ', resPost);
  switch (resPost.code) {
    case 0:
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
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcessSubmit(false);
      setIsModalSubmit(false);
      toastShow(toast, resPost?.message || 'Thêm hợp đồng thất bại');
      break;
    default:
      break;
  }
};
// GET CONTRACT
export const userGetContractSV = async (props = {}) => {
  const {toast, token, id_user, setDataContract} = props;
  const resGet = await userGet(`contract/${id_user}`, {
    headers: {
      token: token,
    },
  });
  // console.log('userGetContractSV: ', resGet);
  switch (resGet.code) {
    case 0:
      setDataContract(resGet?.data);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      toastShow(toast, `Lấy dữ liệu thất bại. ${resGet?.message}`);
      break;
    default:
      break;
  }
};
// LẤY TIỀN GIẢI NGÂN THEO ID CONTRACT
export const userGetDisbursementByIdContractSV = async (props = {}) => {
  const {id_contract, token, toast, setDisbursement} = props;
  const resGet = await userGet(`disbursement/${id_contract}`, {
    headers: {
      token: token,
    },
  });
  // console.log('userGetDisbursementByIdContractSV: ', resGet);
  switch (resGet.code) {
    case 0:
      setDisbursement(prev => [...prev, resGet?.data]);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      toastShow(toast, `Lấy dữ liệu thất bại. ${resGet?.message}`);
      break;
    default:
      break;
  }
};
// UPLOAD LICENSE USER
export const userUploadLicenseSV = async (props = {}) => {
  const {id_user, navigation, token, toast, imageForm, setIsProcess} = props;
  const object = {
    imagePersonNationalityFont: imageForm[0],
    imagePersonNationalityBeside: imageForm[1],
    imageLicenseFont: imageForm[2],
    imageLicenseBeside: imageForm[3],
  };
  const resPut = await userPut(`image/${id_user}`, {
    ...object,
    token: token,
    headers: {
      token: token,
    },
  });
  // console.log('userUploadLicenseSV: ', resPut);
  switch (resPut.code) {
    case 0:
      setIsProcess(false);
      toastShow(toast, 'Cập nhật giấy tờ thành công!');
      navigation.navigate(routers.Profile);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(
        toast,
        'Cập nhật giấy tờ thất bại. Vui lòng chọn lại tất cả 4 ảnh để cập nhật, xin cảm ơn!',
        'error',
        5000,
      );
      break;
    default:
      break;
  }
};
