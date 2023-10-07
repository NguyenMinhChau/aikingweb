import React from 'react';
import className from 'classnames/bind';
import styles from './InfoCompany.module.css';
import { Button, FormInput, Modal } from '../../components';
import Skeleton from 'react-loading-skeleton';
import { useAppContext } from '../../utils';
import { setData } from '../../app/reducer';

const cx = className.bind(styles);

function ItemRender({ title, info }) {
	return (
		<div className={`${cx('detail-item')}`}>
			<div className={`${cx('detail-title')}`}>{title}</div>
			<div className={`${cx('detail-status')}`}>
				<span className={`${cx('info')}`}>
					{info || info === 0 ? info : <Skeleton width={30} />}
				</span>
			</div>
		</div>
	);
}

export default function InfoCompany() {
	const { state, dispatch } = useAppContext();
	const { phone, address } = state.set.form;
	const [openD, setOpenD] = React.useState(false);
	const [isSubmit, setIsSubmit] = React.useState(false);
	const handleChange = (key, val) => {
		dispatch(
			setData({
				form: {
					...state.set.form,
					[key]: val,
				},
			}),
		);
	};
	const handleUpdate = (e) => {
		e.stopPropagation();
		setIsSubmit(true);
		setTimeout(() => {
			setOpenD(false);
			setIsSubmit(false);
			console.log(phone, address);
			dispatch(
				setData({
					form: {
						phone: '',
						address: '',
					},
				}),
			);
		}, 3000);
	};
	return (
		<div>
			<Button
				onClick={(e) => {
					e.stopPropagation();
					setOpenD(true);
				}}
				className={`${cx('btn')}`}
			>
				Chỉnh sửa
			</Button>
			<div className={`${cx('container-info')} flex flex-col gap-2 mt-4`}>
				<ItemRender title="Số điện thoại" info=" 0345.335.422" />
				<ItemRender
					title="Địa chỉ"
					info="4.70 Tầng 4, Tòa nhà RiverGate, Số 151_155 Bến Vân Đồn, Phường 06, Quận 4, Thành phố Hồ Chí Minh, Việt Nam"
				/>
			</div>
			{openD && (
				<Modal
					openModal={(e) => {
						e.stopPropagation();
						setOpenD(true);
					}}
					closeModal={(e) => {
						e.stopPropagation();
						setOpenD(false);
					}}
					onClick={handleUpdate}
					titleHeader="Cập nhật"
					actionButtonText="Cập nhật"
					classNameButton="onholdbgc"
					disabled={isSubmit || !phone || !address}
					isProcess={isSubmit}
				>
					<FormInput
						name="phone"
						value={phone}
						onChange={(e) => handleChange('phone', e.target.value)}
						placeholder="Nhập số điện thoại"
						label="Số điện thoại"
					/>
					<FormInput
						name="address"
						value={address}
						onChange={(e) =>
							handleChange('address', e.target.value)
						}
						placeholder="Nhập địa chỉ"
						label="Địa chỉ"
					/>
				</Modal>
			)}
		</div>
	);
}
