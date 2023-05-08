'use client';
import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import LOGO_BANK from '../../public/images/creditCard/logo-company.png';
import CHIP from '../../public/images/creditCard/chip.png';
import NAPAS from '../../public/images/creditCard/napas.png';
import Image from 'next/image';

const cx = className.bind(styles);
type CreditCardType = {
	bankName: string;
	cardNumber: string;
	accountName: string;
};
export default function CreditCard({
	bankName,
	cardNumber,
	accountName,
}: CreditCardType) {
	return (
		<div className={`${cx('Credit_card_container')}`}>
			<div className={`${cx('Credit_card_header')}`}>
				<div className={`${cx('trademark_container')}`}>
					<Image
						src={LOGO_BANK}
						className={`${cx('trademark_logo')}`}
						alt=""
					/>
					<div className={`${cx('trademark_name_bank')}`}>
						{bankName}
					</div>
				</div>
				<i className="fa-solid fa-money-check"></i>
			</div>
			<div className={`${cx('Credit_card_middle')}`}>
				<div style={{ marginTop: '15px' }}>
					<i className="fa-solid fa-caret-left"></i>
				</div>
				<div className={`${cx('card_info_footer')}`}>
					<Image
						className={`${cx('card_info_footer_logo')}`}
						src={CHIP}
						alt=""
					/>
					<div className={`${cx('number_card')}`}>{cardNumber}</div>
				</div>
			</div>
			<div className={`${cx('Credit_card_footer')}`}>
				<div className={`${cx('accountName_card_container')}`}>
					<div className={`${cx('ext_card_container')}`}>
						<span className={`${cx('ext_card_title')}`}>Ext:</span>
						<span className={`${cx('ext_card_text')}`}>MM/YY</span>
					</div>
					<div className={`${cx('accountName_card_text')}`}>
						{accountName}
					</div>
				</div>
				<Image
					className={`${cx('Credit_card_footer_logo')}`}
					src={NAPAS}
					alt=""
				/>
			</div>
		</div>
	);
}
