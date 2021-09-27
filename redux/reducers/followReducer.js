import { TOGGLEFOLLOW_USER_FAIL, TOGGLEFOLLOW_USER_REQUEST, TOGGLEFOLLOW_USER_SUCCESS } from "../constants/followConstants"

//toggle a follow reducer
export const toggle_follow_Reducer = (state = {follow_loading: false}, action) => {
    switch (action.type) {
        case TOGGLEFOLLOW_USER_REQUEST:
            return { follow_loading: true }
        case TOGGLEFOLLOW_USER_SUCCESS:
            return { follow_loading: false, follow: action.payload, follow_message: "followed!" }
        case TOGGLEFOLLOW_USER_FAIL:
            return { follow_loading: false, follow_error: action.payload }
        default:
            return state
    }
}