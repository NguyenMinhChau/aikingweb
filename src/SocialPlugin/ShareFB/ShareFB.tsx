import React from 'react';
import className from 'classnames/bind';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import styles from './ShareFB.module.css';

const cx = className.bind(styles);

function ShareFB({
	slug,
	name,
	desc,
	page,
}: {
	slug: string;
	name: string;
	desc: string;
	page: string;
}) {
	return (
		<div className={`${cx('share-linkedln')} w-full px-3`}>
			<FacebookShareButton
				title={name}
				url={`https://aiking.com.vn/${page}/${slug}`}
				className="flex-start w-full flex-row flex"
			>
				<FacebookIcon
					style={{
						height: '25px',
						width: '25px',
						borderRadius: '50%',
					}}
				/>
				<p
					className={`${cx('name_social_share')}`}
					style={{ marginLeft: '10px' }}
				>
					Facebook
				</p>
			</FacebookShareButton>
		</div>
	);
}

export default ShareFB;
