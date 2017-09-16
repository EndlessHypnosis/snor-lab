

const user_path = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PATH_LEVEL':

      let newState = Object.assign({}, state, {level: action.payload})

      return action.payload;
    default:
      return state;
  }
}

export default user_path;