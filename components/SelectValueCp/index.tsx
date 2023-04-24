'use client';
import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { useAppContext } from '../../helpers';
import { setData } from '../../appState/reducer';

const cx = className.bind(styles);
type SelectValueCpType = {
	label: string;
	value: string;
	placeholder: string;
	data: any;
	nameSet: string;
	stateSelect: boolean;
	setStateSelect: any;
};
export default function SelectValueCp({
	label,
	value,
	placeholder,
	data,
	nameSet,
	stateSelect,
	setStateSelect,
}: SelectValueCpType) {
	const { dispatch } = useAppContext();
	return (
		<div className={`${cx('select_container')}`}>
			<div className={`${cx('select_label')}`}>{label}</div>
			<div
				className={`${cx('select_form_container')}`}
				onClick={() => setStateSelect(!stateSelect)}
			>
				<div className={`${cx('select_form_value')}`}>
					{value ? value : placeholder}
				</div>
				<div className={`${cx('select_form_icon')}`}>
					<i className="bx bx-chevron-down"></i>
				</div>
				{stateSelect && (
					<div className={`${cx('select_list')}`}>
						{data.map((item: any, index: number) => {
							return (
								<div
									key={index}
									className={`${cx('select_list_item')}`}
									onClick={() => {
										dispatch(
											setData({
												[nameSet]: item,
											}),
										);
										setStateSelect(false);
									}}
								>
									{item?.name +
										(item?.accountName
											? ` - ${item?.accountName} - ${item?.accountNumber}`
											: '')}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
