import { combineReducers } from 'redux';

import posts from './postreducer';
import authReducer from './authreducer'


export default combineReducers({
    posts, authReducer:authReducer,
})