import { createStore, combineReducers } from 'redux';
import { toggleFavoriteReducer } from './reducers/favoriteReducer';
import { avatarReducer } from './reducers/avatarReducer';

export default createStore(combineReducers({ toggleFavoriteReducer, avatarReducer }));