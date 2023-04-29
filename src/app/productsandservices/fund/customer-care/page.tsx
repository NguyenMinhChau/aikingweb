'use client'
import React from 'react'
import className from 'classnames/bind'
import styles from './styles.module.css'
import {
  Breadcrumb,
  CustomercareLine,
  Divider,
} from '../../../../components'

const cx = className.bind(styles)
function CustomerCarePage() {
  return (
    <>
      <Breadcrumb pageName="CSKH" description="CSKH" />
      <div className="container">
        <h1 className="font-bold mb-3 text-center uppercase">
          Mọi thắc mắc vui lòng liên hệ
        </h1>
        <Divider />
        <div className="w-full flex items-center justify-center mb-3">
          <div className={`lg:w-1/2 sm:w-1/2 w-full ${cx('info_container')}`}>
            <CustomercareLine
              nameIcon="bx bx-phone"
              colorIcon="#50b153"
              title="Hotline:"
              textLink="0345 335 422"
              link="tel:0345335422"
            />
            <CustomercareLine
              nameIcon="bx bx-message-rounded"
              colorIcon="#d50000"
              title="Zalo:"
              textLink="0345 335 422 (Thắm Đặng)"
            />
            <CustomercareLine
              nameIcon="bx bxl-facebook"
              colorIcon="#007aff"
              title="Facebook:"
              textLink="Mỹ Thắm"
              link="https://www.facebook.com/thamdanginvestments/"
            />
            <CustomercareLine
              nameIcon="bx bxl-telegram"
              colorIcon="#ffab00"
              title="Telegram:"
              textLink="0345 335 422 (@luckymoon102)"
            />
            <div
              className={`${cx(
                'text_thank'
              )} text-primary font-bold italic mt-3 text-center`}
            >
              AIKING INVESTMENT chân thành cảm ơn quý nhà Đầu tư.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerCarePage
