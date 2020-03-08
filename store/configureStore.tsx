import { createStore, combineReducers } from 'redux';
import { toggleFavoriteReducer } from './reducers/favoriteReducer';
import { avatarReducer } from './reducers/avatarReducer';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import SetTransform from './transformer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    transforms: [SetTransform]
};

const persistedReducer = persistReducer(persistConfig, combineReducers({ toggleFavoriteReducer, avatarReducer }));

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);