import {
    LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../constants/authConstants"
import { removeData, storeData } from "../../helpers/async-storage";
import axios from 'axios'
import { apiUrl } from "../../helpers/apiUrl";

//register user
export const register_user_Action = (email, password, username) => (dispatch) => {
    dispatch({
        type: REGISTER_USER_REQUEST
    })
    axios.post(`${apiUrl}/auth/register`, {
        email: email,
        password: password,
        username: username
    }).then(res => {
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: res
        })
    }).catch(error => {
        console.log(error.response.data.error)
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}

//login user using email and passworc
export const login_user_Action = (email, password) => (dispatch) => {
    dispatch({
        type: LOGIN_USER_REQUEST
    })
    axios.post(`${apiUrl}/auth/login`, { email, password }).then(response => {
        const user = {
            displayName: response.data.user.displayName,
            _id: response.data.user._id,
            email: response.data.user.email,
            verified: response.data.user.verified,
            photoURL: response.data.user.photoURL,
            phoneNumber: response.data.user.phoneNumber,
            bio: response.data.user.bio,
            gender: response.data.user.gender,
            address: response.data.user.address,
            token: response.data.token
        }
        storeData(user).then((resp) => {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: resp
            })
        }).catch(error => {
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
            })
        })

    }).catch(error => {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}

//logout user
export const logout_user = (token) => (dispatch) => {
    dispatch({
        type: LOGOUT_REQUEST
    })
    axios.post(`${apiUrl}/auth/logout`, {
        Headers: { Authorization: token }
    }).then(() => {
        removeData().then((res) => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res
            })
        }).catch(error => {
            dispatch({
                type: LOGOUT_FAIL,
                payload: error.message
            })
        })
    }).catch(error => {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })

}