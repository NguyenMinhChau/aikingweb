import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_DATA_PAYLOAD} from '../components/Context/AppContext.reducer';
const KEY_CURRENT_USER = 'ICDP_CACHE_CURRENT_USER';
const KEY_SETTING_APPEARANCE = 'ICDP_CACHE_SETTING_APPEARANCE';
const KEY_ACCESS_TOKEN = 'ICDP_CACHE_ACCESS_TOKEN';
const KEY_LOADER_SLIDER_USED = 'ICDP_CACHE_LOADER_SLIDER_USED';

export const getAsyncCacheCurrentUser = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY_CURRENT_USER}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'currentUser',
            value: res,
          }),
        );
      });
  } catch (err) {
    console.log('Error: ', err);
  }
};
export const getAsyncCacheSettingAppearance = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY_SETTING_APPEARANCE}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'appearance_display',
            value: res,
          }),
        );
      });
  } catch (err) {
    console.log('Error: ', err);
  }
};
export const getAsyncCacheSettingAppearanceKEY = async () => {
  try {
    const settingAppearance = await AsyncStorage.getItem(
      `@${KEY_SETTING_APPEARANCE}`,
    )
      .then(JSON.parse)
      .then(res => {
        return res;
      });
    return settingAppearance;
  } catch (err) {
    console.log('Error: ', err);
  }
};
export const getAsyncCacheAccessToken = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY_ACCESS_TOKEN}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'accessToken',
            value: res,
          }),
        );
      });
  } catch (err) {
    console.log('Error: ', err);
  }
};
export const getAsyncCacheAccessTokenKEY = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(`@${KEY_ACCESS_TOKEN}`)
      .then(JSON.parse)
      .then(res => {
        return res;
      });
    return accessToken;
  } catch (err) {
    console.log('Error: ', err);
  }
};
export const getAsyncCacheLoaderSliderUsed = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY_LOADER_SLIDER_USED}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(
          SET_DATA_PAYLOAD({
            key: 'loader_slider_used',
            value: res || {state: true},
          }),
        );
      });
  } catch (err) {
    console.log('Error: ', err);
  }
};
export const getAsyncCacheLoaderSliderUsedKEY = async () => {
  try {
    const loaderState = await AsyncStorage.getItem(`@${KEY_LOADER_SLIDER_USED}`)
      .then(JSON.parse)
      .then(res => {
        return res;
      });
    return loaderState;
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const setAsyncCacheCurrentUser = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY_CURRENT_USER}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};
export const setAsyncCacheSettingAppearance = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY_SETTING_APPEARANCE}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};
export const setAsyncCacheAccessToken = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY_ACCESS_TOKEN}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};
export const setAsyncCacheLoaderSliderUsed = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY_LOADER_SLIDER_USED}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};

const LIST_KEY_NO_REMOVE = [KEY_LOADER_SLIDER_USED];

export const removeAsyncCache = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const keysRemove = await keys.filter(
      key => !LIST_KEY_NO_REMOVE.includes(key.replace('@', '')),
    );
    await AsyncStorage.multiRemove(keysRemove);
    return true;
    // await AsyncStorage.clear();
    // return true;
  } catch (exception) {
    return false;
  }
};
