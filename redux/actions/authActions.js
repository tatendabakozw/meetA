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
import { auth, db } from "../../firebase"
import { storeData } from "../../helpers/async-storage";

export const register_user_Action = (email, password) => (dispatch) => {
    dispatch({
        type: REGISTER_USER_REQUEST
    })
    auth.createUserWithEmailAndPassword(email, password).then(res => {
        if (res.additionalUserInfo.isNewUser) {
            db.collection('users').doc(res.user.uid).set({
                uid: res.user.uid,
                gender: null,
                bio: null,
                photoURL: res.user.photoURL,
                phoneNumber: res.user.phoneNumber,
                address: null,
                picture: [],
                displayName: res.user.displayName,
                UserChatRooms: []
            }).then(() => {
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    payload: res
                })
            }).catch(error => {
                dispatch({
                    type: REGISTER_USER_FAIL,
                    payload: error.message
                })
            })
        } else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: 'User Already exists   '
            })
        }
    }).catch(error => {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.message
        })
    })
}

//login user using email and passworc
export const login_user_Action = (email, password) => (dispatch) => {
    dispatch({
        type: LOGIN_USER_REQUEST
    })
    auth.signInWithEmailAndPassword(email, password).then(res => {
        storeData(res.user)
    }).finally((res) => {
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: res
        })
    }).catch(error => {
        if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: 'Please register first'
            })
        }
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.message
        })
    })
}

//logout user
export const logout_user = () => (dispatch) => {
    dispatch({
        type: LOGOUT_REQUEST
    })
    auth.signOut().then((res) => {
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
}