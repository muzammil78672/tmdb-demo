/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';

import ReduxStore from './src/config/reduxStore';

import AppNavigator from './src/navigations';

import Navigation from './src/common/navigation';

const store = ReduxStore();

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <AppContainer
        ref={navigatorRef => {
          Navigation.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
};

export default App;
