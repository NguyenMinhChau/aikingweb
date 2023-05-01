'use client';
import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import styles from './Image.module.css';

const cx = className.bind(styles);
type ImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  errorImage?: any;
  onClick?: () => {};
};

function Image({ src, alt, className, errorImage, onClick }: ImageProps) {
  const classed = cx('image', className);
  const errorImgPlaceholder =
    'https://via.placeholder.com/139x39/FFFF00/000000?text=Shopcoinusa.com';
  return (
    <img
      // crossOrigin='anonymous'
      className={classed}
      src={src}
      alt={alt}
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = errorImage || errorImgPlaceholder;
      }}
      onClick={onClick}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  errorImage: PropTypes.string,
};

export default Image;
