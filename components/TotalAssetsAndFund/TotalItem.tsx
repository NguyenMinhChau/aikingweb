import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { formatVND } from '../../helpers/format/FormatMoney';

const cx = className.bind(styles);
type TotalItemType = {
	title?: string;
	isShow?: boolean;
	price?: number;
};
export default function TotalItem({ title, isShow, price }: TotalItemType) {
	return (
		<div
			className={`${cx(
				'total_assets_item',
			)} w-full lg:w-1/4 md:w-1/4 p-2`}
		>
			<div
				className={`${cx(
					'total_assets_item_title',
				)} text-center font-bold mb-2 text-white`}
			>
				{title}
			</div>
			<div
				className={`${cx(
					'total_assets_item_money',
				)} text-center text-white`}
			>
				{isShow ? formatVND(price || 0) : '*****đ'}
			</div>
		</div>
	);
}
