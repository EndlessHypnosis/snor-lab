
export const setPathLevel = (newLevel) => {
  return {
    type: 'SET_PATH_LEVEL',
    payload: newLevel
  }
}

export const setAvatarUrl = (url) => {
  return {
    type: 'SET_AVATAR_URL',
    payload: url
  }
}