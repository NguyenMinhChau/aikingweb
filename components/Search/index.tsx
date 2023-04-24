'use client';
import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { SearchIcon } from '../../public/svgs';

const cx = className.bind(styles);
type SearchType = {
	className?: string;
	placeholder?: string;
	onChange?: (e: any) => void;
	name?: string;
	value?: string;
};
function Search({
	className,
	placeholder = 'Search',
	onChange,
	name,
	value,
}: SearchType) {
	const classed = cx('search-container', className);
	return (
		<div className={classed}>
			<div className={`${cx('search-icon')}`}>
				<SearchIcon className={`${cx('icon')}`} width="18px" />
			</div>
			<div className={`${cx('search-input')}`}>
				<input
					type="text"
					placeholder={placeholder}
					className={`${cx('input')}`}
					onChange={onChange}
					name={name}
					value={value}
				/>
			</div>
		</div>
	);
}

Search.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.node,
};

export default Search;
