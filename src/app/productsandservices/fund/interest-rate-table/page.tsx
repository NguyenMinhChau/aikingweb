'use client';
import React, { useState } from 'react';
import InterestRateUSD from './usd';
import InterestRateAgricutural from './agricutural';
import styles from './styles.module.css';
import { Breadcrumb } from '../../../../components';
const LIST_TABS = [
	{
		id: 1,
		title: 'Quỹ đầu tư USD',
		component: InterestRateUSD,
	},
	{
		id: 2,
		title: 'Quỹ phát triển nông nghiệp',
		component: InterestRateAgricutural,
	},
];
function InterestRateTablePage() {
	const [idTab, setIdTab] = useState(1);
	return (
		<>
			<Breadcrumb pageName="Quỹ tham khảo" description="Quỹ tham khảo" />
			<div className="container">
				<div className={`${styles.table_interest_container}`}>
					<div className={`${styles.table_interest_list}`}>
						{LIST_TABS.map((item, index) => (
							<div
								className={`${styles.table_interest_item} ${
									idTab === item?.id ? styles.active : ''
								}`}
								key={index}
								onClick={() => setIdTab(item?.id)}
							>
								<div
									className={`${styles.table_interest_item_title}`}
								>
									{item.title}
								</div>
							</div>
						))}
					</div>
					<div className={`${styles.body_components}`}>
						{LIST_TABS.map((item, index) => {
							if (item?.id === idTab) {
								const Component = item?.component;
								return <Component key={index} />;
							}
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default InterestRateTablePage;
