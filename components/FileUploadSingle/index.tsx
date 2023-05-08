/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
'use client';
import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { Pane, FileUploader, FileCard } from 'evergreen-ui';
import { useAppContext } from '../../helpers';
import { actions } from '../../appState/';

const cx = className.bind(styles);
type FileUploadSingleType = {
	label?: string;
	desc?: string;
};
export default function FileUploadSingle({
	label = 'Upload File',
	desc,
}: FileUploadSingleType) {
	const { state, dispatch } = useAppContext();
	const { file } = state.set;
	// const [files, setFiles] = React.useState([]);
	const [fileRejections, setFileRejections] = React.useState<any>([]);
	const handleChange = React.useCallback(
		(files: any) => dispatch(actions.setData({ file: [files[0]] })),
		[],
	);
	const handleRejected = React.useCallback(
		(fileRejections: any[]) => setFileRejections([fileRejections[0]]),
		[],
	);
	const handleRemove = React.useCallback(() => {
		// setFiles([]);
		dispatch(actions.setData({ file: [] }));
		setFileRejections([]);
	}, []);
	return (
		<div className={`${cx('container')} mt-3`}>
			<Pane maxWidth={654}>
				<FileUploader
					label={label}
					description={desc}
					maxSizeInBytes={50 * 1024 ** 2}
					maxFiles={1}
					onChange={handleChange}
					onRejected={handleRejected}
					renderFile={(file) => {
						const { name, size, type } = file;
						const fileRejection = fileRejections.find(
							(fileRejection: any) => fileRejection.file === file,
						);
						const { message } = fileRejection || {};
						return (
							<FileCard
								key={name}
								isInvalid={fileRejection != null}
								name={name}
								onRemove={handleRemove}
								sizeInBytes={size}
								type={type}
								validationMessage={message}
							/>
						);
					}}
					values={file}
				/>
			</Pane>
		</div>
	);
}
