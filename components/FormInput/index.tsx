'use client';
import React, { forwardRef, useState } from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { EyeIcon, EyeShowIcon } from '../../public/svgs';

const cx = className.bind(styles);
type FormInputType = {
	label?: string;
	type?: string;
	placeholder?: string;
	classNameInput?: any;
	classNameField?: any;
	value?: string;
	showPwd?: boolean;
	onChange?: (e: any) => void;
	name?: string;
	readOnly?: boolean;
	onEnter?: (e: any) => void;
	unit?: string;
	children?: React.ReactNode;
};

function FormInput(
	{
		label,
		type,
		placeholder,
		classNameInput,
		classNameField,
		value,
		showPwd,
		onChange,
		name,
		readOnly,
		onEnter,
		unit,
	}: FormInputType,
	ref: any,
) {
	const [typePwd, setTypePwd] = useState(false);
	const classedInput = cx(
		'input',
		classNameInput,
		showPwd ? 'show-pwd' : '',
		readOnly ? 'read-only' : '',
	);
	const classedField = cx('field-container', classNameField);
	const handleTypePwd = () => {
		setTypePwd(!typePwd);
	};
	return (
		<div className={classedField}>
			{label && <label className="label">{label}</label>}
			<div className={cx('relative-input')}>
				<input
					ref={ref}
					type={showPwd ? (typePwd ? 'text' : 'password') : type}
					className={classedInput}
					style={{ paddingRight: unit ? '60px' : 0 }}
					placeholder={!readOnly ? placeholder : ''}
					value={value}
					onChange={onChange}
					name={name}
					readOnly={readOnly}
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							onEnter?.(e);
						}
					}}
				/>
				{showPwd && (
					<span className={cx('icon-eye')} onClick={handleTypePwd}>
						{typePwd ? (
							<EyeIcon className={cx('icon')} />
						) : (
							<EyeShowIcon className={cx('icon')} />
						)}
					</span>
				)}
				{unit && (
					<span className={`${cx('icon-eye')} fwb`}>| {unit}</span>
				)}
			</div>
		</div>
	);
}

export default forwardRef(FormInput);
