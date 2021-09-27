import { auth, db, storage } from "../../firebase"
import {
    ADD_PICTURE_FAIL,
    ADD_PICTURE_REQUEST,
    ADD_PICTURE_SUCCESS,
    EDIT_BIO_FAIL,
    EDIT_BIO_REQUEST,
    EDIT_BIO_SUCCESS,
    EDIT_GENDER_FAIL,
    EDIT_GENDER_REQUEST,
    EDIT_GENDER_SUCCESS,
    EDIT_PHONE_FAIL,
    EDIT_PHONE_REQUEST,
    EDIT_PHONE_SUCCESS,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_USERNAME_FAIL,
    EDIT_USERNAME_REQUEST,
    EDIT_USERNAME_SUCCESS,
    GET_CURRENT_USER_FAIL,
    GET_CURRENT_USER_REQUEST,
    GET_CURRENT_USER_SUCCESS,
    GET_EXPLORE_USERS_FAIL,
    GET_EXPLORE_USERS_REQUEST,
    GET_EXPLORE_USERS_SUCCESS,
    GET_SINGLE_USER_FAIL,
    GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS,
} from "../constants/userActions"
import firebase from "firebase"
import { getData } from "../../helpers/async-storage"
import axios from "axios"
import { apiUrl } from "../../helpers/apiUrl"

//get all uewrs fot explore page... 6 at a time
export const get_explore_users_Action = (token) => (dispatch) => {
    dispatch({
        type: GET_EXPLORE_USERS_REQUEST,
        payload: token
    })

    // console.log(user_info)
    axios.get(`${apiUrl}/user/explore`,{headers: {Authorization: token}}).then(res => {
        dispatch({
            type: GET_EXPLORE_USERS_SUCCESS,
            payload: res.data.users
        })
    }).catch(error => {
        dispatch({
            type: GET_EXPLORE_USERS_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}

//get current user info
export const get_current_set_user_Action = (id) => (dispatch) => {
    dispatch({
        type: GET_CURRENT_USER_REQUEST,
        payload: { id }
    })
    getData().then(res => {
        dispatch({
            type: GET_CURRENT_USER_SUCCESS,
            payload: res
        })
    }).catch(error => {
        dispatch({
            type: GET_CURRENT_USER_FAIL,
            payload: error
        })
    })

}

//get single user
export const get_single_user_Action = (id) => (dispatch) => {
    dispatch({
        type: GET_SINGLE_USER_REQUEST
    })
    axios.get(`${apiUrl}/user/${id}`).then(res => {
        dispatch({
            type: GET_SINGLE_USER_SUCCESS,
            payload: res.data.user
        })
    }).catch(error => {
        dispatch({
            type: GET_SINGLE_USER_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message,
        })
    })
}

export const edit_username_Action = (id, new_username) => (dispatch) => {
    dispatch({
        type: EDIT_USERNAME_REQUEST,
        payload: { id }
    })
    auth.currentUser.updateProfile({
        displayName: new_username,
    }).then(() => {
        db.collection('users').doc(id).update({
            displayName: new_username
        }).then(res => {
            dispatch({
                type: EDIT_USERNAME_SUCCESS,
                payload: res
            })
        }).catch(error => {
            dispatch({
                type: EDIT_USERNAME_FAIL,
                payload: error.message
            })
        })
    }).catch(error => {
        dispatch({
            type: EDIT_USERNAME_FAIL,
            payload: error.message
        })
    })
}

export const edit_phone_Action = (id, phone) => (dispatch) => {
    dispatch({
        type: EDIT_PHONE_REQUEST,
        payload: { id }
    })
    db.collection('users').doc(id).update({
        phoneNumber: phone
    }).then(res => {
        dispatch({
            type: EDIT_PHONE_SUCCESS,
            payload: res
        })
    }).catch(error => {
        dispatch({
            type: EDIT_PHONE_FAIL,
            payload: error.message
        })
    })
}

export const edit_bio_Action = (id, new_bio) => (dispatch) => {
    dispatch({
        type: EDIT_BIO_REQUEST,
        payload: { id }
    })
    db.collection('users').doc(id).update({
        bio: new_bio
    }).then(res => {
        dispatch({
            type: EDIT_BIO_SUCCESS,
            payload: res
        })
    }).catch(error => {
        dispatch({
            type: EDIT_BIO_FAIL,
            payload: error.message
        })
    })
}

//edit gender action
export const edit_gender_Action = (id, gender) => (dispatch) => {
    dispatch({
        type: EDIT_GENDER_REQUEST,
        payload: { id }
    })
    db.collection('users').doc(id).update({
        gender: gender
    }).then(res => {
        dispatch({
            type: EDIT_GENDER_SUCCESS,
            payload: res
        })
    }).catch(error => {
        dispatch({
            type: EDIT_GENDER_FAIL,
            payload: error.message
        })
    })
}

//edit gender action
export const add_picture_Action = (id, picture, name) => (dispatch) => {
    dispatch({
        type: ADD_PICTURE_REQUEST,
        payload: { id, picture }
    })
    storage.ref(`/images/user/${name}`).put(picture).on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    }, (error) => {
        dispatch({
            type: ADD_PICTURE_FAIL,
            payload: error.message
        })
    }, () => {
        storage.ref('images/user').child(name).getDownloadURL().then(url => {
            db.collection('users').doc(id).update({
                picture: firebase.firestore.FieldValue.arrayUnion(url)
            })
        }).then(res => {
            dispatch({
                type: ADD_PICTURE_SUCCESS,
                payload: res
            })
        })
    })
}

//EDIT PROFILE PICTURE 
export const edit_profile_Action = (id, picture, name) => (dispatch) => {
    dispatch({
        type: EDIT_PROFILE_REQUEST,
        payload: { id }
    })
    storage.ref(`/images/propics/${name}`).put(picture).on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    }, (error) => {
        dispatch({
            type: EDIT_PROFILE_FAIL,
            payload: error.message
        })
    }, () => {
        storage.ref('images/propics').child(name).getDownloadURL().then(url => {

            auth.currentUser.updateProfile({
                photoURL: url
            }).then(() => {
                db.collection('users').doc(id).update({
                    photoURL: url
                }).then((res) => {
                    dispatch({
                        type: EDIT_PROFILE_SUCCESS,
                        payload: res
                    })
                }).catch(error => {
                    dispatch({
                        type: EDIT_PROFILE_FAIL,
                        payload: error.message
                    })
                })
            })

        })
    })
}