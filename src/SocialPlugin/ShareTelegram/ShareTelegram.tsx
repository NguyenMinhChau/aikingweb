import React from 'react';
import className from 'classnames/bind';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import styles from './ShareTelegram.module.css';

const cx = className.bind(styles);

function ShareTelegram({
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
			<TelegramShareButton
				title={name}
				url={`https://aiking.com.vn/${page}/${slug}`}
				className="flex-start w-full flex flex-row"
			>
				<TelegramIcon
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
					Telegram
				</p>
			</TelegramShareButton>
		</div>
	);
}

export default ShareTelegram;
