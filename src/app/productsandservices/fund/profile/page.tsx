import Link from 'next/link';
import { Breadcrumb } from '../../../../components';

import styles from './profile.module.css';
import sharedStyles from '../fund-shared-styles.module.css';

import routers from '../../../../routers/routers';

const ProfilePage = () => {
  return (
    <>
      <Breadcrumb pageName="Tài khoản" description="Tài khoản" />
      <div className="container mb-5">
        <div className={sharedStyles.container}>
          <div className={styles.profile_info_wrapper}>
            <div className={styles.wrapper_title}>
              <i className="fa-regular fa-newspaper mr-1"></i>
              <span>Thông tin tài khoản</span>
            </div>
            <span>
              Bạn cần đăng nhập hoặc đăng ký để sử dụng tính năng này.
            </span>
          </div>
          <div className={styles.profile_form}>
            <div className={styles.form_row}>
              <i className={`${styles.success} fa-regular fa-newspaper`}></i>
              <Link href="">Điều kiện và điều khoản</Link>
            </div>
            <div className={styles.form_row}>
              <i className={`${styles.warning} fa-solid fa-user-plus`}></i>
              <Link href="">Mời bạn bè</Link>
            </div>
            <div className={styles.form_row}>
              <i className={`${styles.cancel} fa-solid fa-users`}></i>
              <Link href="">Hoa hồng cho nhà đầu tư</Link>
            </div>
            <div className={styles.form_row}>
              <i className={`${styles.info} fa-solid fa-circle-info`}></i>
              <Link href="">Hướng dẫn sử dụng</Link>
            </div>
            <div className={styles.form_row}>
              <i className={`${styles.success} fa-solid fa-phone`}></i>
              <Link href={routers.fundCustomerCare}>CSKH</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
