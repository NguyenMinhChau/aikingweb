/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './ServiceSoftwareContent.module.css';
import { useAppContext } from '../../utils';
import {
	Button,
	EditorTiny,
	FormInput,
	MultipleUpload,
	SelectValue,
	SingleUpload,
	SnackbarCp,
} from '../../components';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import DataTopicContent from '../../utils/FakeData/TopicContent';

const cx = className.bind(styles);

function CreateServiceContent() {
	const { state, dispatch } = useAppContext();
	const {
		multipleFile,
		singleFile,
		editor: { title, subTitle, topic },
		searchValues: { topicSearch },
	} = state.set;
	const { idServiceContent } = useParams();
	const editorServiceRef = useRef(null);
	const [isProcess, setIsProcess] = useState(false);
	const [toggleSelectTopic, setToggleSelectTopic] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const handleToogleSelectTopic = () => {
		setToggleSelectTopic(!toggleSelectTopic);
	};
	useEffect(() => {
		document.title = `Bài đăng dịch vụ phần mềm | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	useEffect(() => {
		dispatch(
			actions.setData({
				multipleFiles: [],
				singleFile: [],
				editor: { title: '', subTitle: '', topic: '' },
				searchValues: { topicSearch: '' },
			}),
		);
	}, [dispatch]);
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		dispatch(
			actions.setData({
				editor: {
					...state.set.editor,
					[name]: value,
				},
			}),
		);
	};
	const handleChangeSearchSelect = (e) => {
		const { name, value } = e.target;
		dispatch(
			actions.setData({
				searchValues: {
					...state.set.searchValues,
					[name]: value,
				},
			}),
		);
	};
	const handleClickSelect = (item) => {
		dispatch(
			actions.setData({
				editor: {
					...state.set.editor,
					topic: item,
				},
			}),
		);
		setToggleSelectTopic(false);
	};
	const handleCreateContent = () => {
		console.log(
			singleFile,
			title,
			subTitle,
			topic,
			multipleFile,
			editorServiceRef?.current?.getContent(),
		);
	};
	// <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
	return (
		<div className={`${cx('container')}`}>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<p className={`${cx('header_title')}`}>Nội dung</p>
			<FormInput
				type="text"
				placeholder="Nhập tiêu đề..."
				name="title"
				onChange={handleChangeInput}
			/>
			<FormInput
				type="text"
				placeholder="Nhập tiêu đề phụ..."
				name="subTitle"
				onChange={handleChangeInput}
			/>
			<SelectValue
				placeholder="Chọn chủ đề..."
				nameSearch="topicSearch"
				toggleModal={handleToogleSelectTopic}
				stateModal={toggleSelectTopic}
				valueSelect={topic?.name}
				onChangeSearch={handleChangeSearchSelect}
				dataFlag={DataTopicContent.filter((x) =>
					x?.name?.includes(topicSearch),
				)}
				onClick={handleClickSelect}
			/>
			<EditorTiny
				textInitial="Nội dung trang dịch vụ phần mềm..."
				ref={editorServiceRef}
				value=""
			/>
			<p className={`${cx('header_title')}`}>Tải một hình ảnh</p>
			<div className={`${cx('single_upload_container')}`}>
				<SingleUpload width={'100%'} />
			</div>
			<p className={`${cx('header_title')}`}>Tải nhiều hình ảnh</p>
			<div className={`${cx('multiple_upload_container')}`}>
				<MultipleUpload width={'100%'} />
			</div>
			<div className={`${cx('button_container')}`}>
				<Button
					className="cancelbgc text-center"
					to={`${routers.content}`}
				>
					Hủy bỏ
				</Button>
				<Button
					className="probgc text-center"
					isProcess={isProcess}
					onClick={handleCreateContent}
					disabled={
						isProcess ||
						!editorServiceRef?.current?.getContent() ||
						singleFile.length === 0 ||
						multipleFile.length === 0
					}
				>
					Gửi
				</Button>
			</div>
		</div>
	);
}

export default CreateServiceContent;
