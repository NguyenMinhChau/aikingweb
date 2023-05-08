import React from 'react';
import className from 'classnames/bind';
import { Button } from '../';
import styles from './Modal.module.css';
import { CloseIcon } from '../../public/svgs';

const cx = className.bind(styles);

type ModalType = {
	children?: React.ReactNode;
	titleHeader?: string;
	actionButtonText?: string;
	closeModal?: any;
	openModal?: any;
	classNameButton?: string;
	onClick?: any;
	onClickCancel?: any;
	isProcess?: boolean;
	isProcessCancel?: boolean;
	hideButton?: boolean;
	disabled?: boolean;
	textCancel?: string;
};

function Modal({
	children,
	titleHeader,
	actionButtonText,
	closeModal,
	openModal,
	classNameButton,
	onClick,
	isProcess,
	isProcessCancel,
	hideButton,
	disabled,
	onClickCancel,
	textCancel,
}: ModalType) {
	const classed = cx('modal-button-me', classNameButton);

	return (
		<div className={`${cx('modal-container-me')}`} onClick={closeModal}>
			<div className={`${cx('modal-content-me')}`} onClick={openModal}>
				<div className={`${cx('modal-header-me')}`}>
					<div className={`${cx('modal-text-header-me')}`}>
						{titleHeader}
					</div>
					<span
						className={`${cx('modal-icon-header-me')}`}
						onClick={closeModal}
					>
						<CloseIcon />
					</span>
				</div>
				<div className={`${cx('modal-body-me')}`}>{children}</div>
				{!hideButton && (
					<div className={`${cx('modal-footer-me')}`}>
						{textCancel && (
							<Button className="warningbgc" onClick={closeModal}>
								Đóng
							</Button>
						)}
						<Button
							className="successbgc"
							onClick={onClickCancel ? onClickCancel : closeModal}
							isProcess={isProcessCancel}
							disabled={isProcessCancel}
						>
							{textCancel ? textCancel : 'Hủy bỏ'}
						</Button>

						<Button
							className={classed}
							onClick={onClick}
							isProcess={isProcess}
							disabled={isProcess || disabled}
						>
							{actionButtonText}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
export default Modal;
