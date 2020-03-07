import { changeAvatarActionType, CHANGE_AVATAR } from "../types/changeAvatarActionType";

const initialState = { avatar_uri: require('../../assets/default_avatar.png') };

export function avatarReducer(state = initialState, action: changeAvatarActionType) {
  let nextState;
  switch (action.type) {
    case CHANGE_AVATAR:
        nextState = {
          ...state,
          avatar_uri: action.avatar_uri
        };
      return nextState || state;
  default:
    return state;
  }
}