import { ImageURISource } from 'react-native'
import { changeAvatarActionType, CHANGE_AVATAR } from '../types/changeAvatarActionType'


export function changeAvatarAction(uri: ImageURISource): changeAvatarActionType {
  return {
    type: CHANGE_AVATAR,
    avatar_uri: uri
  }
}
