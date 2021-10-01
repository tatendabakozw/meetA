import { db } from "../../firebase"
import {
    GET_ALL_CHAT_USERS_FAIL,
    GET_ALL_CHAT_USERS_REQUEST,
    GET_ALL_CHAT_USERS_SUCCESS,
    GET_ALL_MESSAGES_FAIL,
    GET_ALL_MESSAGES_REQUEST,
    GET_ALL_MESSAGES_SUCCESS,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS
} from "../constants/chatConstants"
import axios from "axios"
import { apiUrl } from "../../helpers/apiUrl"

const generateChannelID = (otherID, myid) => {
    if (myid > otherID) {
        return (otherID + myid)
    } else {
        return (myid + otherID)
    }
}

export const get_all_messages_Action = (id1, id2, token) => (dispatch) => {
    dispatch({
        type: GET_ALL_MESSAGES_REQUEST,
        payload: { id1, id2, token }
    })
    axios.get(`${apiUrl}/chat/messages/${id1}/${id2}`, {
        headers: {
            Authorization: token
        }
    }).then(res => {
        dispatch({
            type: GET_ALL_MESSAGES_SUCCESS,
            payload: res.data
        })
    }).catch(error => {
        dispatch({
            type: GET_ALL_MESSAGES_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}

export const send_message_Action = (id, token, body) => (dispatch) => {
    dispatch({
        type: SEND_MESSAGE_REQUEST,
        payload: { body }
    })

    // socket.emit("Sending Message",{
    //     body
    // })

    dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: body
    })

    // axios.post(`${apiUrl}/chat/send_message/${id}`,{body: body},{headers:{
    //     Authorization: token
    // }}).then(res=>{
    //     dispatch({
    //         type: SEND_MESSAGE_SUCCESS,
    //         payload: res.data
    //     })
    // }).catch(error=>{
    //     dispatch({
    //         type: SEND_MESSAGE_FAIL,
    //         payload: error.response && error.response.data.error
    //             ? error.response.data.error
    //             : error.message,
    //     })
    // })
    
}

//get all messages from firestore
export const get_all_user_chats_Action = (token) => (dispatch) => {
    dispatch({
        type: GET_ALL_CHAT_USERS_REQUEST,
        payload: token
    })

    axios.get(`${apiUrl}/chat/rooms/all`, {
        headers: {
            Authorization: token
        }
    }).then((res) => {
        dispatch({
            type: GET_ALL_CHAT_USERS_SUCCESS,
            payload: res.data
        })
    }).catch(error => {
        dispatch({
            type: GET_ALL_CHAT_USERS_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}
