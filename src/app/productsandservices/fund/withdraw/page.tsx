'use client';

import { Breadcrumb, Button, FormInput } from '../../../../components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { setData } from '../../../../appState/reducer';
import { autoFormatNumberInputChange } from '../../../../helpers/format/NumberFormat';
import { useAppContext } from '../../../../helpers';
import Link from 'next/link';
import routers from '../../../../routers/routers';
import styles from './withdraw.module.css';
import sharedStyles from '../fund-shared-styles.module.css';

const IMAGE_SLIDERS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000',
  },
];

const WithdrawPage = () => {
  const { state, dispatch } = useAppContext();
  const { amountWithdraw } = state.set;
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
            <Button onClick={() => {}} isProcess={false} disabled={false}>
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
      </div>
    </>
  );
};

export default WithdrawPage;
