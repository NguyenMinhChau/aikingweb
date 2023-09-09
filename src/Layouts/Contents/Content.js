/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Content.module.css';
import HomeContent from '../HomeContent/HomeContent';
import IntroduceContent from '../IntroduceContent/IntroduceContent';
import FinanceReportContent from '../FinanceReportContent/FinanceReportContent';
import TrainingContent from '../TrainingContent/TrainingContent';
import WebContent from '../WebContent/WebContent';
import ServiceSoftwareContent from '../ServiceSoftwareContent/ServiceSoftwareContent';
import RecuiterContent from '../RecuiterContent/RecuiterContent';
import ContactContent from '../ContactContent/ContactContent';
import ForumContent from '../ForumContent/ForumContent';
import DeveloperContent from '../DeveloperContent/DeveloperContent';

const cx = className.bind(styles);
const LIST_CONTENTS = [
	// {
	// 	id: 1,
	// 	name: 'Trang chủ',
	// 	component: <HomeContent />,
	// },
	// {
	// 	id: 2,
	// 	name: 'Giới thiệu',
	// 	component: <IntroduceContent />,
	// },
	// {
	// 	id: 3,
	// 	name: 'Báo cáo tài chính',
	// 	component: <FinanceReportContent />,
	// },
	// {
	// 	id: 4,
	// 	name: 'Đào tạo',
	// 	component: <TrainingContent />,
	// },
	// {
	// 	id: 5,
	// 	name: 'Web',
	// 	component: <WebContent />,
	// },
	// {
	// 	id: 6,
	// 	name: 'Dịch vụ phần mềm',
	// 	component: <ServiceSoftwareContent />,
	// },
	// {
	// 	id: 7,
	// 	name: 'Tuyển dụng',
	// 	component: <RecuiterContent />,
	// },
	// {
	// 	id: 8,
	// 	name: 'Liên hệ',
	// 	component: <ContactContent />,
	// },
	{
		id: 1,
		name: 'Tin tức',
		component: <ForumContent />,
	},
	{
		id: 2,
		name: 'Lập trình',
		component: <DeveloperContent />,
	},
];

function Content() {
	const [tab, setTab] = useState(1);
	const handleChangeInput = (id) => {
		setTab(id);
	};
	useEffect(() => {
		document.title = `Bài đăng | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('conatiner')}`}>
			<p className={`${cx('header_title')}`}>Chọn trang:</p>
			<div className={`${cx('container_list_choosen')}`}>
				{LIST_CONTENTS.map((item) => {
					return (
						<div className={`${cx('item_choosen')}`} key={item.id}>
							<input
								type="radio"
								value={item.id}
								id={item.id}
								name="page"
								checked={tab === item?.id}
								onChange={() => handleChangeInput(item?.id)}
							/>
							<label htmlFor={item.id}>{item.name}</label>
						</div>
					);
				})}
			</div>
			<div className={`${cx('container_contents')}`}>
				{LIST_CONTENTS.find((item) => item.id === tab)?.component}
			</div>
		</div>
	);
}

export default Content;
