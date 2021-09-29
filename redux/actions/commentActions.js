import axios from "axios"
import { apiUrl } from "../../helpers/apiUrl"
import { CREATE_A_COMMENT_FAIL, CREATE_A_COMMENT_REQUEST, CREATE_A_COMMENT_SUCCESS } from "../constants/commentConstants"

export const create_a_comment_Action = (id, token, body) => (dispatch) => {
    dispatch({
        type: CREATE_A_COMMENT_REQUEST,
        payload: { id, token }
    })
    axios.post(`${apiUrl}/comment/create/${id}`, {
        body: body,
        pictureUrl: ''
    }, {
        headers: {
            Authorization: token
        }
    }).then(res => {
        dispatch({
            type: CREATE_A_COMMENT_SUCCESS,
            payload: res
        })
    }).catch(error => {
        dispatch({
            type: CREATE_A_COMMENT_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}