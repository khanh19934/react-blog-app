import axios from 'axios';
import {FETCH_USER,CREATE_BLOG,GET_BLOG,GET_BLOG_DETAIL,UPLOAD_IMAGE,GET_IMAGE,GET_USER_INFO,UPDATE_BLOG,REMOVE_BLOG,ADD_COMMENT,GET_COMMENT,SEARCH_BLOG,LIKE_BLOG_POST,UNLIKE_BLOG_POST} from './types';
import { userInfo } from 'os';

export const fetchUser = () => {
    return async dispatch => {
        const res = await axios.get('/api/current_user');
        if(res){
            return dispatch({type:FETCH_USER,payload:res.data});
        }
    };
};

export const createBlog = (title,content) => {
    return async dispatch => {
        const res = await axios.post('/api/createblog',{
            title,
            content
        });
        if(res){
            
            return dispatch({type:CREATE_BLOG,payload:res.data});
        }
    }
};

export const getBlog = (data) => {
    return async dispatch => {
        const res = await axios.get(`/api/bloglist?offset=${data}`);
        if(res){
            return dispatch({type:GET_BLOG,payload:res.data});
        }
    }
};

export const getBlogDetail = (id) => {
    return async dispatch => {
        const res = await axios.get(`/api/blog/${id}`);
        if(res){
            return dispatch({type:GET_BLOG_DETAIL,payload:res.data});
        }
    }
};

export const uploadImage = (imageFile,userinfo) => {
    return async dispatch => {
        let imageFormData = new FormData();
        imageFormData.append('myImg',imageFile);
        imageFormData.append('name',userinfo.name);
        imageFormData.append('password',userinfo.password);
        imageFormData.append('phoneNumber',userinfo.phoneNumber);
        imageFormData.append('address',userinfo.address);
        const res = await axios.post('/api/updateInfo',imageFormData);
        if(res){
            return dispatch({type:CREATE_BLOG,payload:res.data});
        }

    }
};

export const getImage = (idImage) => {
    return async dispatch => {
        const res = await axios.get(`/api/image/${idImage}`);
        if(res){
            return dispatch({type:GET_IMAGE,payload:res.data});
        }
    }
};

export const getUserInfo = () => {
    return async dispatch => {
        const res = await axios.get('/api/userInfo');
        if(res){
            return dispatch({type:GET_USER_INFO,payload:res.data});
        }
    }
};

export const updateBlog = (idBlog,data) => {
    return async dispatch => {
        const res = await axios.post(`/api/editblog/${idBlog}`,{
            title:data.title,
            content:data.content
        });
        if(res){
            return dispatch({type:UPDATE_BLOG,payload:res.data});
        }
    }
};

export const removeBlog = (idBlog) => {
    return async dispatch => {
        const res = await axios.delete(`/api/deleteblog/${idBlog}`);
        if(res){
            return dispatch({type:REMOVE_BLOG,payload:res.data});
        }
    }
};
export const addComment = (idBlog,content) => {
    return async dispatch => {
        const res = await axios.post(`/api/addComment/${idBlog}`,{
            content
        });
        if(res){
            return dispatch({type:ADD_COMMENT,payload:res.data});
        }

    }
};
export const getComment = (idBlog) => {
    return async dispatch => {
        const res = await axios.get(`/api/listComment/${idBlog}`);
        if(res){
            return dispatch({type:GET_COMMENT,payload:res.data});
        }
    }
};
// export const searchBlog = (searchBlogInput) => {
//     return async dispatch => {
//         const res = await axios.post(`/api/searchblog`,{
//             searchInput:searchBlogInput
//         });
//         if(res){
//             return dispatch({type:SEARCH_BLOG,payload:res.data});
//         }
//     }
// }

export const likeBlogPost = (idBlog) => {
    return async dispatch => {
        const res = await axios.patch(`/api/likesBlog/${idBlog}`);
        if(res){
            return dispatch({type:LIKE_BLOG_POST,payload:res.data});
        }
    }
};
export const unLikeBLogPost = (idBlog) => {
    return  async dispatch => {
        const res = await axios.patch(`/api/unlikesBlog/${idBlog}`);
        if(res){
            return dispatch({type:UNLIKE_BLOG_POST,payload:res.data});
        }
    }
};