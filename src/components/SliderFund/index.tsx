import React from 'react';
import styles from './styles.module.css';

function SliderFund({ item }: { item: any }) {
  const handleSetItem = (item: any) => {};
  return (
    <div
      className={`${styles.item}`}
      style={{
        backgroundImage: `url(${item.urlImage.src})`,
      }}
    >
      <div className={`${styles.desc_container}`}>
        <div
          className={`${styles.desc_header}`}
          onClick={() => handleSetItem(item)}
        >
          <div className={`${styles.desc_header_title} text-white`}>
            {item?.desc}
          </div>
        </div>
        <div className={`${styles.desc_body}`}>
          <div className={`${styles.desc_body_number} text-white`}>
            {item?.period}{' '}
            {item.type === process.env.NEXT_PUBLIC_TYPE_USD ? 'tháng' : 'mùa'}
          </div>
          <div className={`${styles.desc_body_desc} text-white`}>
            {item.type === process.env.NEXT_PUBLIC_TYPE_USD ? 'Vốn' : 'Hạn mức'}{' '}
            {item?.capital?.toString().replace('M', '')} triệu đồng
          </div>
        </div>
        <div className={`${styles.desc_footer}`}>
          <div className={`${styles.desc_footer_number} text-white`}>
            <span>
              {item.type === process.env.NEXT_PUBLIC_TYPE_AGRICUTURAL
                ? 'Giải ngân '
                : 'Lãi suất '}
            </span>
            <span>{item?.interestRate}</span>
            {item.type === process.env.NEXT_PUBLIC_TYPE_AGRICUTURAL
              ? ' triệu'
              : '%/kỳ hạn'}
          </div>
          <div className={`${styles.desc_footer_desc}`}>Lợi nhuận mục tiêu</div>
        </div>
      </div>
    </div>
  );
}

export default SliderFund;
