/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';
import { useAppContext } from '../../utils';
import { actions } from '../../app/';
import routers from '../../routers/routers';
import { Icons } from '../../components';
import styles from './Sidebar.module.css';

const cx = className.bind(styles);
const LIST_SIDEBAR = [
	{
		name: 'Dashboard',
		path: routers.dashboard,
		icon: <Icons.DashboardIcon className={`${cx('custom-icon')}`} />,
	},
	{
		name: 'Nạp tiền',
		path: routers.deposits,
		icon: <Icons.DepositsIcon className={`${cx('custom-icon')}`} />,
	},
	{
		name: 'Rút tiền',
		path: routers.withdraw,
		icon: <Icons.WithdrawIcon className={`${cx('custom-icon')}`} />,
	},
	{
		name: 'Hợp đồng USD',
		path: routers.contractUsd,
		icon: <Icons.ContratUsdIcon className={`${cx('custom-icon')}`} />,
	},
	{
		name: 'Hợp đồng nông nghiệp',
		path: routers.contractAgriculture,
		icon: <Icons.ContratAgriIcon className={`${cx('custom-icon')}`} />,
	},
	{
		name: 'Tài khoản',
		path: routers.user,
		icon: <Icons.UserIcon className={`${cx('custom-icon')}`} />,
	},
	{
		name: 'Bài đăng',
		path: routers.content,
		icon: <Icons.ContentIcon className={`${cx('custom-icon')}`} />,
	},
	{
		name: 'Thông tin công ty',
		path: routers.infoCompany,
		icon: <Icons.InfoIcon className={`${cx('custom-icon')}`} />,
	},
];
const LIST_SIDEBAR_USER = [];

function Sidebar({ className }) {
	const { state, dispatch } = useAppContext();
	const { currentUser } = state.set;
	const { openMenuMobile } = state.toggle;
	const classed = cx(
		'sidebar-container',
		openMenuMobile ? 'open' : 'close',
		className,
	);
	const handleBlacklistUser = () => {
		dispatch(
			actions.setData({
				...state.set,
				datas: {
					...state.set.datas,
					dataBlacklistUser: [],
				},
				pagination: {
					page: 1,
					show: 10,
				},
			}),
		);
		dispatch(
			actions.toggleModal({
				openMenuMobile: false,
			}),
		);
	};
	return (
		<div className={classed}>
			{LIST_SIDEBAR.map((item, index) => (
				<NavLink
					onClick={handleBlacklistUser}
					to={item.path}
					className={(nav) =>
						cx('menu-item', {
							active: nav.isActive,
						})
					}
					key={index}
				>
					{item.icon}
					<span className={cx('title')}>{item.name}</span>
				</NavLink>
			))}
		</div>
	);
}
Sidebar.propTypes = {
	className: PropTypes.string,
};
export default Sidebar;
