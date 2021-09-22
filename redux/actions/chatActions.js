import { db } from "../../firebase"
import {
    GET_ALL_CHAT_USERS_REQUEST,
    GET_ALL_MESSAGES_FAIL,
    GET_ALL_MESSAGES_REQUEST,
    GET_ALL_MESSAGES_SUCCESS,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS
} from "../constants/chatConstants"
import firebase from "firebase"

const generateChannelID = (otherID, myid) => {
    if (myid > otherID) {
        return (otherID + myid)
    } else {
        return (myid + otherID)
    }
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
export const get_all_messages_Action = (id) => (dispatch) => {
    dispatch({
        type: GET_ALL_MESSAGES_REQUEST,
        payload: id
    })

    db.collection('users').doc(id).onSnapshot(user => {
        const init_chats = []
        let user_chat_rooms = []
        console.log(user.data().UserChatRooms)
        user_chat_rooms = user.data().UserChatRooms

        for (let i = 0; i < user_chat_rooms.length; i++) {
            db.collection('ChatRooms').doc(user_chat_rooms[i]).get().then(res => {
                db.collection('users').doc(res.data().sender).get().then(sender_user => {
                    init_chats.push({
                        chat_id: res.id,
                        info: res.data(),
                        sender: sender_user.data()
                    })
                })

            })
        }
        dispatch({
            type: GET_ALL_MESSAGES_SUCCESS,
            payload: { init_chats }
        })
        // console.log(chats)
    }, (error) => {
        dispatch({
            type: GET_ALL_MESSAGES_FAIL,
            payload: error.message
        })
    })

    // db.collection('chats').where('sent_to', 'in', [sent_by, sent_to]).onSnapshot(res => {
    //     const arr = []
    //     res.docs.forEach(doc => {
    //         // console.log(doc.data().sent_by)
    //         db.collection('users').doc(doc.data().sent_by).get().then(response => {
    //             arr.push({
    //                 message: doc.data().message,
    //                 seen: doc.data().seen,
    //                 sent_to: doc.data().sent_to,
    //                 id: doc.id,
    //                 name: response.data().displayName,
    //                 propic: response.data().photoURL,
    //                 time: doc.data().time,
    //                 sent_by: doc.data().sent_by
    //             })

    //         }).finally(() => {
    //             dispatch({
    //                 type: GET_ALL_MESSAGES_SUCCESS,
    //                 payload: arr
    //             })
    //         }).catch(error => {
    //             console.log(error.message)
    //             dispatch({
    //                 type: GET_ALL_MESSAGES_FAIL,
    //                 payload: error.message
    //             })
    //         })
    //     })

    // }, (error) => {
    //     console.log(error.message)
    //     dispatch({
    //         type: GET_ALL_MESSAGES_FAIL,
    //         payload: error.message
    //     })
    // })
}
