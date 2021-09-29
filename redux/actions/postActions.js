import axios from "axios";
import { storage } from "../../firebase";
import { apiUrl } from "../../helpers/apiUrl";
import { getRandomString } from "../../helpers/getRandomString";
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POSTS_FAIL, GET_ALL_POSTS_REQUEST, GET_ALL_POSTS_SUCCESS, GET_A_SINGLE_POST_FAIL, GET_A_SINGLE_POST_REQUEST, GET_A_SINGLE_POST_SUCCESS, LIKE_A_POST_FAIL, LIKE_A_POST_REQUEST, LIKE_A_POST_SUCCESS } from "../constants/postConstants"

const random_string = getRandomString(8)

//create a post
export const create_a_post_Action = (body, picture, location, displayName, token) => (dispatch) => {
    dispatch({
        type: CREATE_POST_REQUEST
    })

    const ref = storage.ref(`/images/posts/${displayName}/${random_string}`)
    ref.put(picture).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
            console.log(' * new url', url)
            axios.post(`${apiUrl}/posts/create`, {
                body,
                pictureUrl: url,
                location,
                title: ''
            }, {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                dispatch({
                    type: CREATE_POST_SUCCESS,
                    payload: res
                })
            }).catch(error => {
                dispatch({
                    type: CREATE_POST_FAIL,
                    payload: error.response && error.response.data.error
                        ? error.response.data.error
                        : error.message,
                })
            })
        }).catch(error => {
            dispatch({
                type: CREATE_POST_FAIL,
                payload: error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
            })
        })
    })

}

//get all posts
export const get_all_posts_Action = (token) => (dispatch) => {
    dispatch({
        type: GET_ALL_POSTS_REQUEST
    })
    axios.get(`${apiUrl}/posts/all`,{
        headers: {
            Authorization: token
        }
    }).then(res => {
        dispatch({
            type: GET_ALL_POSTS_SUCCESS,
            payload: res.data
        })
    }).catch(error => {
        dispatch({
            type: GET_ALL_POSTS_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}

//like a post
export const like_a_post_Action = (id, token) => (dispatch) => {
    dispatch({
        type: LIKE_A_POST_REQUEST,
        payload: id
    })
    axios.patch(`${apiUrl}/posts/like/${id}`, {}, {
        headers: {
            Authorization: token
        }
    }).then(res => {
        dispatch({
            type: LIKE_A_POST_SUCCESS,
            payload: res
        })
    }).catch(error => {
        dispatch({
            type: LIKE_A_POST_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}

//get a single post
export const get_a_single_post_Action = (id, token) => (dispatch) =>{
    dispatch({
        type: GET_A_SINGLE_POST_REQUEST,
        payload: {token, id}
    })
    axios.get(`${apiUrl}/posts/${id}`,{headers: {
        Authorization : token
    }}).then(res=>{
        dispatch({
            type: GET_A_SINGLE_POST_SUCCESS,
            payload: res.data
        })
    }).catch(error=>{
        dispatch({
            type: GET_A_SINGLE_POST_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}