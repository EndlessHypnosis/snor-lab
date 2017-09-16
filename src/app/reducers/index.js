import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';
import UserPathReducer from './user_path_reducer';

const rootReducer = combineReducers({
    currentUser: FireBaseUserReducer,
    userPath: UserPathReducer,
});

export default rootReducer;
