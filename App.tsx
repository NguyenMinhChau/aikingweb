import * as React from 'react';
import Toast from 'react-native-toast-message';
import Main from './src/components/Main';
import {ProviderContext} from './src/components/Context';
import {toastConfig} from './src/utils/toast.config';

const App = () => {
  return (
    <ProviderContext>
      <Main />
      <Toast config={toastConfig} />
    </ProviderContext>
  );
};

export default App;
