import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';

const cx = className.bind(styles);

type ContentTwoType = {
	titleHeader?: string;
	title?: any;
	desc?: any;
	urlImage?: any;
	fontSizeTitle?: string;
	children?: React.ReactNode;
};

export default function ContentTwo({
	titleHeader,
	title,
	desc = [],
	urlImage,
	children,
	fontSizeTitle,
}: ContentTwoType) {
	return (
		<div className={`${cx('content-container')}`} data-aos="fade-right">
			<div className={`${cx('content-left')}`}>
				<div
					className={`${cx('left_img')}`}
					style={{
						backgroundImage: `url('${urlImage}')`,
					}}
				></div>
			</div>
			<div className={`${cx('content-right-container')}`}>
				{titleHeader && (
					<div className={`${cx('title-header')} mb12`}>
						{titleHeader}
					</div>
				)}
				<div className={`${cx('content-right')}`}>
					<div className={`${cx('middle')}`}>
						<div className={`${cx('middle_title')} mb12`}>
							<div
								style={{ fontSize: fontSizeTitle }}
								className={`${cx('title')}`}
								dangerouslySetInnerHTML={{ __html: title }}
							></div>
						</div>
						<div className={`${cx('middle_desc')}`}>
							{desc.map((item: any, index: any) => (
								<div
									className={`${cx('middle_desc_text')}`}
									key={index}
									dangerouslySetInnerHTML={{ __html: item }}
								></div>
							))}
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
