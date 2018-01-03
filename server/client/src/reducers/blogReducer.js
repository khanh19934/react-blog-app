import {CREATE_BLOG,GET_BLOG,GET_BLOG_DETAIL,UPDATE_BLOG,REMOVE_BLOG,ADD_COMMENT,GET_COMMENT,SEARCH_BLOG, LIKE_BLOG_POST, UNLIKE_BLOG_POST} from '../actions/types';

export default (state = null,action) => {
    switch(action.type){
        case CREATE_BLOG:
            return action.payload || false;
        case GET_BLOG:
            return action.payload;
        case GET_BLOG_DETAIL:
            return action.payload;
        case UPDATE_BLOG:
            return action.payload;
        case REMOVE_BLOG:
            return action.payload;
        case ADD_COMMENT:
            return action.payload;
        case GET_COMMENT:
            return action.payload;
        // case SEARCH_BLOG:
        //     return action.payload;
        case LIKE_BLOG_POST:
            return action.payload;
        case UNLIKE_BLOG_POST:
            return action.payload;
        default:
            return state;
    }
}