import { CREATE_A_COMMENT_FAIL, CREATE_A_COMMENT_REQUEST, CREATE_A_COMMENT_SUCCESS } from "../constants/commentConstants"

//toggle a follow reducer
export const create_a_comment_Reducer = (state = {comment_loading: false}, action) => {
    switch (action.type) {
        case CREATE_A_COMMENT_REQUEST:
            return { comment_loading: true }
        case CREATE_A_COMMENT_SUCCESS:
            return { comment_loading: false, follow: action.payload, comment_message: "commented!" }
        case CREATE_A_COMMENT_FAIL:
            return { comment_loading: false, comment_error: action.payload }
        default:
            return state
    }
}