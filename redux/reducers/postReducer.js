import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POSTS_FAIL, GET_ALL_POSTS_REQUEST, GET_ALL_POSTS_SUCCESS } from "../constants/postConstants"

//create a post
export const create_a_post_Reducer = (state = { post_loading: false }, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return { post_loading: true }
        case CREATE_POST_SUCCESS:
            return { post_loading: false, post: action.payload, post_message: "Posted!" }
        case CREATE_POST_FAIL:
            return { post_loading: false, post_error: action.payload }
        default:
            return state
    }
}

//get all posts 
export const get_all_posts_Reducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case GET_ALL_POSTS_REQUEST:
            return { loading: true }
        case GET_ALL_POSTS_SUCCESS:
            return { loading: false, posts: action.payload }
        case GET_ALL_POSTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//like a post
export const like_a_post_Reducer = (state = { like_loading: false }, action) => {
    switch (action.type) {
        case GET_ALL_POSTS_REQUEST:
            return { like_loading: true }
        case GET_ALL_POSTS_SUCCESS:
            return { like_loading: false, like: action.payload }
        case GET_ALL_POSTS_FAIL:
            return { like_loading: false, like_error: action.payload }
        default:
            return state
    }
}