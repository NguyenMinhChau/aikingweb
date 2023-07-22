import React from 'react';
import styles from './styles.module.css';
import IMAGE from '../../../../../public/images/interestRate/quyphattriennongnghiep.png';
import Image from 'next/image';

function InterestRateAgricutural() {
	return (
		<div className={`${styles.image_container}`}>
			<Image
				src={IMAGE}
				alt="Quỹ phát triển nông nghiệp"
				className={`${styles.image}`}
			/>
		</div>
	);
}

export default InterestRateAgricutural;
