/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import className from 'classnames/bind';
import styles from './DeveloperContent.module.css';
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
import DataDeveloperContentHeader from '../../utils/FakeData/DeveloperContentHeader';
import LOGO_COMPANY from '../../assets/images/logo_company.png';
import moment from 'moment';
import // getAllDeveloperContentSV,
// deleteDeveloperContentSV,
'../../services/admin';
import { getFirstXLines } from '../../utils/getStringHTML';

const cx = className.bind(styles);

function DeveloperContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		searchValues: { DeveloperContent },
		pagination: { page, show },
		data: { dataUser, dataDeveloperContent },
	} = state.set;
	const { modalDelete } = state.toggle;
	const [isProcess, setIsProcess] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const getAllDeveloperSV = (dataToken) => {
		// getAllDeveloperContentSV({
		// 	token: dataToken?.token,
		// 	setSnackbar,
		// 	dispatch,
		// 	state,
		// });
	};
	useEffect(() => {
		// getAllDeveloperSV();
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
	let dataDeveloperContentFlag = dataDeveloperContent || [];
	if (DeveloperContent) {
		dataDeveloperContentFlag = dataDeveloperContent.filter((x) => {
			return x?.type
				?.toLowerCase()
				?.includes(DeveloperContent?.toLowerCase());
		});
	}
	const modalDeleteTrue = (e, id) => {
		return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
	};
	const modalDeleteFalse = (e) => {
		return deleteUtils.deleteFalse(e, dispatch, state, actions);
	};
	const handleViewDeveloperContent = (item) => {
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
									linkView={`${routers.content}/${routers.updatedevelopercontent}/${item?._id}`}
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
										handleViewDeveloperContent(item)
									}
								></ActionsTable>
							</td>
						</tr>
					);
				})}
			</>
		);
	};
	const deleteDeveloperContent = (dataToken, id) => {
		// deleteDeveloperContentSV({
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
		// 	deleteDeveloperContent,
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
				className={cx('DeveloperContent')}
				valueSearch={DeveloperContent}
				nameSearch="DeveloperContent"
				textBtnNew="Tạo mới"
				linkCreate={`${routers.content}/${routers.createdevelopercontent}`}
				classNameButton={'probgc'}
				dataHeaders={DataDeveloperContentHeader(Icons).headers}
				totalData={dataDeveloperContentFlag?.length}
				dataPagiCus={dataDeveloperContentFlag}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
			>
				<RenderBodyTable data={dataDeveloperContentFlag} />
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

export default DeveloperContent;
