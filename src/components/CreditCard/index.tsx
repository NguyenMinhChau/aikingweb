import React from 'react';
import className from 'classnames/bind';
import styles from './CreditCard.module.css';
import Image from '../Image';
import LOGO_BANK from '../../../public/images/logo/logo_light.png';
import CHIP from '../../../public/images/chip.png';
import NAPAS from '../../../public/images/napas.png';

const cx = className.bind(styles);
type CreditCardProps = {
  bankName?: string;
  cardNumber?: string;
  accountName?: string;
};

export default function CreditCard({
  bankName,
  cardNumber,
  accountName,
}: CreditCardProps) {
  return (
    <div className={[styles.Credit_card_container]}>
      <div className={[styles.Credit_card_header]}>
        <div className={[styles.trademark_container]}>
          <Image className={`${cx('trademark_logo')}`} src={LOGO_BANK} />
          <div className={`${cx('trademark_name_bank')}`}>{bankName}</div>
        </div>
        <i className="fa-solid fa-money-check"></i>
      </div>
      <div className={`${cx('Credit_card_middle')}`}>
        <div style={{ marginTop: '15px' }}>
          <i className="fa-solid fa-caret-left"></i>
        </div>
        <div className={`${cx('card_info_footer')}`}>
          <Image className={`${cx('card_info_footer_logo')}`} src={CHIP} />
          <div className={`${cx('number_card')}`}>{cardNumber}</div>
        </div>
      </div>
      <div className={`${cx('Credit_card_footer')}`}>
        <div className={`${cx('accountName_card_container')}`}>
          <div className={`${cx('ext_card_container')}`}>
            <span className={`${cx('ext_card_title')}`}>Ext:</span>
            <span className={`${cx('ext_card_text')}`}>MM/YY</span>
          </div>
          <div className={`${cx('accountName_card_text')}`}>{accountName}</div>
        </div>
        <Image className={`${cx('Credit_card_footer_logo')}`} src={NAPAS} />
      </div>
    </div>
  );
}
