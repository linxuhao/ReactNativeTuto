import { toggleFavoriteActionType } from "../types/toggleFavoriteActionType";

const initialState = { favoritesHeroes: new Set<number>() };

export function toggleFavoriteReducer(state = initialState, action: toggleFavoriteActionType) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      let isHeroInFavorite = state.favoritesHeroes.has(action.heroId);
      //Copie the set
      let newFavoriteHeroSet = new Set<number>(state.favoritesHeroes);
      if (isHeroInFavorite) {
        // Le hero est déjà dans les favoris, on le supprime de la liste
        newFavoriteHeroSet.delete(action.heroId);
        nextState = {
          ...state,
          favoritesHeroes: newFavoriteHeroSet
        };
      }
      else {
        // Le hero n'est pas dans les heroes favoris, on l'ajoute à la liste
        newFavoriteHeroSet.add(action.heroId)
        nextState = {
          ...state,
          favoritesHeroes: newFavoriteHeroSet
        };
      }
      return nextState || state;
  default:
    return state;
  }
}