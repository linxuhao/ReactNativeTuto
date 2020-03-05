export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'

interface toggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE;
  heroId: number;
}

export type toggleFavoriteActionType = toggleFavoriteAction;