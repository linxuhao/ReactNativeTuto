import { ImageURISource } from "react-native";

export const CHANGE_AVATAR = 'CHANGE_AVATAR'

interface changeAvatarAction {
  type: typeof CHANGE_AVATAR;
  avatar_uri: ImageURISource;
}

export type changeAvatarActionType = changeAvatarAction;