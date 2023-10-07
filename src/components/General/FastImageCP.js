import React from 'react';
import FastImage from 'react-native-fast-image';
import tw from '../../styles/twrnc.global';

export default function FastImageCP({
  uri,
  uriLocal,
  uriError,
  style,
  resizeMode = 'cover',
  onTouchStart = () => {},
}) {
  const [isMainImageLoaded, setIsMainImageLoaded] = React.useState(false);
  return (
    <>
      <FastImage
        style={tw.style('min-h-[150px] w-[150px]', {...style})}
        source={
          isMainImageLoaded
            ? uriLocal
              ? uriLocal
              : {
                  uri: uri,
                }
            : uriError
            ? uriError
            : require('../../assets/images/no_data.png')
        }
        resizeMode={FastImage.resizeMode[resizeMode]}
        onLoad={() => setIsMainImageLoaded(true)}
        onError={() => setIsMainImageLoaded(false)}
        onTouchStart={onTouchStart}
      />
    </>
  );
}
