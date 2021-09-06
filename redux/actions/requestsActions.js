import { db } from "../../firebase"
import { SEND_REQUEST_REQUEST } from "../constants/requestsConstants"

export const sent_request_Action = (sender, receiver) => (dispatch) =>{
    dispatch({
        type: SEND_REQUEST_REQUEST,
        payload: {sender, receiver}
    })
    db.collection('requests').doc().set({
        sender: sender,
        receiver: receiver,
        requested: true
    }).then(res=>{
        db.collection('contacts').doc()
    })
}