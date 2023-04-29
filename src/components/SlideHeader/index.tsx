import React from 'react';
import className from 'classnames/bind';
import styles from './SliderHeader.module.css';

const cx = className.bind(styles);
type SliderHeaderProps = {
  urlImage?: string,
  title1?: string,
  title2?: string,
  animateName?: string,
}

export default function SliderHeader({ urlImage, title1, title2, animateName }: SliderHeaderProps) {
  return (
    <div className={`${cx('slider-header')}`}>
      <div
        className={`${cx('slider-image')}`}
        style={{
          backgroundImage: `url('${urlImage}')`,
        }}
      ></div>
      <div className={`${cx('slider-text-container')}`}>
        <div
          className={`${cx(
            'slider-title'
          )} mb8 animate__animated ${animateName}`}
        >
          {title1} <span className='cancel'>{title2}</span>
        </div>
      </div>
    </div>
  );
}
