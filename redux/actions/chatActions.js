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
import firebase from "firebase"
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
            type: GET_ALL_CHAT_USERS_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}

export const send_message_Action = (sent_to, sent_by, body) => (dispatch) => {
    const chat_obj = {
        chat_id: generateChannelID(sent_by, sent_to),
        last_message: body,
        createdAt: Date.now(),
        participant: sent_by
    }
    dispatch({
        type: SEND_MESSAGE_REQUEST,
        payload: { sent_by, sent_to, body }
    })
    db.collection('ChatRooms').doc(generateChannelID(sent_by, sent_to)).set({
        chatId: generateChannelID(sent_by, sent_to),
        users: [sent_to, sent_by],
        sender: sent_by,
        last_message: body,
        time: Date.now()
    }, { merge: true }).then(() => {
        db.collection('ChatRooms').doc(generateChannelID(sent_by, sent_to)).collection('messages').add({
            sender: sent_by,
            message: body,
            createdAt: Date.now(),
            msgId: '',
            status: 'unread'
        }).then(res => {
            db.collection('ChatRooms').doc(generateChannelID(sent_by, sent_to)).collection('messages').doc(res.id).update({
                msgId: res.id
            }).then(() => {
                db.collection('users').doc(sent_to).update({
                    UserChatRooms: firebase.firestore.FieldValue.arrayUnion(generateChannelID(sent_by, sent_to))
                }).then(() => {
                    db.collection('users').doc(sent_by).update({
                        UserChatRooms: firebase.firestore.FieldValue.arrayUnion(generateChannelID(sent_by, sent_to))
                    }).then((response) => {
                        dispatch({
                            type: SEND_MESSAGE_SUCCESS,
                            payload: response
                        })
                    }).catch(error => {
                        console.log(error)
                        dispatch({
                            type: SEND_MESSAGE_FAIL,
                            payload: error
                        })
                    })
                })
            }).catch(error => {
                dispatch({
                    type: SEND_MESSAGE_FAIL,
                    payload: error
                })
            })
        }).catch(error => {
            dispatch({
                type: SEND_MESSAGE_FAIL,
                payload: error
            })
        })
    }).catch(error => {
        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error
        })
    })
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
