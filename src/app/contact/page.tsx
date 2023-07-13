'use client';
import Link from 'next/link';
import { TextareaAutosize } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import { Breadcrumb, Button, FormInput } from '../../../components';

const cx = classNames.bind(styles);

const ContactPage = () => {
	return (
		<>
			<Breadcrumb pageName="Liên hệ" description="Liên hệ" />
			<div className="container">
				<div className="my-3">
					<div className={`${cx('container_content')}`}>
						<h1 className={`${cx('title_form')}`}>
							Liên hệ tư vấn đầu tư
						</h1>
						<div className={`${cx('form_container')}`}>
							<FormInput
								placeholder="Nhập họ và tên..."
								name="username"
								classNameInput={`${cx('input_custom')}`}
							/>
							<FormInput
								placeholder="Nhập số điện thoại..."
								name="phone"
								classNameInput={`${cx('input_custom')}`}
							/>

							<FormInput
								placeholder="Nhập email..."
								name="email"
								classNameInput={`${cx('input_custom')}`}
							/>
							<TextareaAutosize
								minRows={5}
								maxRows={8}
								placeholder="Nội dung liên hệ?"
								// value={content}
								// onChange={handleChangeTextAreae}
								name="content"
								className={`${cx('textarea')}`}
							/>
							<Button className={`${cx('btn')} confirmbgc`}>
								Liên hệ
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactPage;
