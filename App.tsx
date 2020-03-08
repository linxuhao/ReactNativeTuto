import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './components/Navigation';
import { store, persistor } from './store/configureStore';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation/>
      </PersistGate>
    </Provider>
  );
}
