import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';

const cx = className.bind(styles);

type ContentOneType = {
	textVerticle?: string;
	title?: any;
	desc?: any;
	btnText?: string;
	urlImage?: any;
	children?: React.ReactNode;
};

export default function ContentOne({
	textVerticle,
	title,
	desc = [],
	urlImage,
	children,
}: ContentOneType) {
	return (
		<div className={`${cx('content-container')}`} data-aos="fade-down">
			<div className={`${cx('content-left')}`}>
				<div className={`${cx('left')}`}>{textVerticle}</div>
				<div className={`${cx('middle')}`}>
					<div className={`${cx('middle_title')} mb12`}>
						<div
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
			<div className={`${cx('content-right')}`}>
				<div
					className={`${cx('right_img')}`}
					style={{
						backgroundImage: `url('${urlImage}')`,
					}}
				></div>
			</div>
		</div>
	);
}
