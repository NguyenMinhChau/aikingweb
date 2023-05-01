'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  FormInput,
  SelectValueCp,
  Button,
  Modal,
  SnackbarCp,
  LoginRegisterCp,
  CustomcareLine,
  FileUploadSingle,
  Image,
} from '@/components';
import { DataFundUSD, useAppContext } from '@/helpers';
import { autoFormatNumberInputChange } from '@/helpers/format/NumberFormat';
import { dateFormat } from '@/helpers/format/DateVN';
import { formatVND } from '@/helpers/format/FormatMoney';
import { setData } from '@/appState/reducer';
import routers from '@/routers/routers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import styles from './deposit.module.css';
import sharedStyles from '../fund-shared-styles.module.css';
import { refreshToken } from '@/services/authen';
import {
  userCreateDepositsSV,
  userUploadBillsDepositsSV,
} from '@/services/user';
import className from 'classnames/bind';

const dataBankAdmin = [
  {
    id: 1,
    name: 'Vietcombank',
    accountName: 'AIKING GROUP',
    accountNumber: '0071000000001',
  },
];

const IMAGE_SLIDERS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3VzdG9tZXIlMjBzZXJ2aWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60',
  },
];

const cx = className.bind(styles);

const DepositsPage = () => {
  const { state, dispatch } = useAppContext();
  const { amountDeposits, bankDeposits, file, currentUser } = state.set;
  const [showSelect, setShowSelect] = useState(false);
  const [isProcessModalDeposits, setIsProcessModalDeposits] = useState(false);
  const [isProcessUploadDeposits, setIsProcessUploadDeposits] = useState(false);
  const [isModalUploadDeposits, setIsModalUploadDeposits] = useState(false);
  const [dataReturn, setDataReturn] = useState<{
    id?: string;
    status?: string;
    createdAt?: string;
    amount?: number;
  } | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: string;
    message: any;
  }>({
    open: false,
    type: '',
    message: '',
  });

  const handleSendDeposits = async (dataToken: any) => {
    await userCreateDepositsSV({
      id_user: currentUser?.id,
      email_user: currentUser?.email,
      idPayment: 1,
      amountVND: amountDeposits.replace(/\./g, ''),
      token: dataToken?.token,
      setIsProcessModalDeposits,
      setIsModalUploadDeposits,
      setSnackbar,
      setDataReturn,
    });
  };

  const handleSubmit = async () => {
    if (currentUser) {
      if (!amountDeposits || !bankDeposits) {
        setSnackbar({
          open: true,
          type: 'error',
          message: 'Bạn chưa nhập đủ thông tin',
        });
      } else {
        setIsProcessModalDeposits(true);
        await refreshToken({
          currentUser,
          handleFunc: handleSendDeposits,
          state,
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

  const handleModalDepositsTrue = (e: any) => {
    e.stopPropagation();
    setIsModalUploadDeposits(true);
  };

  const handleModalDepositsFalse = (e: any) => {
    e.stopPropagation();
    setIsModalUploadDeposits(false);
    dispatch(
      setData({
        file: [],
        amountDeposits: '',
        bankDeposits: '',
      })
    );
  };

  const handleSendUpload = (dataToken: any) => {
    userUploadBillsDepositsSV({
      id_user: currentUser?.id,
      dispatch,
      id_deposits: dataReturn?.id,
      image: file,
      token: dataToken?.token,
      setSnackbar,
      setIsProcessUploadDeposits,
      setIsModalUploadDeposits,
    });
  };

  const handleUploadBillDeposits = async () => {
    if (file.length === 0) {
      setSnackbar({
        open: true,
        type: 'error',
        message: 'Bạn chưa chọn file',
      });
    } else {
      setIsProcessUploadDeposits(true);
      setTimeout(() => {
        refreshToken({
          currentUser,
          handleFunc: handleSendUpload,
          state,
          dispatch,
          setData,
          setSnackbar,
        });
        dispatch(
          setData({
            amountDeposits: '',
            bankDeposits: '',
            file: [],
          })
        );
      }, 3000);
    }
  };

  const renderDepositForm = () => {
    return (
      <div className={sharedStyles.form_wrapper}>
        <div className={styles.deposit_info}>
          <i className="fa-solid fa-hand-holding-dollar mr-1"></i>
          <span>Thông tin nạp</span>
        </div>
        <SelectValueCp
          label="Tên ngân hàng thụ hưởng"
          value={bankDeposits?.name}
          placeholder="---"
          data={dataBankAdmin}
          nameSet="bankDeposits"
          stateSelect={showSelect}
          setStateSelect={setShowSelect}
        />
        <FormInput
          label="Số tiền nạp"
          placeholder="---"
          value={amountDeposits}
          name="amountDeposits"
          onChange={(e) => {
            dispatch(
              setData({
                amountDeposits: autoFormatNumberInputChange(e.target.value),
              })
            );
          }}
          unit={amountDeposits && 'VND'}
        />
        <Link href={`${routers.fundHistory}`}>
          <span className={styles.see_history_data}>
            Xem lịch sử nạp tiền/rút tiền
          </span>
        </Link>
        <Button
          onClick={handleSubmit}
          isProcess={isProcessModalDeposits}
          disabled={isProcessModalDeposits}
        >
          Tiếp tục
        </Button>
      </div>
    );
  };

  const renderUploadForm = () => {
    const urlImageFile = file.length > 0 && URL.createObjectURL(file[0]);
    return (
      <>
        {isModalUploadDeposits && (
          <Modal
            openModal={handleModalDepositsTrue}
            closeModal={handleModalDepositsFalse}
            titleHeader="Tải hóa đơn nạp tiền"
            actionButtonText="Gửi"
            classNameButton={`infobgc`}
            isProcess={isProcessUploadDeposits}
            onClick={handleUploadBillDeposits}
          >
            <CustomcareLine
              nameIcon="fa-solid fa-rotate-right"
              colorIcon="success"
              title="Trạng thái:"
              textLink={dataReturn?.status}
              key="success-line"
            />
            <CustomcareLine
              nameIcon="fa-regular fa-clock"
              colorIcon="info"
              title="Ngày rút:"
              textLink={dateFormat(
                dataReturn?.createdAt,
                'DD/MM/YYYY HH:mm:ss'
              )}
              key="withdraw-date-line"
            />
            <CustomcareLine
              nameIcon="fa-solid fa-money-bill"
              colorIcon="warning"
              title="Số tiền rút:"
              textLink={formatVND(dataReturn?.amount || 0)}
              key="warning-line"
            />
            <CustomcareLine
              nameIcon="fa fa-bank"
              colorIcon="cancel"
              title="Ngân hàng thụ hưởng:"
              bankName={bankDeposits?.name}
              accountName={bankDeposits?.accountName}
              accountNumber={bankDeposits?.accountNumber}
              key="bank-line"
            />
            <FileUploadSingle label="Tải hình ảnh" />
            {urlImageFile && (
              <div className={`${cx('view_image')}`}>
                <Image
                  src={urlImageFile}
                  alt="image_upload"
                  className={`${cx('image')}`}
                />
              </div>
            )}
          </Modal>
        )}
      </>
    );
  };

  const renderSwiperImage = () => {
    return (
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
    );
  };

  return (
    <>
      <Breadcrumb pageName="Nạp tiền" description="Nạp tiền" />
      <div className="container mb-5">
        <div className={sharedStyles.container}>
          {renderDepositForm()}
          {renderSwiperImage()}
          {renderUploadForm()}
        </div>
      </div>
      <SnackbarCp
        openSnackbar={snackbar.open}
        handleCloseSnackbar={handleCloseSnackbar}
        messageSnackbar={snackbar.message}
        typeSnackbar={snackbar.type}
      />
    </>
  );
};

export default DepositsPage;
