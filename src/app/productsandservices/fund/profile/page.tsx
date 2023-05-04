'use client';
import React, { useCallback, useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './profile.module.css';
import {
  Breadcrumb,
  CreditCard,
  CustomcareLine,
  FormInput,
  IconForm,
  Image,
  LoginRegisterCp,
  Modal,
  SelectValueCp,
  SnackbarCp,
} from '@/components';
import { formatVND } from '@/helpers/format/FormatMoney';
import routers from '@/routers/routers';
import { useAppContext } from '@/helpers';
import { setData } from '@/appState/reducer';
import { dataBank } from '@/helpers/fakeData/dataBank';
import { adminGetUserByIdSV } from '@/services/admin';
import {
  userAddPaymentSV,
  userChangePasswordSV,
  userUploadLicenseSV,
} from '@/services/user';
import { authLogoutSV, refreshToken } from '@/services/authen';
import { useRouter } from 'next/navigation';

const cx = className.bind(styles);

export default function Profile() {
  const { state, dispatch } = useAppContext();
  const {
    currentUser,
    userById,
    email,
    otpCode,
    bankName,
    accountNumber,
    accountName,
    password,
    confirmPassword,
    oldPassword,
  } = state.set;

  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });
  const [showEye, setShowEye] = useState(false);
  const [isProcessModalEmail, setIsProcessModalEmail] = useState(false);
  const [modalEmail, setModalEmail] = useState(false);
  const [isShowOTP, setIsShowOTP] = useState(false);
  const [modalRecivingAccount, setModalRecivingAccount] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [isProcessModalReciving, setisProcessModalReciving] = useState(false);
  const [modalChangePwd, setmodalChangePwd] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const [isProcessModalPwd, setisProcessModalPwd] = useState(false);
  const [isProcessModalUpload, setisProcessModalUpload] = useState(false);
  const [uploadCCCDFont, setUploadCCCDFont] = useState(null);
  const [uploadCCCDBeside, setUploadCCCDBeside] = useState(null);
  const [uploadLicenseFont, setUploadLicenseFont] = useState(null);
  const [uploadLicenseBeside, setUploadLicenseBeside] = useState(null);

  const { push } = useRouter();
  const handleCloseSnackbar = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };
  const handleModalEmailTrue = (e: any) => {
    e.stopPropagation();
    setModalEmail(true);
  };
  const handleModalEmailFalse = (e: any) => {
    e.stopPropagation();
    setIsShowOTP(false);
    setModalEmail(false);
    dispatch(
      setData({
        email: '',
        otpCode: '',
      })
    );
  };
  const handleModalRecivingTrue = (e: any) => {
    e.stopPropagation();
    setModalRecivingAccount(true);
  };
  const handleModalRecivingFalse = (e: any) => {
    e.stopPropagation();
    setModalRecivingAccount(false);
    dispatch(
      setData({
        bankName: '',
        accountName: '',
        accountNumber: '',
      })
    );
  };
  const handleModalPwdTrue = (e: any) => {
    e.stopPropagation();
    setmodalChangePwd(true);
  };
  const handleModalPwdFalse = (e: any) => {
    e.stopPropagation();
    setmodalChangePwd(false);
    dispatch(
      setData({
        oldPassword: '',
        password: '',
        confirmPassword: '',
      })
    );
  };
  const handleModalUploadTrue = (e: any) => {
    e.stopPropagation();
    setModalUpload(true);
  };
  const handleModalUploadFalse = (e: any) => {
    e.stopPropagation();
    setModalUpload(false);
    setUploadCCCDFont(null);
    setUploadCCCDBeside(null);
    setUploadLicenseFont(null);
    setUploadLicenseBeside(null);
  };
  const handleModalAuthenOldEmail = (e) => {
    e.stopPropagation();
    setModalEmail(true);
    setIsShowOTP(true);
  };

  useEffect(() => {
    document.title = `Tài khoản | ${process.env.NEXT_PUBLIC_TITLE_WEB}`;
    if (currentUser) {
      adminGetUserByIdSV({
        userId: currentUser?.id,
        dispatch,
        setSnackbar,
      });
    }
  }, []);
  const handleShowEye = () => {
    setShowEye(!showEye);
  };

  const handleClick = () => {
    setSnackbar({
      open: true,
      type: 'info',
      message: 'Giao diện đang được phát triển!',
    });
  };

  const handleSubmitNewEmail = async () => {
    if (!email) {
      setSnackbar({
        open: true,
        type: 'error',
        message: 'Vui lòng nhập email!',
      });
    } else {
      setIsProcessModalEmail(true);
      setTimeout(() => {
        setIsProcessModalEmail(false);
        setIsShowOTP(true);
        dispatch(setData({ email: '' }));
      }, 3000);
    }
  };
  const handleAuthenOTP = async () => {
    if (!otpCode) {
      setSnackbar({
        open: true,
        type: 'error',
        message: 'Vui lòng nhập mã OTP!',
      });
      return;
    }
    setIsProcessModalEmail(true);
    setTimeout(() => {
      setIsProcessModalEmail(false);
      setModalEmail(false);
      setIsShowOTP(false);
      setSnackbar({
        open: true,
        type: 'info',
        message: 'Chức năng đang được phát triển!',
      });
      dispatch(setData({ otpCode: '' }));
    }, 3000);
  };
  const handleSendMethod = async (dataToken: any) => {
    await userAddPaymentSV({
      id_user: currentUser?.id,
      account: accountNumber,
      bankName: bankName?.name,
      name: accountName,
      setSnackbar,
      setisProcessModalReciving,
      setModalRecivingAccount,
      history: push,
      token: dataToken?.token,
    });
  };
  const handleAddMethod = async () => {
    if (!bankName || !accountName || !accountNumber) {
      setSnackbar({
        open: true,
        type: 'error',
        message: 'Vui lòng nhập đầy đủ thông tin',
      });
      return;
    }
    setisProcessModalReciving(true);
    await refreshToken({
      currentUser,
      handleFunc: handleSendMethod,
      dispatch,
      setData,
      setSnackbar,
    });
    await adminGetUserByIdSV({
      userId: currentUser?.id,
      dispatch,
      setSnackbar,
    });
    dispatch(
      setData({
        bankName: '',
        accountName: '',
        accountNumber: '',
      })
    );
  };
  const handleSendPwd = async (dataToken: any) => {
    await userChangePasswordSV({
      id_user: currentUser?.id,
      token: dataToken?.token,
      oldPassword: oldPassword,
      newPassword: password,
      setSnackbar,
      setisProcessModalPwd,
      setmodalChangePwd,
    });
  };
  const handleChangePwd = async () => {
    if (!password || !oldPassword || !confirmPassword) {
      setSnackbar({
        open: true,
        type: 'error',
        message: 'Vui lòng nhập đầy đủ thông tin',
      });
    } else if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        type: 'error',
        message: 'Mật khẩu không khớp',
      });
    } else {
      setisProcessModalPwd(true);
      await refreshToken({
        currentUser,
        handleFunc: handleSendPwd,
        dispatch,
        setData,
        setSnackbar,
      });
    }
  };
  const handleLogout = async () => {
    await authLogoutSV({
      email: currentUser?.email,
      history: push,
      setSnackbar,
      dispatch,
    });
  };
  const handleSendUploadSV = async (dataToken: any) => {
    await userUploadLicenseSV({
      id_user: currentUser?.id,
      token: dataToken?.token,
      setSnackbar,
      setisProcessModalUpload,
      setModalUpload,
      imagePersonNationalityFont: uploadCCCDFont?.file,
      imagePersonNationalityBeside: uploadCCCDBeside?.file,
      imageLicenseFont: uploadLicenseFont?.file,
      imageLicenseBeside: uploadLicenseBeside?.file,
      setUploadCCCDFont,
      setUploadCCCDBeside,
      setUploadLicenseFont,
      setUploadLicenseBeside,
    });
  };
  const handleUpload = async () => {
    if (
      (userById?.uploadCCCDFont || uploadCCCDFont) &&
      (userById?.uploadCCCDBeside || uploadCCCDBeside) &&
      (userById?.uploadLicenseFont || uploadLicenseFont) &&
      (userById?.uploadLicenseBeside || uploadLicenseBeside)
    ) {
      setisProcessModalUpload(true);
      await refreshToken({
        currentUser,
        handleFunc: handleSendUploadSV,
        dispatch,
        setData,
        setSnackbar,
      });
    } else {
      setSnackbar({
        open: true,
        type: 'error',
        message: 'Vui lòng chọn đầy đủ ảnh',
      });
    }
  };
  const checkbank = userById?.payment?.bank;
  const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;
  const RenderImageDocument = ({
    nameFile,
    idFile,
    urlImage,
    urlImagePending,
    onChange,
  }) => {
    return (
      <label className={`${cx('image-item')}`} id={idFile}>
        {!urlImage && !urlImagePending ? (
          <>
            <IconForm.UploadIcon className={`${cx('icon-upload')}`} />
          </>
        ) : (
          <Image
            src={
              !urlImagePending
                ? `${URL_SERVER}/${urlImage?.replace('uploads/', '')}`
                : urlImagePending
            }
            alt=""
            className={`${cx('image-view')}`}
          />
        )}
        <input
          type="file"
          id={idFile}
          className={`${cx('input-file')}`}
          name={nameFile}
          onChange={onChange}
        />
      </label>
    );
  };
  const handleChangeUploadCCCDFont = useCallback(
    (e) => {
      const { files } = e.target;
      setUploadCCCDFont({
        url: URL.createObjectURL(files[0]),
        file: files[0],
      });
    },
    [uploadCCCDFont]
  );
  const handleChangeUploadCCCDBeside = useCallback(
    (e) => {
      const { files } = e.target;
      setUploadCCCDBeside({
        url: URL.createObjectURL(files[0]),
        file: files[0],
      });
    },
    [uploadCCCDBeside]
  );
  const handleChangeUploadLicenseFont = useCallback(
    (e: any) => {
      const { files } = e.target;
      setUploadLicenseFont({
        url: URL.createObjectURL(files[0]),
        file: files[0],
      });
    },
    [uploadLicenseFont]
  );
  const handleChangeUploadLicenseBeside = useCallback(
    (e: any) => {
      const { files } = e.target;
      setUploadLicenseBeside({
        url: URL.createObjectURL(files[0]),
        file: files[0],
      });
    },
    [uploadLicenseBeside]
  );
  return (
    <>
      <Breadcrumb pageName="Tài khoản" description="Tài khoản" />
      <div className="container mb-5">
        <SnackbarCp
          openSnackbar={snackbar.open}
          handleCloseSnackbar={handleCloseSnackbar}
          messageSnackbar={snackbar.message}
          typeSnackbar={snackbar.type}
        />
        <div className={`${cx('body')}`}>
          <div className={`${cx('list_info_container')}`}>
            <div className={`${cx('list_info_item')}`}>
              <div className={`${cx('item_text')}`}>
                <i className="fa fa-user"></i>
                <span>Thông tin tài khoản</span>
              </div>
              {currentUser ? (
                <div className={`${cx('menu_conatiner')}`}>
                  <div className={`${cx('authen_container')}`}>
                    <Image
                      src="../../../../../public/images/logo/logo_light.png"
                      alt="image_user"
                      className={`${cx('image_user')}`}
                    />
                    <div className={`${cx('authen_email_container')}`}>
                      <div className={`${cx('name_user')}`}>
                        {currentUser?.username || '---'}
                        {currentUser?.username && (
                          <span className={`${cx('btn_authen', 'success')}`}>
                            Đã xác thực
                          </span>
                        )}
                      </div>
                      <div
                        className={`${cx('email_authen')}`}
                        onClick={handleModalEmailTrue}
                      >
                        <span>{currentUser?.email || '---'}</span>
                        <i className="bx bx-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                  <CustomcareLine
                    nameIcon="bx bx-wallet"
                    colorIcon="#4caf50"
                    title="Tổng tài sản:"
                    price={formatVND(currentUser?.balance || 0)}
                    eye
                    showEye={showEye}
                    handleShowEye={handleShowEye}
                  />
                  <CustomcareLine
                    nameIcon="bx bxs-credit-card-alt"
                    colorIcon="#d50000"
                    link={'##'}
                    textLink="Tài khoản nhận tiền"
                    onClick={handleModalRecivingTrue}
                  />
                  <CustomcareLine
                    nameIcon="fa-solid fa-arrows-rotate"
                    colorIcon="#007aff"
                    link={'##'}
                    textLink="Đổi mật khẩu"
                    onClick={handleModalPwdTrue}
                  />
                  <CustomcareLine
                    nameIcon="fas fa-upload"
                    colorIcon="#4caf50"
                    link={'##'}
                    textLink="Giấy phép lái xe/CCCD"
                    onClick={handleModalUploadTrue}
                  />
                  <CustomcareLine
                    nameIcon="fas fa-link"
                    colorIcon="#ffab00"
                    link={'##'}
                    textLink="Tài khoản liên kết"
                    noneBorderBottom
                    onClick={handleClick}
                  />
                </div>
              ) : (
                <LoginRegisterCp padding="24px" />
              )}
            </div>
            <div className={`${cx('list_info_item')}`}>
              <div className={`${cx('menu_conatiner')}`}>
                <CustomcareLine
                  nameIcon="fa-regular fa-newspaper"
                  colorIcon="#4caf50"
                  link={'##'}
                  textLink="Điều kiện và điều khoản"
                  onClick={handleClick}
                />
                <CustomcareLine
                  nameIcon="fa-solid fa-user-plus"
                  colorIcon="#ffab00"
                  link={'##'}
                  textLink="Mời bạn bè"
                  onClick={handleClick}
                />
                <CustomcareLine
                  nameIcon="fa-solid fa-users"
                  colorIcon="#d50000"
                  link={'##'}
                  textLink="Hoa hồng cho nhà đầu tư"
                  onClick={handleClick}
                />
                <CustomcareLine
                  nameIcon="fa-solid fa-circle-info"
                  colorIcon="#007aff"
                  link={'##'}
                  textLink="Hướng dẫn sử dụng"
                  onClick={handleClick}
                />
                <CustomcareLine
                  nameIcon="fa-solid fa-phone"
                  colorIcon="#4caf50"
                  link={`${routers.providentFund}/${routers.customcare}`}
                  textLink="CSKH"
                  noneBorderBottom={!currentUser}
                />
              </div>
            </div>
          </div>
        </div>
        {modalEmail && (
          <Modal
            openModal={handleModalEmailTrue}
            closeModal={handleModalEmailFalse}
            titleHeader={isShowOTP ? 'Xác thực OTP' : 'Thay đổi email'}
            actionButtonText={isShowOTP ? 'Xác thực' : 'Gửi OTP'}
            classNameButton={'infobgc'}
            isProcess={isProcessModalEmail}
            onClick={isShowOTP ? handleAuthenOTP : handleSubmitNewEmail}
          >
            {isShowOTP ? (
              <FormInput
                label="Mã OTP"
                placeholder="Nhập mã"
                name="otpCode"
                value={otpCode}
                onChange={(e) => dispatch(setData({ otpCode: e.target.value }))}
              />
            ) : (
              <FormInput
                label="Nhập email mới"
                placeholder="Ví dụ: example@gmail.com"
                name="email"
                value={email}
                onChange={(e) => dispatch(setData({ email: e.target.value }))}
              />
            )}
          </Modal>
        )}
        {modalRecivingAccount && (
          <Modal
            openModal={handleModalRecivingTrue}
            closeModal={handleModalRecivingFalse}
            titleHeader="Tài khoản nhận tiền"
            actionButtonText="Gửi"
            classNameButton={`warningbgc`}
            isProcess={isProcessModalReciving}
            onClick={handleAddMethod}
            hideButton={checkbank}
          >
            <p className={`${cx('text_desc')} info fwb mb8`}>
              Nếu đã có tài khoản nhưng không hiện thông tin. Vui lòng F5 lại
              trang, xin cảm ơn!
            </p>
            {checkbank ? (
              <CreditCard
                bankName={userById?.payment?.bank?.bankName}
                cardNumber={userById?.payment?.bank?.account}
                accountName={userById?.payment?.bank?.name}
              />
            ) : (
              <>
                <FormInput
                  label="Số tài khoản"
                  placeholder="---"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={(e) =>
                    dispatch(
                      setData({
                        accountNumber: e.target.value,
                      })
                    )
                  }
                />
                <FormInput
                  label="Tên tài khoản"
                  placeholder="---"
                  name="accountName"
                  value={accountName}
                  onChange={(e) =>
                    dispatch(
                      setData({
                        accountName: e.target.value,
                      })
                    )
                  }
                />
                <SelectValueCp
                  label="Tên ngân hàng"
                  value={bankName?.name}
                  placeholder="---"
                  data={dataBank}
                  nameSet="bankName"
                  stateSelect={showSelect}
                  setStateSelect={setShowSelect}
                />
              </>
            )}
          </Modal>
        )}
        {modalChangePwd && (
          <Modal
            openModal={handleModalPwdTrue}
            closeModal={handleModalPwdFalse}
            titleHeader="Thay đổi mật khẩu"
            actionButtonText="Gửi"
            isProcess={isProcessModalPwd}
            classNameButton={`warningbgc`}
            onClick={handleChangePwd}
          >
            <FormInput
              label="Mật khẩu cũ"
              placeholder="Nhập mật khẩu cũ"
              name="oldPassword"
              value={oldPassword}
              showPwd
              onChange={(e) =>
                dispatch(setData({ oldPassword: e.target.value }))
              }
            />
            <FormInput
              label="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              name="password"
              value={password}
              showPwd
              onChange={(e) => dispatch(setData({ password: e.target.value }))}
            />
            <FormInput
              label="Xác thực mật khẩu"
              placeholder="Xác thực"
              name="confirmPassword"
              value={confirmPassword}
              showPwd
              onChange={(e) =>
                dispatch(setData({ confirmPassword: e.target.value }))
              }
            />
          </Modal>
        )}
        {modalUpload && (
          <Modal
            openModal={handleModalUploadTrue}
            closeModal={handleModalUploadFalse}
            titleHeader="Tải giấy tờ"
            actionButtonText="Gửi"
            isProcess={isProcessModalUpload}
            classNameButton={`warningbgc`}
            onClick={handleUpload}
          >
            <div className={`${cx('container-document')}`}>
              <p className={`${cx('text_desc')} info fwb mb8`}>
                Nếu đã tải giấy tờ nhưng không hiện thông tin. Vui lòng F5 lại
                trang, xin cảm ơn!
              </p>
              <div className={`${cx('document-title')}`}>
                1. Căn cước công dân
              </div>
              <div className={`${cx('document-image-container')}`}>
                <RenderImageDocument
                  nameFile="uploadCCCDFont"
                  idFile="uploadCCCDFont"
                  urlImage={userById?.uploadCCCDFont}
                  onChange={handleChangeUploadCCCDFont}
                  urlImagePending={uploadCCCDFont?.url}
                />
                <RenderImageDocument
                  nameFile="uploadCCCDBeside"
                  idFile="uploadCCCDBeside"
                  urlImage={userById?.uploadCCCDBeside}
                  onChange={handleChangeUploadCCCDBeside}
                  urlImagePending={uploadCCCDBeside?.url}
                />
              </div>
            </div>
            <div className={`${cx('container-document')}`}>
              <div className={`${cx('document-title')}`}>
                2. Giấy phép lái xe
              </div>
              <div className={`${cx('doucment-image-container')}`}>
                <RenderImageDocument
                  nameFile="uploadLicenseFont"
                  idFile="uploadLicenseFont"
                  urlImage={userById?.uploadLicenseFont}
                  onChange={handleChangeUploadLicenseFont}
                  urlImagePending={uploadLicenseFont?.url}
                />
                <RenderImageDocument
                  nameFile="uploadLicenseBeside"
                  idFile="uploadLicenseBeside"
                  urlImage={userById?.uploadLicenseBeside}
                  onChange={handleChangeUploadLicenseBeside}
                  urlImagePending={uploadLicenseBeside?.url}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
