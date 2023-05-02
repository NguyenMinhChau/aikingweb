import axios from 'axios';
import routers from '@/routers/routers';
import { setData } from '@/appState/reducer';

// USERS
export const userInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL_SERVER}users/`,
  withCredentials: true,
});
export const userGet = async (path: string, options = {}) => {
  const res = await userInstance.get(path, options);
  return res.data;
};
export const userPost = async (path: string, options = {}, others = {}) => {
  const res = await userInstance.post(path, options, others);
  return res.data;
};
export const userPut = async (path: string, options = {}, others = {}) => {
  const res = await userInstance.put(path, options, others);
  return res.data;
};
export const userDelete = async (path: string, options = {}) => {
  const res = await userInstance.delete(path, options);
  return res.data;
};

// ADD PAYMENT USER
export const userAddPaymentSV = async (props: any) => {
  const {
    id_user,
    account,
    bankName,
    name,
    setSnackbar,
    setisProcessModalReciving,
    setModalRecivingAccount,
    history,
    token,
  } = props;
  let resPut = null;
  try {
    resPut = await userPut(`addPayment/${id_user}`, {
      account,
      bankName,
      name,
      token: token,
      headers: {
        token: token,
      },
    });
    if (resPut.status === 200) {
      setisProcessModalReciving(false);
      setModalRecivingAccount(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: resPut?.message || 'Thêm phương thức thanh toán thành công',
      });
      history(routers.fundProfile);
    }
  } catch (e: any) {
    setisProcessModalReciving(false);
    setModalRecivingAccount(false);
    setSnackbar({
      open: true,
      type: 'error',
      message:
        e?.response?.data?.message || 'Thêm phương thức thanh toán thất bại',
    });
  }
};
// FORGOT PASSWORD USER
export const userForgotPwdSV = async (props: any) => {
  const { email, setIsProcess, setSnackbar } = props;
  let resPost = null;
  try {
    resPost = await userGet(`forgot/password/${email}`, {});
    if (resPost.status === 200) {
      setIsProcess(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: 'Gửi mã thành công, vui lòng kiểm tra email!',
      });
    }
  } catch (e: any) {
    setIsProcess(false);
    setSnackbar({
      open: true,
      type: 'error',
      message:
        e?.response?.data?.message || 'Gửi mã thất bại, vui lòng thử lại!',
    });
  }
};
// OTP FORGOT PASSWORD USER
export const userOTPForgotPwdSV = async (props: any) => {
  const { code, setSnackbar, setIsProcess, history } = props;
  let resGet = null;
  try {
    resGet = await userGet(`otpForGot/${code}`, {});
    if (resGet.status === 200) {
      setIsProcess(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: 'Xác thực thành công!',
      });
      history(routers.login);
    }
  } catch (e: any) {
    setIsProcess(false);
    setSnackbar({
      open: true,
      type: 'error',
      message:
        e?.response?.data?.message || 'Xác thực thất bại, vui lòng thử lại!',
    });
  }
};
// CREATE DEPOSITS
export const userCreateDepositsSV = async (props: any) => {
  const {
    userId,
    email,
    idPayment,
    amountVND,
    token,
    setIsProcessModalDeposits,
    setIsModalUploadDeposits,
    setSnackbar,
    setDataReturn,
  } = props;
  let resPost = null;
  try {
    resPost = await userPut(`deposit/${userId}`, {
      idPayment,
      status: 'Pending',
      amount: amountVND,
      note: `pc_${email}`,
      token: token,
    });
    // console.log('resPost: ', JSON.stringify(resPost));
    if (resPost.code === 200) {
      setIsProcessModalDeposits(false);
      setIsModalUploadDeposits(true);
      setDataReturn(resPost?.data);
      setSnackbar({
        open: true,
        type: 'success',
        message: 'Vui lòng tải lên hóa đơn thanh toán!',
      });
    }
  } catch (e: any) {
    setIsProcessModalDeposits(false);
    setSnackbar({
      open: true,
      type: 'error',
      message: e?.response?.data?.message || 'Tạo yêu cầu nạp tiền thất bại!',
    });
  }
};
// UPLOAD BILLS DEPOSITS
export const userUploadBillsDepositsSV = async (props: any) => {
  const {
    id_deposits,
    image,
    token,
    setSnackbar,
    setIsProcessUploadDeposits,
    setisModalUploadDeposits,
    id_user,
    dispatch,
  } = props;
  const object = {
    statement: image[0],
  };
  const resPut = await userPut(
    `deposit/image/${id_deposits}`,
    {
      ...object,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: token,
      },
    }
  );
  // console.log('userUploadBillsDepositsSV: ', resPut);
  switch (resPut.code) {
    case 0:
      const resGet = await userGet(`deposits/${id_user}`, {
        headers: {
          token: token,
        },
      });
      dispatch(
        setData({
          dataDepositsHistory: resGet?.data,
        })
      );
      setIsProcessUploadDeposits(false);
      setisModalUploadDeposits(false);
      setSnackbar({
        open: true,
        type: 'success',
        message:
          'Tải hóa đơn nạp tiền thành công, vui lòng chờ người quản trị xác nhận!',
      });
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcessUploadDeposits(false);
      setSnackbar({
        open: true,
        type: 'error',
        message: resPut?.message || 'Tải hóa đơn nạp tiền thất bại!',
      });
      break;
    default:
      break;
  }
};
// GET ALL DEPOSITS BY USER
export const userGetDepositsByUserSV = async (props: any) => {
  const { id_user, setSnackbar, token, dispatch } = props;
  const resGet = await userGet(`deposits/${id_user}`, {
    headers: {
      token: token,
    },
  });
  // console.log('userGetDepositsByUserSV: ', resGet);
  switch (resGet.code) {
    case 0:
      dispatch(
        setData({
          dataDepositsHistory: resGet?.data,
        })
      );
      // setSnackbar({
      //     open: true,
      //     type: 'success',
      //     message: 'Tải dữ liệu thành công',
      // });
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setSnackbar({
        open: true,
        type: 'error',
        message: resGet?.message || 'Tải dữ liệu thất bại',
      });
      break;
    default:
      break;
  }
};
// CREATE WITHDRAW
export const userCreateWithdrawSV = async (props: any) => {
  const {
    id_user,
    email_user,
    amountVND,
    idPayment,
    setSnackbar,
    setIsProcessModalWithdraw,
    setModalVerifyWithdraw,
    token,
    setItemWithdraw,
  } = props;
  let resPost = null;
  try {
    resPost = await userPost(`withdraw/${id_user}`, {
      idPayment,
      status: 'Pending',
      amount: amountVND,
      note: `pc_${email_user}`,
      token: token,
    });
    setItemWithdraw(resPost?.data);
    setIsProcessModalWithdraw(false);
    setModalVerifyWithdraw(true);
    setSnackbar({
      open: true,
      type: 'success',
      message: 'Vui lòng nhập mã xác thức rút tiền.',
    });
  } catch (e: any) {
    setIsProcessModalWithdraw(false);
    setSnackbar({
      open: true,
      type: 'error',
      message: e?.response?.data?.message || 'Tạo yêu cầu rút tiền thất bại!',
    });
  }
};
// RESEND OTP WITHDRAW
export const userResendOtpWithdrawSV = async (props: any) => {
  const { id_withdraw, setSnackbar, token, setIsProcessResendOTP } = props;
  let resPost = null;
  try {
    resPost = await userPost(`withdraw/otp/resend/${id_withdraw}`, {
      token: token,
      headers: {
        token: token,
      },
    });
    if (resPost.status === 200) {
      setIsProcessResendOTP(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: 'Gửi lại mã OTP thành công, vui lòng kiểm tra email!',
      });
    }
  } catch (e: any) {
    setIsProcessResendOTP(false);
    setSnackbar({
      open: true,
      type: 'error',
      message: e?.response?.data?.message || 'Gửi mã OTP thất bại!',
    });
  }
};
// CANCEL WITHDRAW
export const userCancelWithdrawSV = async (props: any) => {
  const {
    id_withdraw,
    setSnackbar,
    token,
    setIsProcessCancelWithdraw,
    setModalVerifyWithdraw,
    id_user,
    dispatch,
  } = props;
  let resDel = null;
  try {
    resDel = await userDelete(`withdraw/cancel/${id_withdraw}`, {
      token: token,
      headers: {
        token: token,
      },
    });
    if (resDel.status === 200) {
      const resGet = await userGet(`withdraws/${id_user}`, {
        headers: {
          token: token,
        },
      });
      dispatch(
        setData({
          dataWithdrawsHistory: resGet?.data,
        })
      );
      setIsProcessCancelWithdraw(false);
      setModalVerifyWithdraw(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: 'Hủy yêu cầu rút tiền thành công!',
      });
    }
  } catch (e) {
    setIsProcessCancelWithdraw(false);
    setSnackbar({
      open: true,
      type: 'error',
      message: resDel?.message || 'Hủy yêu cầu rút tiền thất bại!',
    });
  }
};
// VERIFY WITHDRAW OTP
export const userVerifyWithdrawSV = async (props: any) => {
  const {
    code,
    setSnackbar,
    token,
    setIsProcessModalWithdraw,
    setModalVerifyWithdraw,
    dispatch,
  } = props;
  let resGet = null;
  try {
    resGet = await userGet(`enterOtpWithdraw/${code}`, {
      headers: {
        token: token,
      },
    });
    if (resGet.status === 200) {
      dispatch(
        setData({
          dataWithdrawsHistory: resGet?.data,
        })
      );
      setIsProcessModalWithdraw(false);
      setModalVerifyWithdraw(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: 'Xác thực rút tiền thành công',
      });
    }
  } catch (e: any) {
    setIsProcessModalWithdraw(false);
    setSnackbar({
      open: true,
      type: 'error',
      message:
        e?.response?.data?.message || 'Xác thực rút tiền thất bại. Mã OTP sai',
    });
  }
};
// GET ALL WITHDRAWS BY USER
export const userGetWithdrawByUserSV = async (props: any) => {
  const { id_user, setSnackbar, token, dispatch } = props;
  const resGet = await userGet(`withdraws/${id_user}`, {
    headers: {
      token: token,
    },
  });
  // console.log('userGetWithdrawByUserSV: ', resGet);
  switch (resGet.code) {
    case 0:
      dispatch(
        setData({
          dataWithdrawsHistory: resGet?.data,
        })
      );
      // setSnackbar({
      //     open: true,
      //     type: 'success',
      //     message: 'Tải dữ liệu thành công',
      // });
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setSnackbar({
        open: true,
        type: 'error',
        message: resGet?.message || 'Tải dữ liệu thất bại',
      });
      break;
    default:
      break;
  }
};
// CHANGE PASSWORD USER
export const userChangePasswordSV = async (props: any) => {
  const {
    id_user,
    token,
    oldPassword,
    newPassword,
    setSnackbar,
    setisProcessModalPwd,
    setmodalChangePwd,
  } = props;
  const resPut = await userPut(`password/${id_user}`, {
    password: oldPassword,
    new_password: newPassword,
    headers: {
      token: token,
    },
  });
  console.log('userChangePasswordSV: ', resPut);
  switch (resPut.code) {
    case 0:
      setisProcessModalPwd(false);
      setmodalChangePwd(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: 'Đổi mật khẩu thành công',
      });
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setisProcessModalPwd(false);
      setSnackbar({
        open: true,
        type: 'error',
        message: resPut?.message || 'Đổi mật khẩu thất bại',
      });
      break;
    default:
      break;
  }
};
// LẤY TỔNG TIỀN GIẢI NGÂN
export const userGetTotalMoneySV = async (props: any) => {
  const {
    setSnackbar,
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
      setSnackbar({
        open: true,
        type: 'error',
        message: resPost?.message || 'Tính tiền giải ngân thất bại',
      });
      break;
    default:
      break;
  }
};
// THÊM HỢP ĐỒNG (CONTRACT)
export const userAddContractSV = async (props: any) => {
  const {
    id_user,
    cycle,
    principal,
    type,
    timeSend,
    setSnackbar,
    setIsProcessSubmit,
    setIsModalSubmit,
    token,
    history,
  } = props;
  const resPost = await userPost(`addContract/${id_user}`, {
    cycle, // kỳ hạn
    principal, // số tiền gửi
    type, // quỹ
    day: timeSend, // thời gian gửi
    token: token,
    headers: {
      token: token,
    },
  });
  // console.log('userAddContractSV: ', resPost);
  switch (resPost.code) {
    case 0:
      setIsProcessSubmit(false);
      setIsModalSubmit(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: 'Thêm hợp đồng thành công',
      });
      history(routers.fundManager);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcessSubmit(false);
      setIsModalSubmit(false);
      setSnackbar({
        open: true,
        type: 'error',
        message: resPost?.message || 'Thêm hợp đồng thất bại',
      });
      break;
    default:
      break;
  }
};
// GET CONTRACT
export const userGetContractSV = async (props: any) => {
  const { setSnackbar, token, id_user, dispatch } = props;
  const resGet = await userGet(`contract/${id_user}`, {
    headers: {
      token: token,
    },
  });
  // console.log('userGetContractSV: ', resGet);
  switch (resGet.code) {
    case 0:
      dispatch(
        setData({
          dataContracts: resGet?.data,
        })
      );
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setSnackbar({
        open: true,
        type: 'error',
        message: resGet?.message || 'Tải dữ liệu thất bại',
      });
      break;
    default:
      break;
  }
};
// HỦY HỢP ĐỒNG
export const userCancelContractSV = async (props: any) => {
  const {
    id_contract,
    id_user,
    setSnackbar,
    token,
    setIsProcessModal,
    setIsModalDetailAgriculture,
    setIsModalDetail,
    dispatch,
  } = props;
  const resPost = await userPost(`destroy/contract/${id_contract}`, {
    token: token,
    headers: {
      token: token,
    },
  });
  // console.log('userCancelContractSV: ', resPost);
  switch (resPost.code) {
    case 0:
      const resGet = await userGet(`contract/${id_user}`, {
        headers: {
          token: token,
        },
      });
      dispatch(
        setData({
          dataContracts: resGet?.data,
        })
      );
      setIsProcessModal(false);
      setIsModalDetailAgriculture && setIsModalDetailAgriculture(false);
      setIsModalDetail && setIsModalDetail(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: 'Hủy hợp đồng thành công. Vui lòng chờ admin xét duyệt.',
      });
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcessModal(false);
      setSnackbar({
        open: true,
        type: 'error',
        message: resPost?.message || 'Hủy hợp đồng thất bại',
      });
      break;
    default:
      break;
  }
};
// LẤY TIỀN GIẢI NGÂN THEO ID CONTRACT
export const userGetDisbursementByIdContractSV = async (props: any) => {
  const { id_contract, token, setSnackbar, setDisbursement } = props;
  const resGet = await userGet(`disbursement/${id_contract}`, {
    headers: {
      token: token,
    },
  });
  // console.log('userGetDisbursementByIdContractSV: ', resGet);
  switch (resGet.code) {
    case 0:
      setDisbursement((prev: any) => [...prev, resGet?.data]);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setSnackbar({
        open: true,
        type: 'error',
        message: resGet?.message || 'Tải dữ liệu thất bại',
      });
      break;
    default:
      break;
  }
};
// UPLOAD LICENSE USER
export const userUploadLicenseSV = async (props: any) => {
  const {
    id_user,
    token,
    setSnackbar,
    imagePersonNationalityFont,
    imagePersonNationalityBeside,
    imageLicenseFont,
    imageLicenseBeside,
    setisProcessModalUpload,
    setModalUpload,
    setUploadCCCDFont,
    setUploadCCCDBeside,
    setUploadLicenseFont,
    setUploadLicenseBeside,
  } = props;
  const resPut = await userPut(
    `image/${id_user}`,
    {
      cccdFont: imagePersonNationalityFont,
      cccdBeside: imagePersonNationalityBeside,
      licenseFont: imageLicenseFont,
      licenseBeside: imageLicenseBeside,
      token: token,
      headers: {
        token: token,
      },
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: token,
      },
    }
  );
  // console.log('userUploadLicenseSV: ', resPut);
  switch (resPut.code) {
    case 0:
      setisProcessModalUpload(false);
      setModalUpload(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: 'Cập nhật giấy tờ thành công!',
      });
      setUploadCCCDFont(null);
      setUploadCCCDBeside(null);
      setUploadLicenseFont(null);
      setUploadLicenseBeside(null);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setisProcessModalUpload(false);
      setSnackbar({
        open: true,
        type: 'error',
        message:
          'Cập nhật giấy tờ thất bại. Vui lòng chọn lại tất cả 4 ảnh để cập nhật, xin cảm ơn!',
      });
      break;
    default:
      break;
  }
};
// LẤY TÀI SẢN
export const userGetAssetSV = async (props: any) => {
  const { id_user, token, setSnackbar, dispatch } = props;
  const resGet = await userGet(`total/assets/${id_user}`, {
    token: token,
    headers: {
      token: token,
    },
  });
  // console.log('userGetAssetSV: ', resGet);
  switch (resGet.code) {
    case 0:
      dispatch(
        setData({
          dataAssets: resGet?.data,
        })
      );
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setSnackbar({
        open: true,
        type: 'error',
        message: resGet?.message || 'Tải dữ liệu thất bại',
      });
      break;
    default:
      break;
  }
};
