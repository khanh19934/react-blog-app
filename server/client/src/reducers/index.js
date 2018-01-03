import {combineReducers} from 'redux';
import authReducer from './authReducer';
import blogReducer from './blogReducer';
import appReducer from './appReducer';
export default combineReducers({
    auth:authReducer,
    blog:blogReducer,
    image:appReducer
});