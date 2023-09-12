'use client';
import { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import Picker from 'emoji-picker-react';
import Link from 'next/link';
import {
	Breadcrumb,
	Button,
	FormInput,
	Modal,
	SkeletonCP,
} from '../../../components';
import fb, { Comments, Likes } from '../../firebase';
import { Tooltip, Stack, Pagination } from '@mui/material';
import { actions } from '../../../appState/';
import { useAppContext, useDebounce } from '../../../helpers';
import { getStore, setStore } from '../../../helpers/localStore/localStore';
import { getAllForumContentSV } from '../../../services/admin';
import { getFirstXLines } from '../../../helpers/getStringHTML';
import className from 'classnames/bind';
import styles from './News.module.css';
import routers from '../../../routers/routers';
import { ShareFB, ShareLinkedln, ShareTelegram } from '../../SocialPlugin/';
import LOGO_COMPANY from '../../assets/images/logo-company.png';
import { autoFormatNumberInputChange } from '../../../helpers/format/NumberFormat';
import Typed from 'react-typed';

const cx = className.bind(styles);

const NewsPage = () => {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		comment,
		dataForum,
		pagination: { page, show },
		searchValues: { forumSearch },
		setItem: { dataItem },
	} = state.set;
	const [modalDetail, setModalDetail] = useState(false);
	const [modalComment, setModalComment] = useState(false);
	const [openShare, setOpenShare] = useState(false);
	const [openEmoji, setOpenEmoji] = useState(false);
	const [modalDeleteComment, setModalDeleteComment] = useState(false);
	const [isProcessComment, setIsProcessComment] = useState(false);
	const [isProcessUpdateComment, setIsProcessUpdateComment] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [idUpdate, setIdUpdate] = useState<any>(null);
	const [isReplies, setIsReplies] = useState(false);
	const [idReplies, setIdReplies] = useState<any>(null);
	const [isProcessDelComment, setIsProcessDelComment] = useState(false);
	const [comments, setComments] = useState<any>([]);
	const [likes, setLikes] = useState<any>([]);
	const [idItem, setIdItem] = useState<any>(null);
	const [snackbar, setSnackbar] = useState<any>({
		open: false,
		type: '',
		message: '',
	});
	const textAreaRef = useRef<any>();
	const getAllComments = async () => {
		const snapshot = await Comments.get();
		snapshot.forEach((doc) => {
			setComments((prev: any) => [...prev, doc.data()]);
		});
	};
	const getAllLikes = async () => {
		const snapshot = await Likes.get();
		snapshot.forEach((doc) => {
			setLikes((prev: any) => [...prev, doc.data()]);
		});
	};
	const timestamp = fb.firestore.Timestamp.now();
	const uniqueComments = [
		...new Map(comments.map((item: any) => [item.id, item])).values(),
	];
	const uniqueLikes = [
		...new Map(likes.map((item: any) => [item.idPost, item])).values(),
	];
	const handleCloseSnackbar = (event: any, reason: any) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const closeModalDetail = (e: any) => {
		e.stopPropagation();
		setModalDetail(false);
	};
	const openModalDetail = (e: any, item: any) => {
		e.stopPropagation();
		setModalDetail(true);
		dispatch(
			actions.setData({
				setItem: {
					idItem: item,
					dataItem: item,
				},
			}),
		);
	};
	const closeModalComment = (e: any) => {
		e.stopPropagation();
		setModalComment(false);
		setIsUpdate(false);
		setIsReplies(false);
		dispatch(actions.setData({ comment: '' }));
	};
	const openModalComment = (e: any) => {
		e.stopPropagation();
		if (!currentUser) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn phải đăng nhập để bình luận',
			});
		} else {
			setModalComment(true);
		}
	};
	const openModalDeleteComment = async (e: any, idDelete: any) => {
		e.stopPropagation();
		setModalDeleteComment(true);
		await setStore({
			...currentUser,
			idData: idDelete,
		});
		await dispatch(
			actions.setData({
				currentUser: getStore(),
			}),
		);
	};
	const closeModalDeleteComment = (e: any) => {
		e.stopPropagation();
		setModalDeleteComment(false);
	};
	const toggleShare = (id: any) => {
		setIdItem(id);
		setOpenShare(!openShare);
	};
	const toggleEmoji = () => {
		setOpenEmoji(!openEmoji);
	};
	const getAllForumSV = () => {
		// getAllForumContentSV({
		// 	setSnackbar,
		// 	dispatch,
		// 	state,
		// });
	};
	useEffect(() => {
		getAllForumSV();
		getAllComments();
		getAllLikes();
	}, []);
	let showPage = 5;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	let DATA_FORUM = dataForum;
	let DATA_FORUMS_FLAG = DATA_FORUM?.filter((row: any, index: any) => {
		if (index + 1 >= start && index + 1 <= end) return true;
	});
	const DATA_COMMENT = uniqueComments || [];
	const getCommentParent = () => {
		return DATA_COMMENT.filter((row: any) => {
			return row.parentId === null && row.idPost === currentUser?.idPost;
		});
	};
	const getCommentChild = (idParent: any) => {
		return DATA_COMMENT.filter((row: any) => {
			return row.parentId === idParent;
		});
	};
	const forumSearchDebounce = useDebounce(forumSearch, 300);
	if (forumSearchDebounce) {
		DATA_FORUMS_FLAG = DATA_FORUM?.filter((row: any, index: any) => {
			return (
				row?.namePost
					?.toLowerCase()
					.includes(forumSearchDebounce.toLowerCase()) ||
				row?.description
					?.toLowerCase()
					.includes(forumSearchDebounce.toLowerCase()) ||
				moment(row?.createdAt)
					.format('DD/MM/YYYY')
					?.toLowerCase()
					.includes(forumSearchDebounce.toLowerCase())
			);
		});
	}
	const totalData = forumSearchDebounce
		? DATA_FORUMS_FLAG.length
		: DATA_FORUM.length;
	const handleChangePage = (e: any, value: any) => {
		dispatch(
			actions.setData({
				pagination: {
					...state.set.pagination,
					page: parseInt(value),
				},
			}),
		);
	};
	const handleChangeSearch = (e: any) => {
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
	const handleViewDetail = (item: any) => {
		dispatch(
			actions.setData({
				setItem: {
					idItem: item,
					dataItem: item,
				},
			}),
		);
	};
	const URL = process.env.NEXT_PUBLIC_URL_IMAGE;
	const handleLikePost = (idPost: any) => {
		if (!currentUser) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn phải đăng nhập để thích bài viết',
			});
		} else {
			Likes.doc(idPost)
				.get()
				.then((doc) => {
					if (doc.exists) {
						const data: any = doc.data();
						if (data.likes.includes(currentUser?.id)) {
							Likes.doc(idPost).update({
								likes: data.likes.filter((item: any) => {
									return item !== currentUser?.id;
								}),
							});
							getAllLikes();
						} else {
							Likes.doc(idPost).update({
								likes: [...data.likes, currentUser?.id],
							});
							getAllLikes();
						}
					} else {
						Likes.doc(idPost).set({
							idPost: idPost,
							likes: [currentUser?.id],
						});
						getAllLikes();
					}
				});
		}
	};
	const DATA_LIKES = uniqueLikes || [];
	const checkIdUserInLikes = (idUser: any) => {
		return DATA_LIKES.map((item: any) => {
			return item?.likes?.includes(idUser);
		});
	};
	const RenderItemForum = ({ data }: { data: any }) => {
		return (
			<>
				{data?.map((item: any, index: number) => {
					let count = (item?.content?.match(/(\n|<br>)/g) || [])
						.length;
					let content = '';
					if (count > 10) {
						content = getFirstXLines(item?.content, 10) + '...';
					} else {
						content = item?.content;
					}
					let isLike = checkIdUserInLikes(currentUser?.id);
					return (
						<div className={`${cx('list_item')}`} key={index}>
							<div className={`${cx('top_container')}`}>
								<Link
									href={`${routers.news}/${item?._id}`}
									className={`${cx('image_container')}`}
									onClick={() => handleViewDetail(item)}
								>
									<img
										src={`${URL}${item?.thumbnail}`}
										alt=""
										onError={(e) =>
											// @ts-ignore
											(e.target.src = `https://aiking.com.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_light_square.02cc0f5a.png&w=384&q=75`)
										}
										className={`${cx(
											'header_image_thumbnail w-full min-h-[200px] max-h-[200px] lg:max-w-[200px] lg:min-h-[200px] lg:max-h-[200px] lg md:max-w-[200px] md:min-h-[200px] md:max-h-[200px]',
										)}`}
									/>
								</Link>
								<div
									className={`${cx(
										'content_container',
									)} ml-0 lg:ml-3 md:ml-3`}
								>
									<Link
										href={`${routers.news}/${item?._id}`}
										className={`${cx('title_forum')}`}
										onClick={() => handleViewDetail(item)}
									>
										{item?.namePost || 'Name Post'}
									</Link>
									<div
										className={`${cx('timer')}`}
										title={moment(item?.createdAt).format(
											'DD/MM/YYYY HH:mm:ss',
										)}
									>
										Đăng vào:{' '}
										{moment(item?.createdAt).fromNow()}
									</div>
									<div
										className={`${cx(
											'content_forum_container',
										)}`}
										dangerouslySetInnerHTML={{
											__html:
												content ||
												'<p>Nội dung tin tức</p>',
										}}
									></div>
								</div>
							</div>
							<div className={`${cx('bottom_container')}`}>
								<Tooltip
									title={
										DATA_LIKES.filter((row: any) => {
											return row.idPost === item?._id;
											// @ts-ignore
										})[0]?.likes?.length
									}
								>
									<div
										className={`${cx(
											'actions_item',
											isLike[index] && 'like',
										)}`}
										onClick={() => {
											handleLikePost(item?._id);
										}}
									>
										<i className="bx bx-like bx-tada"></i>{' '}
										<span>
											{isLike[index]
												? 'Bỏ thích'
												: 'Thích'}
										</span>
									</div>
								</Tooltip>
								<Tooltip
									title={
										DATA_COMMENT.filter((row: any) => {
											return (
												row.parentId === null &&
												row.idPost === item?._id
											);
										}).length
									}
								>
									<div
										className={`${cx('actions_item')}`}
										onClick={async (e) => {
											openModalComment(e);
											if (currentUser) {
												await setStore({
													...currentUser,
													idPost: item?._id,
												});
												await dispatch(
													actions.setData({
														currentUser: getStore(),
													}),
												);
											}
										}}
									>
										<i className="bx bx-chat bx-tada"></i>{' '}
										<span>Bình luận</span>
									</div>
								</Tooltip>
								<div
									className={`${cx(
										'actions_item',
										'actions_item_relative',
									)}`}
									onClick={() => toggleShare(item?._id)}
								>
									<i className="bx bx-share bx-tada"></i>{' '}
									<span>Chia sẻ</span>
									{openShare && item?._id === idItem && (
										<div
											className={`${cx(
												'actions_item_absolute',
											)}`}
										>
											<ShareFB
												slug={item?._id}
												name={item?.namePost}
												desc={item?.description}
												page="news"
											/>
											<ShareLinkedln
												slug={item?._id}
												name={item?.namePost}
												desc={item?.description}
												page="news"
											/>
											<ShareTelegram
												slug={item?._id}
												name={item?.namePost}
												desc={item?.description}
												page="news"
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</>
		);
	};
	const RenderForumDetail = ({ item }: { item: any }) => {
		return (
			<div
				className={`${cx('content_forum_container')} mt0`}
				dangerouslySetInnerHTML={{
					__html: item?.content,
				}}
			></div>
		);
	};
	const clickRepliesComment = (idReplies: any) => {
		textAreaRef.current.focus();
		setIsReplies(true);
		setIdReplies(idReplies);
	};
	const clickUpdateComment = (item: any) => {
		setIsUpdate(true);
		setIsReplies(false);
		dispatch(
			actions.setData({
				comment: item?.comment,
			}),
		);
		textAreaRef.current.focus();
		setIdUpdate(item?.id);
	};

	const RenderCommentItem = ({
		item,
		noReply,
	}: {
		item: any;
		noReply?: any;
	}) => {
		return (
			<div className={`${cx('comment')}`}>
				<div className={`${cx('comment_image_container')}`}>
					<img
						src={LOGO_COMPANY.src}
						alt=""
						className={`${cx('avatar_comment')}`}
					/>
				</div>
				<div className={`${cx('comment_infomation')}`}>
					<div className={`${cx('name_timer_container')}`}>
						<p className={`${cx('name')}`}>{item?.username}</p>
						<p
							className={`${cx('timer')}`}
							title={moment(item?.createdAt?.toDate()).format(
								'DD/MM/YYYY HH:mm:ss',
							)}
						>
							{moment(item?.createdAt?.toDate()).fromNow()}
						</p>
					</div>
					<div
						className={`${cx('content_comment_container')}`}
						dangerouslySetInnerHTML={{
							__html: item?.comment,
						}}
					></div>
					<div className={`${cx('actions_comment_container')}`}>
						{!noReply && (
							<div
								className={`${cx('actions_comment_item')}`}
								onClick={() => clickRepliesComment(item?.id)}
							>
								Trả lời
							</div>
						)}
						<div
							className={`${cx('actions_comment_item')}`}
							onClick={() => clickUpdateComment(item)}
						>
							Sửa
						</div>
						<div
							className={`${cx('actions_comment_item')}`}
							onClick={(e) => {
								openModalDeleteComment(e, item?.id);
							}}
						>
							Xóa
						</div>
					</div>
				</div>
			</div>
		);
	};
	const handleSendComment = () => {
		if (currentUser?.rule === 'user') {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn không có quyền bình luận',
			});
		} else {
			setIsProcessComment(true);
			const id = Comments.doc().id;
			Comments.doc(id)
				.set({
					id: id,
					idPost: currentUser?.idPost,
					username: currentUser?.username,
					comment: comment,
					userId: currentUser?.id,
					parentId: null,
					createdAt: timestamp,
					updatedAt: timestamp,
				})
				.then((docRef) => {
					getAllComments();
					setIsProcessComment(false);
					dispatch(actions.setData({ comment: '' }));
				})
				.catch((err) => {
					setIsProcessComment(false);
					setSnackbar({
						open: true,
						message: 'Bình luận thất bại!',
						type: 'error',
					});
				});
		}
	};
	const handleRepliesComment = () => {
		if (currentUser?.rule === 'user') {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn không có quyền trả lời bình luận',
			});
		} else {
			setIsProcessComment(true);
			const id = Comments.doc().id;
			Comments.doc(id)
				.set({
					id: id,
					username: currentUser?.username,
					comment: comment,
					userId: currentUser?.id,
					parentId: idReplies,
					createdAt: timestamp,
					updatedAt: timestamp,
				})
				.then((docRef) => {
					getAllComments();
					setIsProcessComment(false);
					setIsReplies(false);
					dispatch(actions.setData({ comment: '' }));
				})
				.catch((err) => {
					setIsProcessComment(false);
					setSnackbar({
						open: true,
						message: 'Trả lời bình luận thất bại!',
						type: 'error',
					});
				});
		}
	};
	const handleUpdateComment = (e: any, id: any) => {
		if (currentUser?.rule === 'user') {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn không có quyền cập nhật bình luận',
			});
		} else {
			setIsProcessUpdateComment(true);
			Comments.doc(id)
				.update({
					comment: comment,
					updatedAt: timestamp,
				})
				.then((docRef) => {
					getAllComments();
					setIsProcessUpdateComment(false);
					setIsUpdate(false);
					dispatch(actions.setData({ comment: '' }));
				})
				.catch((err) => {
					console.log(err);
					setIsProcessUpdateComment(false);
					setSnackbar({
						open: true,
						message: 'Sửa bình luận thất bại!',
						type: 'error',
					});
				});
		}
	};
	const handleDeleteComment = () => {
		if (currentUser?.rule === 'user') {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn không có quyền xóa bình luận',
			});
		} else {
			setIsProcessDelComment(true);
			Comments.doc(currentUser?.idData)
				.delete()
				.then((docRef) => {
					getAllComments();
					setIsProcessDelComment(false);
					setModalDeleteComment(false);
				})
				.catch((err) => {
					setIsProcessDelComment(false);
					setSnackbar({
						open: true,
						message: 'Xóa bình luận thất bại!',
						type: 'error',
					});
				});
		}
	};
	const handleCancelUpdate = () => {
		setIsUpdate(false);
		setIsReplies(false);
		dispatch(actions.setData({ comment: '' }));
	};

	return (
		<>
			<Breadcrumb pageName="Tin tức" description="Tin tức" />
			<div className="container">
				<div className="my-3">
					<div className={`${cx('container_forum')}`}>
						<div className={`${cx('content_header_container')}`}>
							<p className={`${cx('count_text')}`}>
								<i
									className="bx bx-news bx-tada"
									style={{ color: '#157bfb' }}
								></i>{' '}
								{DATA_FORUMS_FLAG.length > 0
									? `${autoFormatNumberInputChange(
											totalData,
									  )} tin tức mới nhất`
									: 'Hiện chưa có tin tức nào'}
							</p>
							{/* @ts-ignore */}
							<Typed
								strings={[
									'Tìm kiếm tin tức',
									'Luôn cập nhật những tin tức mới nhất',
									'Mang đến cho khách hàng thông tin chính xác nhất',
								]}
								typeSpeed={60}
								backSpeed={30}
								showCursor={false}
								loop
								attr="placeholder"
								className={`${cx('content_search')}`}
							>
								<FormInput
									name="forumSearch"
									value={forumSearch}
									onChange={handleChangeSearch}
								/>
							</Typed>
						</div>
						<div className={`${cx('list_forums_topics')}`}>
							<div className={`${cx('list_forums')}`}>
								<RenderItemForum data={DATA_FORUMS_FLAG} />
							</div>
							{DATA_FORUMS_FLAG.length > 0 && (
								<div className={`${cx('list_topics')}`}>
									<div
										className={`${cx('topics_container')}`}
									>
										<div className={`${cx('topic_title')}`}>
											<span>Chủ đề nóng</span>{' '}
											<span
												className={`${cx('line')}`}
											></span>
										</div>
										<div className={`${cx('ul_topics')}`}>
											<Link
												className={`${cx('li_topics')}`}
												href="##"
											>
												Công nghệ
											</Link>
											<Link
												className={`${cx('li_topics')}`}
												href="##"
											>
												Nhân sự
											</Link>
											<Link
												className={`${cx('li_topics')}`}
												href="##"
											>
												Tài chính
											</Link>
											<Link
												className={`${cx('li_topics')}`}
												href="##"
											>
												Dịch vụ
											</Link>
											<Link
												className={`${cx('li_topics')}`}
												href="##"
											>
												Chứng khoán
											</Link>
											<Link
												className={`${cx('li_topics')}`}
												href="##"
											>
												Cổ phiếu
											</Link>
										</div>
									</div>
								</div>
							)}
						</div>
						<div className={`${cx('pagination-countpage')}`}>
							{DATA_FORUMS_FLAG.length > 0 ? (
								<Stack
									spacing={2}
									className={`${cx('pagination-container')}`}
								>
									<Pagination
										onChange={handleChangePage}
										page={page}
										showFirstButton
										showLastButton
										count={
											parseInt(
												// @ts-ignore
												Math.ceil(totalData / showPage),
											) || 0
										}
										variant="outlined"
										shape="rounded"
									/>
								</Stack>
							) : (
								<div
									className={`${cx('noda_text')} text-center`}
								>
									{forumSearchDebounce ? (
										<span>
											Không tìm thấy tin tức:{' '}
											<b>{forumSearchDebounce}</b>
										</span>
									) : (
										<span>
											Hiện tại không có tin tức. Bạn vui
											lòng quay lại sau nhé!
										</span>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
				{modalDetail && (
					<Modal
						titleHeader={dataItem?.namePost || 'Chi tiết tin tức'}
						openModal={openModalDetail}
						closeModal={closeModalDetail}
					>
						<RenderForumDetail item={dataItem} />
					</Modal>
				)}
				{modalComment && (
					<Modal
						titleHeader={'Bình luận'}
						openModal={openModalComment}
						closeModal={closeModalComment}
					>
						<div className={`${cx('content_emoji_container')}`}>
							<textarea
								className={`${cx('textarea')}`}
								rows={3}
								placeholder="Bạn đang nghĩ gì?"
								onChange={(e) => {
									dispatch(
										actions.setData({
											comment: e.target.value,
										}),
									);
								}}
								ref={textAreaRef}
								value={comment}
							></textarea>
							<div
								className={`${cx('icon_emoji_toggle')}`}
								onClick={toggleEmoji}
							>
								<i
									className="bx bx-smile bx-tada"
									style={{ color: '#157bfb' }}
								></i>
							</div>
							{openEmoji && (
								<div
									className={`${cx(
										'comment_emoji_container',
									)}`}
								>
									<Picker
										onEmojiClick={(emojiObject, e) => {
											dispatch(
												actions.setData({
													comment:
														comment +
														emojiObject.emoji,
												}),
											);
										}}
									/>
								</div>
							)}
						</div>
						<Button
							className={`${cx('btn_custom')}`}
							onClick={
								isReplies
									? handleRepliesComment
									: handleSendComment
							}
							disabled={isProcessComment || !comment || isUpdate}
							isProcess={isProcessComment}
						>
							{isReplies ? 'Trả lời bình luận' : 'Bình luận'}
						</Button>
						{isUpdate && (
							<div className="flex-row">
								<Button
									className={`${cx(
										'btn_custom',
									)} warningbgc ml0 mt8 mr4`}
									onClick={(e) =>
										handleUpdateComment(e, idUpdate)
									}
									disabled={
										isProcessUpdateComment || !comment
									}
									isProcess={isProcessUpdateComment}
								>
									Cập nhật
								</Button>
								<Button
									className={`${cx(
										'btn_custom',
									)} confirmbgc mt8 ml4`}
									onClick={handleCancelUpdate}
								>
									Hủy bỏ
								</Button>
							</div>
						)}
						<div className={`${cx('divider')}`}></div>

						{getCommentParent().length > 0 ? (
							<>
								<p className="italic mb8">
									{autoFormatNumberInputChange(
										getCommentParent().length,
									)}{' '}
									bình luận
								</p>
								<div
									className={`${cx(
										'list_comment_container',
									)}`}
								>
									{getCommentParent().map(
										(item: any, index: any) => {
											return (
												<div
													className={`${cx(
														'comment_item',
													)}`}
													key={index}
												>
													<RenderCommentItem
														item={item}
													/>
													{getCommentChild(
														item?.id,
													)?.map(
														(
															itemChild,
															indexChild,
														) => {
															return (
																<div
																	key={
																		indexChild
																	}
																	className={`${cx(
																		'content_item_child',
																	)}`}
																>
																	<RenderCommentItem
																		noReply
																		item={
																			itemChild
																		}
																	/>
																</div>
															);
														},
													)}
												</div>
											);
										},
									)}
								</div>
							</>
						) : (
							<p className="text-center italic">
								Hiện chưa có bình luận nào.
							</p>
						)}
					</Modal>
				)}
				{modalDeleteComment && (
					<Modal
						titleHeader="Xóa bình luận"
						openModal={openModalDeleteComment}
						closeModal={closeModalDeleteComment}
						actionButtonText="Xóa"
						classNameButton={'cancelbgc'}
						disabled={isProcessDelComment}
						isProcess={isProcessDelComment}
						onClick={handleDeleteComment}
					>
						<p>Bạn có chắc muốn xóa bình luận này?</p>
					</Modal>
				)}
			</div>
		</>
	);
};

export default NewsPage;
