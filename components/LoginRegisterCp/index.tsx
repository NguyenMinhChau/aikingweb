import React from 'react';
import className from 'classnames/bind';
import styles from './LoginRegisterCp.module.css';
import Link from 'next/link';

const cx = className.bind(styles);
type LoginRegisterCPProps = {
  padding?: string
}
export default function LoginRegisterCp({ padding }: LoginRegisterCPProps) {
  return (
    <div className={`${cx('container')}`} style={{ padding: padding }}>
            <span>
                Bạn cần{' '}
              <Link href={""} className='fwb warning'>
                    đăng nhập
                </Link>{' '}
              hoặc{' '}
              <Link href="" className='fwb warning'>
                    đăng ký
                </Link>{' '}
              để sử dụng tính năng này.
            </span>
    </div>
  );
}
