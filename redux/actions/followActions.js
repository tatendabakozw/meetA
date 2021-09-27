import axios from "axios"
import { apiUrl } from "../../helpers/apiUrl"
import { TOGGLEFOLLOW_USER_FAIL, TOGGLEFOLLOW_USER_REQUEST, TOGGLEFOLLOW_USER_SUCCESS } from "../constants/followConstants"

//toggle following a user
export const toggle_follow_Action = (user, token) => (dispatch) => {
    dispatch({
        type: TOGGLEFOLLOW_USER_REQUEST
    })
    console.log(token)
    axios.patch(`${apiUrl}/user/follow/${user._id}`, {},{
        headers: {
            Authorization: token
        }
    }).then(res => {
        dispatch({
            type: TOGGLEFOLLOW_USER_SUCCESS,
            payload: res
        })
    }).catch(error => {
        console.log(error.response.data.error)
        dispatch({
            type: TOGGLEFOLLOW_USER_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}