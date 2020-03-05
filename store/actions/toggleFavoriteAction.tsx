import { TOGGLE_FAVORITE, toggleFavoriteActionType } from '../types/toggleFavoriteActionType'


export function toogleFavoriteAction(favoriteHeroId: number): toggleFavoriteActionType {
  return {
    type: TOGGLE_FAVORITE,
    heroId: favoriteHeroId
  }
}
