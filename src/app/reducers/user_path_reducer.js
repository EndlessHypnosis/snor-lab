

const user_path = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PATH_LEVEL':
      return Object.assign({}, state, {level: action.payload})
    case 'SET_AVATAR_URL':
      return Object.assign({}, state, {avatarUrl: action.payload})
    case 'SET_AVATAR_NAME':
      return Object.assign({}, state, { avatarName: action.payload })
    default:
      return state;
  }
}

export default user_path;