import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {Platform} from 'react-native';

export const TYPE_ACCESS = {
  LOCATION:
    Platform.OS === 'android' ? 'ACCESS_FINE_LOCATION' : 'LOCATION_ALWAYS',
  CAMERA: Platform.OS === 'android' ? 'CAMERA' : 'CAMERA',
  STORAGE: Platform.OS === 'android' ? 'READ_EXTERNAL_STORAGE' : 'STOREKIT',
  CONTACTS: Platform.OS === 'android' ? 'READ_CONTACTS' : 'CONTACTS',
  NOTIFICATIONS:
    Platform.OS === 'android' ? 'POST_NOTIFICATIONS' : 'NOTIFICATIONS',
};

export const DATA_MGN_ACCESS_CONFIG = [
  {
    id: 1,
    label: 'Vị trí',
    iconName: 'navigate-circle-outline',
    checked: RESULTS.UNAVAILABLE,
    type_access: TYPE_ACCESS.LOCATION,
  },
  {
    id: 2,
    label: 'Máy ảnh',
    iconName: 'camera-outline',
    checked: RESULTS.UNAVAILABLE,
    type_access: TYPE_ACCESS.CAMERA,
  },
  {
    id: 3,
    label: 'Lưu trữ',
    iconName: 'folder-outline',
    checked: RESULTS.GRANTED,
    type_access: TYPE_ACCESS.STORAGE,
  },
  {
    id: 4,
    label: 'Danh bạ',
    iconName: 'call-outline',
    checked: RESULTS.UNAVAILABLE,
    type_access: TYPE_ACCESS.CONTACTS,
  },
  {
    id: 5,
    label: 'Thông báo',
    iconName: 'notifications-outline',
    checked: RESULTS.UNAVAILABLE,
    type_access: TYPE_ACCESS.NOTIFICATIONS,
    noneBorderBottom: true,
  },
];

export const checkPermissionSubmit = (type, access_app) => {
  const DATA_OPTIONS_ACCESS =
    Object.values(access_app).length > 0
      ? Object.values(access_app)
      : DATA_MGN_ACCESS_CONFIG;
  const index = DATA_OPTIONS_ACCESS.findIndex(
    item => item.type_access === type,
  );
  return DATA_OPTIONS_ACCESS[index]['checked'];
};

export const checkPermission = async type => {
  let result = await check(
    PERMISSIONS[Platform.OS === 'android' ? 'ANDROID' : 'IOS'][type],
  );
  return result;
};

export const requestPermission = async type => {
  await checkPermission(type).then(async result => {
    if (result !== RESULTS.GRANTED) {
      await request(
        PERMISSIONS[Platform.OS === 'android' ? 'ANDROID' : 'IOS'][type],
      );
    }
  });
};
