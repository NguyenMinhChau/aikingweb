'use client';
import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';

const cx = className.bind(styles);
type CustomcareLineType = {
  nameIcon?: string;
  colorIcon?: string;
  colorStatus?: string;
  link?: string;
  textLink?: string;
  title?: string;
  price?: string;
  noneBorderBottom?: boolean;
  onClick?: () => void;
  eye?: boolean;
  showEye?: boolean;
  handleShowEye?: () => void;
  bankMethod?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  marginLeft?: string;
};
export default function CustomcareLine({
  nameIcon,
  colorIcon,
  colorStatus,
  link,
  textLink,
  title,
  price,
  noneBorderBottom,
  onClick,
  eye,
  showEye,
  handleShowEye,
  bankMethod,
  bankName,
  accountName,
  accountNumber,
  marginLeft,
}: CustomcareLineType) {
  return (
    <div
      className={`${cx(
        'item_desc_container',
        noneBorderBottom && 'border-bottom-none'
      )}`}
    >
      <span>
        <span>
          <i
            className={nameIcon + ' ' + colorIcon}
            style={{ color: colorIcon }}
          ></i>
        </span>
        <span
          className={`${cx('item_desc_title')}`}
          onClick={eye ? handleShowEye : () => {}}
          style={{ marginLeft: marginLeft }}
        >
          {title}{' '}
          {eye && <i className={`fa fa-${showEye ? 'eye' : 'eye-slash'}`}></i>}
        </span>
      </span>
      {bankMethod && (
        <span className={`${cx('bank_method_container')}`}>
          <span className={`${cx('item_desc_text')}`}>{accountName}</span>
          <span className={`${cx('item_desc_text')}`}>{bankName}</span>
          <span className={`${cx('item_desc_text')}`}>{accountNumber}</span>
        </span>
      )}
      {link ? (
        !onClick ? (
          <a
            href={link}
            rel="noreferrer"
            target="_blank"
            className={`${cx('item_desc_text')} `}
          >
            {textLink}
          </a>
        ) : (
          <div onClick={onClick} className={`${cx('item_desc_text')}`}>
            {textLink}
          </div>
        )
      ) : (
        <span className={`${cx('item_desc_text')} ${colorStatus}`}>
          {price ? (showEye ? price : '*****đ') : textLink}
        </span>
      )}
    </div>
  );
}
