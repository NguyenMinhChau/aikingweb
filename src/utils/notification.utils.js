import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const requestUserPermissionNotification = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

export const getTokenDevice = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  return token;
};

export const onDisplayNotification = async (props = {}) => {
  const {
    title = 'Thông báo',
    subTitle = '',
    body = 'Không có nội dung',
    idChannel = 'mac_dinh',
    nameChannel = 'Mặc định',
  } = {...props};
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: idChannel,
    name: nameChannel,
    sound: 'bell_notification',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    subtitle: subTitle,
    body: body,
    ios: {},
    sound: 'bell_notification',
    android: {
      sound: 'bell_notification',
      smallIcon: 'favicon',
      showTimestamp: true,
      channelId,
      color: '#000000',
      pressAction: {
        id: idChannel,
      },
    },
  });
};
