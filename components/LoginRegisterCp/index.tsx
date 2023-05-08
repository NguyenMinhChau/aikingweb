import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import Link from 'next/link';
import routers from '../../routers/routers';

const cx = className.bind(styles);

export default function LoginRegisterCp({ padding }: { padding?: string }) {
	return (
		<div className={`${cx('container')}`} style={{ padding: padding }}>
			<span>
				Bạn cần{' '}
				<Link href={routers.signin} className="font-bold warning">
					đăng nhập
				</Link>{' '}
				hoặc{' '}
				<Link href={routers.singup} className="font-bold warning">
					đăng ký
				</Link>{' '}
				để sử dụng tính năng này.
			</span>
		</div>
	);
}
