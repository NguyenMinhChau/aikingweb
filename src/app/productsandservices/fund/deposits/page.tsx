'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb, FormInput, SelectValueCp, Button } from '@/components';
import { DataFundUSD, useAppContext } from '@/helpers';
import { autoFormatNumberInputChange } from '@/helpers/format/NumberFormat';
import { setData } from '@/appState/reducer';
import routers from '@/routers/routers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import styles from './deposit.module.css';
import sharedStyles from '../fund-shared-styles.module.css';

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

const DepositsPage = () => {
  const { state, dispatch } = useAppContext();
  const { amountDeposits, bankDeposits, file, currentUser } = state.set;
  const [showSelect, setShowSelect] = useState(false);
  const [isProcessModalDeposits, setIsProcessModalDeposits] = useState(false);
  const [isProcessUploadDeposits, setIsProcessUploadDeposits] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });

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
      }
    } else {
      setSnackbar({
        open: true,
        type: 'error',
        message: '',
      });
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
        <Button onClick={handleSubmit} isProcess={false} disabled={false}>
          Tiếp tục
        </Button>
      </div>
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
        </div>
      </div>
    </>
  );
};

export default DepositsPage;
