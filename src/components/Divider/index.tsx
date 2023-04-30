import React from 'react';
import styles from './styles.module.css';

function Divider() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className={`${styles.divider} bg-body-color`}></div>
    </div>
  );
}

export default Divider;
