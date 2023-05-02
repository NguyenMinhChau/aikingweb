'use client';

import { useState, useEffect } from 'react';
import {
  Breadcrumb,
  Button,
  FormInput,
  LoginRegisterCp,
  SnackbarCp,
  CustomcareLine,
  Modal,
  SelectValueCp,
} from '@/components';
import className from 'classnames/bind';
import { formatVND } from '@/helpers/format/FormatMoney';
import { dateFormat } from '@/helpers/format/DateVN';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { setData } from '@/appState/reducer';
import { autoFormatNumberInputChange } from '@/helpers/format/NumberFormat';
import { useAppContext } from '@/helpers';
import Link from 'next/link';
import routers from '@/routers/routers';
import styles from './withdraw.module.css';
import sharedStyles from '../fund-shared-styles.module.css';
import { refreshToken } from '@/services/authen';
import {
  userCreateWithdrawSV,
  userResendOtpWithdrawSV,
  userCancelWithdrawSV,
  userVerifyWithdrawSV,
} from '@/services/user';
import { adminGetUserByIdSV } from '@/services/admin';

const cx = className.bind(styles);

const IMAGE_SLIDERS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000',
  },
];

const mockBankData = [
  {
    id: 1,
    name: 'Vietcombank',
    accountName: 'AIKING GROUP',
    accountNumber: '0071000000001',
  },
];

const WithdrawPage = () => {
  const { state, dispatch } = useAppContext();
  const { amountWithdraw, bandWithdraw, currentUser, otpCode, userById } =
    state.set;
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: string;
    message: any;
  }>({
    open: false,
    type: '',
    message: '',
  });
  const [isProcessModalWithdraw, setIsProcessModalWithdraw] = useState(false);
  const [isProcessResendOTP, setIsProcessResendOTP] = useState(false);
  const [modalVerifyWithdraw, setModalVerifyWithdraw] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [itemWithdraw, setItemWithdraw] = useState<{
    id?: string;
    status?: string;
    createdAt?: string;
    amount?: number;
  } | null>(null);
  const [isProcessCancelWithdraw, setIsProcessCancelWithdraw] = useState(false);

  useEffect(() => {
    if (currentUser) {
      adminGetUserByIdSV({
        id_user: currentUser?.id,
        dispatch,
        setSnackbar,
      });
    }
  }, [currentUser, dispatch]);

  const checkBank: any =
    userById?.payment?.bank?.bankName &&
    userById?.payment?.bank?.name &&
    userById?.payment?.bank?.account;

  const handleModalWithdrawTrue = (e: any) => {
    e.stopPropagation();
    setModalVerifyWithdraw(true);
  };
  const handleModalWithdrawFalse = (e: any) => {
    e.stopPropagation();
    setModalVerifyWithdraw(false);
  };

  const handleSendWithdrawSV = async (data: any) => {
    await userCreateWithdrawSV({
      id_user: currentUser?.id,
      idPayment: userById?.payment?.bank?.idPayment,
      email_user: currentUser?.email,
      amountVND: Number(amountWithdraw.replace(/\./g, '')),
      setSnackbar,
      token: data?.token,
      setIsProcessModalWithdraw,
      setModalVerifyWithdraw,
      userById: userById,
      setItemWithdraw,
    });
  };

  const handleSendWithdraw = async (e: any) => {
    if (currentUser) {
      if (!amountWithdraw) {
        setSnackbar({
          open: true,
          type: 'error',
          message: 'Bạn chưa nhập số tiền rút',
        });
      } else if (!checkBank) {
        setSnackbar({
          open: true,
          type: 'error',
          message: 'Bạn chưa thêm tài khoản ngân hàng',
        });
      } else {
        setIsProcessModalWithdraw(true);
        await refreshToken({
          currentUser,
          handleFunc: handleSendWithdrawSV,
          dispatch,
          setData,
          setSnackbar,
        });
      }
    } else {
      setSnackbar({
        open: true,
        type: 'error',
        message: <LoginRegisterCp />,
      });
    }
  };

  const handleCloseSnackbar = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleSendOTP = async (dataToken: any) => {
    await userVerifyWithdrawSV({
      id_user: currentUser?.id,
      dispatch,
      code: otpCode,
      token: dataToken?.token,
      setSnackbar,
      setIsProcessModalWithdraw,
      setModalVerifyWithdraw,
    });
  };

  const handleAuthenWithdraw = async () => {
    if (!otpCode) {
      setSnackbar({
        open: true,
        type: 'error',
        message: 'Bạn chưa nhập mã xác thực',
      });
    } else {
      setIsProcessModalWithdraw(true);
      refreshToken({
        currentUser,
        handleFunc: handleSendOTP,
        dispatch,
        setData,
        setSnackbar,
      });
      dispatch(
        setData({
          amountWithdraw: '',
          otpCode: '',
        })
      );
    }
  };

  const handleCancelWithdrawSV = async (dataToken: any, id: any) => {
    await userCancelWithdrawSV({
      id_user: currentUser?.id,
      dispatch,
      id_withdraw: id,
      token: dataToken?.token,
      setSnackbar,
      setIsProcessCancelWithdraw,
      setModalVerifyWithdraw,
    });
  };

  const handleCancelWithdraw = async (id: any) => {
    setIsProcessCancelWithdraw(true);
    await refreshToken({
      currentUser,
      handleFunc: handleCancelWithdrawSV,
      dispatch,
      setData,
      setSnackbar,
      id,
    });
    dispatch(
      setData({
        amountWithdraw: '',
        otpCode: '',
      })
    );
  };

  const resendOtpSV = async (dataToken: any, id: string) => {
    await userResendOtpWithdrawSV({
      id_user: currentUser.id,
      id_withdraw: id,
      dispatch,
      token: dataToken?.token,
      setSnackbar,
      setIsProcessResendOTP,
    });
  };

  const handleResendOTP = async (id: string) => {
    setIsProcessResendOTP(true);
    await refreshToken({
      currentUser,
      handleFunc: resendOtpSV,
      dispatch,
      setData,
      setSnackbar,
      id,
    });
  };

  return (
    <>
      <Breadcrumb pageName="Rút tiền" description="Rút tiền" />
      <div className="container mb-5">
        <div className={sharedStyles.container}>
          <div className={sharedStyles.form_wrapper}>
            <div className={styles.withdraw_info_title}>
              <i className="fa fa-wallet mr-1"></i>
              <span>Thông tin thanh toán</span>
            </div>
            <SelectValueCp
              label="Tên ngân hàng thụ hưởng"
              value={bandWithdraw?.name}
              placeholder="---"
              data={mockBankData}
              nameSet="bandWithdraw"
              stateSelect={showSelect}
              setStateSelect={setShowSelect}
            />
            <FormInput
              label="Số tiền rút"
              placeholder="---"
              value={amountWithdraw}
              name="amountDeposits"
              onChange={(e) => {
                dispatch(
                  setData({
                    amountWithdraw: autoFormatNumberInputChange(e.target.value),
                  })
                );
              }}
              unit={amountWithdraw && 'VND'} // ₫
            />
            <Link href={`${routers.fundHistory}`}>
              <span className={styles.see_history_data}>
                Xem lịch sử nạp tiền/rút tiền
              </span>
            </Link>
            <Button
              onClick={handleSendWithdraw}
              isProcess={isProcessModalWithdraw}
              disabled={isProcessModalWithdraw}
            >
              Tiếp tục
            </Button>
          </div>
          <div className={styles.swiper_image}>
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              className="mySwiper h-full"
            >
              {IMAGE_SLIDERS.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <img className="rounded" src={item.url} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {modalVerifyWithdraw && (
          <Modal
            openModal={handleModalWithdrawTrue}
            closeModal={handleModalWithdrawFalse}
            titleHeader="Xác thực rút tiền"
            actionButtonText="Gửi"
            classNameButton={`infobgc`}
            isProcess={isProcessModalWithdraw}
            isProcessCancel={isProcessCancelWithdraw}
            onClick={handleAuthenWithdraw}
            onClickCancel={() => handleCancelWithdraw(itemWithdraw?.id)}
          >
            <CustomcareLine
              nameIcon="fa-solid fa-rotate-right"
              colorIcon="success"
              title="Trạng thái:"
              textLink={itemWithdraw?.status}
            />
            <CustomcareLine
              nameIcon="fa-regular fa-clock"
              colorIcon="info"
              title="Ngày rút:"
              textLink={dateFormat(
                itemWithdraw?.createdAt,
                'DD/MM/YYYY HH:mm:ss'
              )}
            />
            <CustomcareLine
              nameIcon="fa-solid fa-money-bill"
              colorIcon="warning"
              title="Số tiền rút:"
              textLink={formatVND(itemWithdraw?.amount || 0)}
            />
            <CustomcareLine
              nameIcon="fa fa-bank"
              colorIcon="cancel"
              title="Ngân hàng thụ hưởng:"
              bankName={userById?.payment?.bank?.bankName}
              accountName={userById?.payment?.bank?.name}
              accountNumber={userById?.payment?.bank?.account}
            />
            <FormInput
              label="Mã xác thực"
              placeholder="---"
              value={otpCode}
              name="otpCode"
              onChange={(e) => dispatch(setData({ otpCode: e.target.value }))}
              classNameField={`mt8`}
            />
            <div
              className={`${cx('text_resend')} fwb cancel`}
              onClick={
                isProcessResendOTP
                  ? () => {}
                  : () => handleResendOTP(itemWithdraw?.id || '')
              }
            >
              {isProcessResendOTP ? 'Đang gửi mã...' : 'Gửi lại mã'}
            </div>
          </Modal>
        )}
        <SnackbarCp
          openSnackbar={snackbar.open}
          handleCloseSnackbar={handleCloseSnackbar}
          messageSnackbar={snackbar.message}
          typeSnackbar={snackbar.type}
        />
      </div>
    </>
  );
};

export default WithdrawPage;
