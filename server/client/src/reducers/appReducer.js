import {UPLOAD_IMAGE,GET_IMAGE,GET_USER_INFO} from '../actions/types';

export default (state=null,action) => {
    switch(action.type){
        case UPLOAD_IMAGE:
        return action.payload;
        case GET_IMAGE:
        return action.payload;
        case GET_USER_INFO:
        return action.payload;
        default:
        return state;
    }
}