import {
    GET_ALL_MESSAGES_FAIL,
    GET_ALL_MESSAGES_REQUEST,
    GET_ALL_MESSAGES_SUCCESS,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS
} from "../constants/chatConstants"

//sending a message
export const send_message_Reducer = (state = {loading:false}, action) => {
    switch (action.type) {
        case SEND_MESSAGE_REQUEST:
            return { loading: true }
        case SEND_MESSAGE_SUCCESS:
            return { loading: false, message: action.payload }
        case SEND_MESSAGE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//get all messages
export const get_all_messages_Reducer = (state = {all_messages_loading:false}, action) => {
    switch (action.type) {
        case GET_ALL_MESSAGES_REQUEST:
            return { all_messages_loading: true }
        case GET_ALL_MESSAGES_SUCCESS:
            return { all_messages_loading: false, all_messages: action.payload }
        case GET_ALL_MESSAGES_FAIL:
            return { all_messages_loading: false, error: action.payload }
        default:
            return state
    }
}