import axios from "axios";
import { storage } from "../../firebase";
import { apiUrl } from "../../helpers/apiUrl";
import { getRandomString } from "../../helpers/getRandomString";
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS } from "../constants/postConstants"

const random_string = getRandomString(8)

export const create_a_post_Action = (body, picture, location, displayName, token) => (dispatch) => {
    dispatch({
        type: CREATE_POST_REQUEST
    })

    const ref = storage.ref(`/images/posts/${displayName}/${random_string}`)
    ref.put(picture).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
            console.log(' * new url', url)
            axios.post(`${apiUrl}/posts/create`, {
                body,
                pictureUrl: url,
                location,
                title: ''
            }, {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                dispatch({
                    type: CREATE_POST_SUCCESS,
                    payload: res
                })
            }).catch(error => {
                dispatch({
                    type: CREATE_POST_FAIL,
                    payload: error.response && error.response.data.error
                        ? error.response.data.error
                        : error.message,
                })
            })
        }).catch(error => {
            dispatch({
                type: CREATE_POST_FAIL,
                payload: error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
            })
        })
    })

}