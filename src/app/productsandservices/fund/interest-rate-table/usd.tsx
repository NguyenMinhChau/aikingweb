import React from 'react';
import styles from './styles.module.css';
import IMAGE from '../../../../../public/images/interestRate/quydautuusa.png';
import Image from 'next/image';

function InterestRateUSD() {
  return (
    <div className={`${styles.container}`}>
      <Image src={IMAGE} alt="Quỹ đầu tư USD" className={`${styles.image}`} />
    </div>
  );
}

export default InterestRateUSD;
