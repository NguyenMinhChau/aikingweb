import { actions } from '../app/';
import { Likes } from '../firebase';
import routers from '../routers/routers';
import {
	adminDelete,
	adminGet,
	adminPost,
	adminPut,
} from '../utils/Axios/axiosInstance';

// CONTENT FORUM
export const getAllForumContentSV = async (props = {}) => {
	const { token, setSnackbar, dispatch, state } = props;
	try {
		const resGet = await adminGet(
			'forum',
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		const resGetUser = await adminGet(
			`user`,
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataForumContent: resGet?.metadata,
					dataUser: resGetUser?.metadata,
				},
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const getForumByIdSV = async (props = {}) => {
	const { id_post, setSnackbar, dispatch, state, token } = props;
	try {
		const resGet = await adminGet(
			`forum/${id_post}`,
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		dispatch(
			actions.setData({
				editor: {
					title: resGet?.metadata?.namePost,
					subTitle: resGet?.metadata?.description,
					topic: { name: resGet?.metadata?.type },
				},
				edit: {
					...state.set.edit,
					itemData: resGet?.metadata,
				},
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const addForumContentSV = async (props = {}) => {
	const {
		id_user,
		setSnackbar,
		dispatch,
		state,
		token,
		title,
		desc,
		content,
		thumbnail,
		type,
		history,
		setIsProcess,
		editorForumRef,
	} = props;
	try {
		const resPost = await adminPost(
			`forum/${id_user}`,
			{
				namePost: title,
				description: desc,
				content: content,
				thumbnail: thumbnail,
				type: type || 'TUYEN_DUNG',
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		Likes.doc(resPost?.metadata?._id)
			.get()
			.then((doc) => {
				Likes.doc(resPost?.metadata?._id).set({
					idPost: resPost?.metadata?._id,
					likes: [],
				});
			});
		setIsProcess(false);
		editorForumRef.current.setContent('');
		dispatch(
			actions.setData({
				editor: { title: '', subTitle: '', topic: '' },
			}),
		);
		alert(resPost?.message || 'Thêm thành công!');
		history(routers.content);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Thêm thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const deleteForumContentSV = async (props = {}) => {
	const { id_post, setSnackbar, dispatch, state, token, setIsProcess } =
		props;
	try {
		const resDel = await adminDelete(
			`forum/${id_post}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const resGet = await adminGet(
			'forum',
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		const resGetUser = await adminGet(
			`user`,
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		await Likes.doc(id_post).delete();
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataForumContent: resGet?.metadata,
					dataUser: resGetUser?.metadata,
				},
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resDel?.message || 'Xóa thành công!',
		});
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const updateForumContentSV = async (props = {}) => {
	const {
		id_post,
		setSnackbar,
		dispatch,
		state,
		setIsProcess,
		token,
		title,
		desc,
		content,
		thumbnail,
		type,
		history,
	} = props;
	try {
		const resPut = await adminPut(
			`forum/${id_post}`,
			{
				namePost: title,
				description: desc,
				content: content,
				thumbnail: thumbnail,
				type: type || 'TUYEN_DUNG',
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		setIsProcess(false);
		alert(resPut?.message || 'Cập nhật thành công!');
		history(routers.content);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. Vui lòng tải lên ảnh có kích thước tối đa 1080x1080 ${err?.response?.data?.message}`,
		});
	}
};
// CONTENT DEVELOPER
export const getAllDeveloperContentSV = async (props = {}) => {
	const { token, setSnackbar, dispatch, state } = props;
	try {
		const resGet = await adminGet(
			'developer',
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		const resGetUser = await adminGet(
			`user`,
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataDeveloperContent: resGet?.metadata,
					dataUser: resGetUser?.metadata,
				},
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const getDeveloperByIdSV = async (props = {}) => {
	const { id_post, setSnackbar, dispatch, state, token } = props;
	try {
		const resGet = await adminGet(
			`developer/${id_post}`,
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		dispatch(
			actions.setData({
				editor: {
					title: resGet?.metadata?.namePost,
					subTitle: resGet?.metadata?.description,
					topic: { name: resGet?.metadata?.type },
				},
				edit: {
					...state.set.edit,
					itemData: resGet?.metadata,
				},
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const addDeveloperContentSV = async (props = {}) => {
	const {
		id_user,
		setSnackbar,
		dispatch,
		state,
		token,
		title,
		desc,
		content,
		thumbnail,
		type,
		history,
		setIsProcess,
		editorDeveloperRef,
	} = props;
	try {
		const resPost = await adminPost(
			`developer/${id_user}`,
			{
				namePost: title,
				description: desc,
				content: content,
				thumbnail: thumbnail,
				type: type || 'TUYEN_DUNG',
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		Likes.doc(resPost?.metadata?._id)
			.get()
			.then((doc) => {
				Likes.doc(resPost?.metadata?._id).set({
					idPost: resPost?.metadata?._id,
					likes: [],
				});
			});
		setIsProcess(false);
		editorDeveloperRef.current.setContent('');
		dispatch(
			actions.setData({
				editor: { title: '', subTitle: '', topic: '' },
			}),
		);
		alert(resPost?.message || 'Thêm thành công!');
		history(routers.content);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Thêm thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const deleteDeveloperContentSV = async (props = {}) => {
	const { id_post, setSnackbar, dispatch, state, token, setIsProcess } =
		props;
	try {
		const resDel = await adminDelete(
			`developer/${id_post}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const resGet = await adminGet(
			'forum',
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		const resGetUser = await adminGet(
			`user`,
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		await Likes.doc(id_post).delete();
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataDeveloperContent: resGet?.metadata,
					dataUser: resGetUser?.metadata,
				},
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resDel?.message || 'Xóa thành công!',
		});
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const updateDeveloperContentSV = async (props = {}) => {
	const {
		id_post,
		setSnackbar,
		dispatch,
		state,
		setIsProcess,
		token,
		title,
		desc,
		content,
		thumbnail,
		type,
		history,
	} = props;
	try {
		const resPut = await adminPut(
			`developer/${id_post}`,
			{
				namePost: title,
				description: desc,
				content: content,
				thumbnail: thumbnail,
				type: type || 'TUYEN_DUNG',
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		setIsProcess(false);
		alert(resPut?.message || 'Cập nhật thành công!');
		history(routers.content);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. Vui lòng tải lên ảnh có kích thước tối đa 1080x1080 ${err?.response?.data?.message}`,
		});
	}
};
