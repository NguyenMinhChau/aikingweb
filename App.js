import * as React from 'react';
import Main from './src/components/Main';
import {ProviderContext} from './src/components/Context';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  getTokenDevice,
  notificationListener,
  requestUserPermissionNotification,
} from './src/utils/notification.utils';
import {ToastShow} from './src/utils/Toast';
import {TYPE_TOAST} from './src/utils/toast.config';

const App = () => {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {notification, sentTime} = {...remoteMessage};
      const {title, body} = {...notification};
      ToastShow({
        type: TYPE_TOAST.NOTIFICATION,
        props: {
          title: title,
          message: `${body?.slice(0, 100)} ${body?.length > 100 ? '...' : ''}`,
          time: sentTime,
        },
      });
    });
    requestUserPermissionNotification();
    getTokenDevice();
    notificationListener();
    return unsubscribe;
  }, []);
  return (
    <ProviderContext>
      <Main />
    </ProviderContext>
  );
};

export default App;
