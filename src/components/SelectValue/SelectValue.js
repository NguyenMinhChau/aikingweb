import React from 'react';
import className from 'classnames/bind';
import styles from './SelectValue.module.css';
import { Icons, Search } from '..';

const cx = className.bind(styles);

export default function SelectValue({
	label,
	nameSearch,
	toggleModal,
	stateModal,
	valueSelect,
	onChangeSearch,
	dataFlag,
	onClick,
	className,
	placeholder,
}) {
	return (
		<div className="detail-item flex-column p0">
			{label && <label className="label mr-auto">{label}</label>}
			<div className={`${cx('detail-list')}`}>
				<div className={`${cx('list-container')}`}>
					<div
						onClick={toggleModal}
						className="w100 flex-space-between"
					>
						<div className={`${cx('value')}`}>
							{valueSelect || placeholder || '---'}
						</div>
						<Icons.SelectOptionArrowIcon />
					</div>
					{stateModal && (
						<div className={`${cx('list')}`}>
							<div className={`${cx('search')}`}>
								<Search
									name={nameSearch}
									className={`${cx(
										'search-custom',
									)} w100 border0`}
									onChange={onChangeSearch}
								/>
							</div>
							{Array.isArray(dataFlag) ? (
								dataFlag.map((item, index) => (
									<div
										className={`${cx('item')}`}
										key={index}
										onClick={() => onClick(item)}
									>
										{item.name}
									</div>
								))
							) : (
								<div className="fz14 fwb text-center p8">
									No data
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
