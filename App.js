import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import {LogBox} from 'react-native';

import StackNavigation from './src/navigation/StackNavigation';
import {store, persistor} from './src/redux/store';
import {setIsNetworkCreator} from './src/redux/actions/isNetwork/IsNetworkActionCreator';

var countNetwork = 0;

const verifyNetwork = () => {
  NetInfo.addEventListener(state => {
    if (state.isConnected != store.getState().isNetwork || countNetwork === 0) {
      countNetwork++;
      store.dispatch(setIsNetworkCreator(state.isConnected));
    } else countNetwork = 0;

    console.log('isConnect ', state.isConnected);
  });
  console.log('isRed ', store.getState().isNetwork);
};

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['Reanimated 2']);

const App = () => {
  verifyNetwork();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
