'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import { Breadcrumb } from '../../../../../components';
import ManagerFundUSDPage from './managerFundUSD';
import ManagerFundAgricuturalPage from './managerFundAgricutural';
import { useAppContext } from '../../../../../helpers';

const cx = classNames.bind(styles);
const LIST_TABS = [
	{
		id: 1,
		title: 'Quỹ đầu tư USD',
		component: ManagerFundUSDPage,
	},
	{
		id: 2,
		title: 'Quỹ phát triển nông nghiệp',
		component: ManagerFundAgricuturalPage,
	},
];
function ManagerFundPage() {
	const { state, dispatch } = useAppContext();
	const { currentUser, dataContracts, dataAssets } = state.set;
	console.log(state);
	const [isShow, setIsShow] = useState(false);
	const [idTab, setIdTab] = useState(1);
	return (
		<>
			<Breadcrumb pageName="Quản lý quỹ" description="Quản lý quỹ" />
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
										data={dataContracts}
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

export default ManagerFundPage;
