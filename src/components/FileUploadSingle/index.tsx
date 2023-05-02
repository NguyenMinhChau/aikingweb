'use client';
import React from 'react';
import className from 'classnames/bind';
import styles from './FileUploadSingle.module.css';
import { useAppContext } from '@/helpers';
import { Pane, FileUploader, FileCard } from 'evergreen-ui';
import { setData } from '@/appState/reducer';

const cx = className.bind(styles);

export default function FileUploadSingle({ label = 'Upload File', desc = '' }) {
  const { state, dispatch } = useAppContext();
  const { file } = state.set;
  const [fileRejections, setFileRejections] = React.useState<Array<any>>([]);
  const handleChange = React.useCallback(
    (files: any) => dispatch(setData({ file: [files[0]] })),
    [dispatch]
  );
  const handleRejected = React.useCallback(
    (fileRejections: any = []) => setFileRejections([fileRejections[0]]),
    []
  );
  const handleRemove = React.useCallback(() => {
    dispatch(setData({ file: [] }));
    setFileRejections([]);
  }, [dispatch]);
  return (
    <div className={`${cx('container')} mt8 mt-2`}>
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
            const fileRejection: any = fileRejections.find(
              (fileRejection: any) => fileRejection.file === file
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
