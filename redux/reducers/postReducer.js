import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS } from "../constants/postConstants"

//create a post
export const create_a_post_Reducer = (state = {post_loading: false}, action) => {
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