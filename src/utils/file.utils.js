import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TYPE_ACCESS, requestPermission} from './MgnAccess/config';

export const launchCameraUtils = async (options, callback) => {
  try {
    await requestPermission(TYPE_ACCESS.CAMERA);
    await launchCamera(options, response => {
      if (response.didCancel) {
        callback(null);
      } else if (response.errorCode) {
        callback(null);
      } else {
        callback(response);
      }
    });
  } catch (error) {
    console.log('error: ', error);
  }
};

export const launchImageLibraryUtils = async (options, callback) => {
  try {
    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        callback(null);
      } else if (response.errorCode) {
        callback(null);
      } else {
        callback(response);
      }
    });
  } catch (error) {
    console.log('error: ', error);
  }
};
