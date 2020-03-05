import { createStore } from 'redux';
import { toggleFavoriteReducer } from './reducers/favoriteReducer'

export default createStore(toggleFavoriteReducer)