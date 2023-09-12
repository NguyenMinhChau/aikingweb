import React from 'react';
import className from 'classnames/bind';
import styles from './InfoCompany.module.css';

const cx = className.bind(styles);

export default function InfoCompany() {
	return <div className={`${cx('container')}`}></div>;
}
