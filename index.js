/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import configureStore from './app/screen/redux/store';

const store = configureStore();


const ReduxDemo = () =>
  <Provider store={store}>
    <App/>
  </Provider>

AppRegistry.registerComponent(appName, () => ReduxDemo);
