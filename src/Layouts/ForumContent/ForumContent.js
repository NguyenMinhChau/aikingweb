/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import className from 'classnames/bind';
import styles from './ForumContent.module.css';
import { actions } from '../../app/';
import {
	deleteUtils,
	handleUtils,
	localStoreUtils,
	useAppContext,
	requestRefreshToken,
} from '../../utils';
import { ActionsTable, Icons, Modal, SnackbarCp } from '../../components';
import routers from '../../routers/routers';
import { getStore } from '../../utils/localStore/localStore';
import General from '../General/General';
import DataForumContentHeader from '../../utils/FakeData/ForumContentHeader';
import LOGO_COMPANY from '../../assets/images/logo_company.png';
import moment from 'moment';
import // getAllForumContentSV,
// deleteForumContentSV,
'../../services/content';
import { getFirstXLines } from '../../utils/getStringHTML';

const cx = className.bind(styles);

function ForumContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		searchValues: { forumContent },
		pagination: { page, show },
		data: { dataUser, dataForumContent },
	} = state.set;
	const { modalDelete } = state.toggle;
	const [isProcess, setIsProcess] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const getAllForumSV = (dataToken) => {
		// getAllForumContentSV({
		// 	token: dataToken?.token,
		// 	setSnackbar,
		// 	dispatch,
		// 	state,
		// });
	};
	useEffect(() => {
		// getAllForumSV();
	}, []);
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const URL = process.env.REACT_APP_URL_IMAGE;
	let showPage = 10;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	let dataForumContentFlag = dataForumContent || [];
	if (forumContent) {
		dataForumContentFlag = dataForumContent.filter((x) => {
			return x?.type
				?.toLowerCase()
				?.includes(forumContent?.toLowerCase());
		});
	}
	const modalDeleteTrue = (e, id) => {
		return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
	};
	const modalDeleteFalse = (e) => {
		return deleteUtils.deleteFalse(e, dispatch, state, actions);
	};
	const handleViewForumContent = (item) => {
		dispatch(
			actions.setData({
				edit: {
					...state.set.edit,
					id: item._id || item.id,
					itemData: item,
				},
			}),
		);
	};
	const RenderBodyTable = ({ data }) => {
		return (
			<>
				{data.map((item, index) => {
					const username = dataUser?.filter((x) => {
						return item?.idUser === x?._id;
					})[0]?.username;
					let count = (item?.content?.match(/(\n|<br>)/g) || [])
						.length;
					let content = '';
					if (count > 3) {
						content = getFirstXLines(item?.content, 3) + '...';
					} else {
						content = item?.content;
					}
					return (
						<tr key={index}>
							<td>{handleUtils.indexTable(page, show, index)}</td>
							<td>{username}</td>
							<td className="item-w200">
								<div
									className={`${cx('content')}`}
									dangerouslySetInnerHTML={{
										__html: content,
									}}
								></div>
							</td>
							<td className="item-w150">
								<img
									src={`${URL}${item?.thumbnail}`}
									alt=""
									onError={(e) =>
										(e.target.src = LOGO_COMPANY)
									}
									className={`${cx('thumbnail')}`}
								/>
							</td>
							<td className="item-w150">
								{moment(item?.createdAt).format(
									'DD/MM/YYYY HH:mm:ss',
								)}
							</td>
							<td>{item?.type}</td>
							<td>
								<ActionsTable
									view
									linkView={`${routers.content}/${routers.updateforumcontent}/${item?._id}`}
									onClickDel={async (e) => {
										modalDeleteTrue(e, item?._id);
										await localStoreUtils.setStore({
											...currentUser,
											idUpdate: item?._id,
										});
										await dispatch(
											actions.setData({
												currentUser: getStore(),
											}),
										);
									}}
									onClickView={() =>
										handleViewForumContent(item)
									}
								></ActionsTable>
							</td>
						</tr>
					);
				})}
			</>
		);
	};
	const deleteForumContent = (dataToken, id) => {
		// deleteForumContentSV({
		// 	id_post: id,
		// 	setSnackbar,
		// 	dispatch,
		// 	state,
		// 	token: dataToken?.token,
		// 	setIsProcess,
		// });
	};
	const deleteRecuiterContent = (id) => {
		// requestRefreshToken(
		// 	currentUser,
		// 	deleteForumContent,
		// 	state,
		// 	dispatch,
		// 	actions,
		// 	id,
		// );
	};
	return (
		<div className={`${cx('container')}`}>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<General
				className={cx('forumContent')}
				valueSearch={forumContent}
				nameSearch="forumContent"
				textBtnNew="Tạo mới"
				linkCreate={`${routers.content}/${routers.createforumcontent}`}
				classNameButton={'probgc'}
				dataHeaders={DataForumContentHeader(Icons).headers}
				totalData={dataForumContentFlag?.length}
				dataPagiCus={dataForumContentFlag}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
			>
				<RenderBodyTable data={dataForumContentFlag} />
			</General>
			{modalDelete && (
				<Modal
					titleHeader="Xác nhận xóa nội dung"
					actionButtonText="Xóa"
					openModal={modalDeleteTrue}
					closeModal={modalDeleteFalse}
					classNameButton="cancelbgc"
					onClick={() => deleteRecuiterContent(currentUser?.idUpdate)}
					isProcess={isProcess}
				>
					<p className="modal-delete-desc">
						Bạn có chắc muốn xóa nội dung này [
						{currentUser?.idUpdate}]?
					</p>
				</Modal>
			)}
		</div>
	);
}

export default ForumContent;
