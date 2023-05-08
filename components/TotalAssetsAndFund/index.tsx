import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';

const cx = className.bind(styles);
type TotalAssetsAndFundType = {
	toogleIsShow?: any;
	isShow?: boolean;
	children?: React.ReactNode;
};
export default function TotalAssetsAndFund({
	children,
}: TotalAssetsAndFundType) {
	return (
		<div className={`${cx('total_assets_container')} w-full`}>
			<div
				className={`${cx(
					'total_assets_list',
				)} w-full flex flex-col flex-wrap justify-center lg:justify-center lg:flex-row lg:flex-nowrap md:flex-row md:flex-nowrap md:justify-center`}
			>
				{children}
			</div>
		</div>
	);
}
