'use client';
import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppContext } from '../../helpers';
import { setData } from '../../appState/reducer';

const cx = className.bind(styles);
type SelectDateCpType = {
	label: string;
	value: any;
	nameSet: string;
};

export default function SelectDateCp({
	label,
	value,
	nameSet,
}: SelectDateCpType) {
	const { dispatch } = useAppContext();

	return (
		<div className={`${cx('select_container')}`}>
			<div className={`${cx('select_label')}`}>{label}</div>
			<div className={`${cx('select')}`}>
				<DatePicker
					selected={value ? value : new Date()}
					onChange={(date: any) =>
						dispatch(
							setData({
								[nameSet]: date,
							}),
						)
					}
					dateFormat="dd/MM/yyyy"
					minDate={new Date()}
					showDisabledMonthNavigation
					showWeekNumbers
					showPopperArrow={false}
					className={`${cx('date')}`}
				/>
			</div>
		</div>
	);
}
