import { createTransform } from 'redux-persist';
import { favoriteInitialState } from './reducers/favoriteReducer';

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState: typeof favoriteInitialState, key) => {
    // convert favoritesHeroes to an Array.
    return { ...inboundState, favoritesHeroes: [...Array.from(inboundState.favoritesHeroes)] };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // convert favoritesHeroes back to a Set.
    return { ...outboundState, favoritesHeroes: new Set<number>(outboundState.favoritesHeroes) };
  },
  // define which reducers this transform gets called for.
  { whitelist: ['toggleFavoriteReducer'] }
);

export default SetTransform;