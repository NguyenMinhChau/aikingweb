import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
  requestNotifications,
} from 'react-native-permissions';
import {Platform} from 'react-native';
import {ToastShow} from '../Toast';
import {TYPE_TOAST} from '../toast.config';
import React from 'react';
import useAppContext from '../hooks/useAppContext';

function useAppPermission() {
  const {dispatch} = useAppContext();

  const TYPE_ACCESS = {
    LOCATION:
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_ALWAYS,
    CAMERA:
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
    STORAGE:
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY,
    CONTACTS:
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.READ_CONTACTS
        : PERMISSIONS.IOS.CONTACTS,
    NOTIFICATIONS:
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.POST_NOTIFICATIONS
        : PERMISSIONS.IOS.NOTIFICATIONS,
  };

  const DATA_MGN_ACCESS_CONFIG = [
    {
      id: 1,
      label: 'Vị trí',
      iconName: 'navigate-circle-outline',
      type_access: TYPE_ACCESS.LOCATION,
    },
    {
      id: 2,
      label: 'Máy ảnh',
      iconName: 'camera-outline',
      type_access: TYPE_ACCESS.CAMERA,
    },
    {
      id: 3,
      label: 'Thông báo',
      iconName: 'notifications-outline',
      type_access: TYPE_ACCESS.NOTIFICATIONS,
      noneBorderBottom: true,
    },
    // {
    //   id: 3,
    //   label: 'Lưu trữ',
    //   iconName: 'folder-outline',
    //   type_access: TYPE_ACCESS.STORAGE,
    // },
    // {
    //   id: 4,
    //   label: 'Danh bạ',
    //   iconName: 'call-outline',
    //   type_access: TYPE_ACCESS.CONTACTS,
    // },
  ];

  const checkPermissionsReload = () => {
    // const updatedConfig = await Promise.all(
    //   DATA_MGN_ACCESS_CONFIG.map(async item => {
    //     try {
    //       const result = await check(item.type_access);
    //       item.checked = result;
    //       return item;
    //     } catch (error) {
    //       return item;
    //     }
    //   }),
    // );
    // await removeAsyncCacheAccess();
    // await setAsyncCacheAccess(updatedConfig);
    // await getAsyncCacheAccess(dispatch);
    return true;
  };

  React.useEffect(() => {
    checkPermissionsReload();
  }, []);

  const openSetting = message => {
    ToastShow({
      type: TYPE_TOAST.INFO,
      props: {
        title: 'Thông báo',
        message: message,
        buttons: [
          {
            textBtn: 'Đi đến cài đặt',
            onPress: () =>
              openSettings().catch(() => console.warn('cannot open settings')),
          },
        ],
      },
    });
    return true;
  };

  const handleUnavailable = () => {
    ToastShow({
      type: TYPE_TOAST.WARNING,
      props: {
        message: 'Quyền truy cập không khả dụng trên thiết bị này!',
      },
    });
    return false;
  };

  const checkPermission = async (type, isOpenSetting = true) => {
    if (!type) {
      return null;
    }
    try {
      const result = await check(type);
      if (result === RESULTS.GRANTED && isOpenSetting) {
        openSetting(
          'Vì lý do chính sách và quyền riêng tư trên thiết bị, vui lòng đến cài đặt để tắt quyền truy cập!',
        );
      }
      if (result === RESULTS.UNAVAILABLE) {
        handleUnavailable();
      } else {
        return requestPermission(type);
      }
    } catch (error) {
      return false;
    }
  };

  const requestPermission = async type => {
    try {
      const result = await request(type);
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };

  const requestMultiplePermission = async types => {
    const results = [];
    for (const type of types) {
      if (type) {
        const result = await requestPermission(type);
        results.push(result);
      }
    }
    for (const result of results) {
      if (!result) {
        return false;
      }
    }
    return true;
  };

  const requestNotifyPermission = async () => {
    if (Platform.OS === 'android') {
      return true;
    }
    const {status, setting} = await requestNotifications([
      'alert',
      'sound',
      'badge',
    ]);
    return status === RESULTS.GRANTED;
  };

  return {
    TYPE_ACCESS,
    DATA_MGN_ACCESS_CONFIG,
    checkPermission,
    requestPermission,
    requestMultiplePermission,
    requestNotifyPermission,
    checkPermissionsReload,
  };
}

export default useAppPermission;
