'use client';
import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { Breadcrumb } from '../../../../../components';
import { useAppContext } from '../../../../../helpers';
import DepositsHistory from './deposits';
import WithdrawsHistory from './withdraw';

const cx = className.bind(styles);
const LIST_TABS = [
	{
		id: 1,
		title: 'Nạp tiền',
		component: DepositsHistory,
	},
	{
		id: 2,
		title: 'Rút tiền',
		component: WithdrawsHistory,
	},
];
export default function HistoryDepositWithdraw() {
	const { state, dispatch } = useAppContext();
	const [idTab, setIdTab] = useState(1);
	return (
		<>
			<Breadcrumb
				pageName="Lịch sử nạp/rút"
				description="Lịch sử nạp/rút"
			/>
			<div className="container">
				<div className={`${cx('table_manager_container')}`}>
					<div className={`${cx('table_manager_list')}`}>
						{LIST_TABS.map((item, index) => (
							<div
								className={`${cx(
									'table_manager_item',
									idTab === item?.id ? 'active' : '',
								)}`}
								key={index}
								onClick={() => setIdTab(item?.id)}
							>
								<div
									className={`${cx(
										'table_manager_item_title',
									)}`}
								>
									{item.title}
								</div>
							</div>
						))}
					</div>
					<div className={`${cx('body_components')}`}>
						{LIST_TABS.map((item, index) => {
							if (item?.id === idTab) {
								const Component = item?.component;
								return (
									<Component
										key={index}
										// data={}
									/>
								);
							}
						})}
					</div>
				</div>
			</div>
		</>
	);
}
