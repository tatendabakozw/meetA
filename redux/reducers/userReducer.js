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
    GET_CURRENT_USER_REQUEST,
    GET_CURRENT_USER_SUCCESS,
    GET_EXPLORE_USERS_FAIL,
    GET_EXPLORE_USERS_REQUEST,
    GET_EXPLORE_USERS_SUCCESS,
    GET_SINGLE_USER_FAIL,
    GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS,
    SET_USER_FAIL,
    SET_USER_REQUEST,
    SET_USER_SUCCESS
} from "../constants/userActions"

export const get_explore_users_Reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_EXPLORE_USERS_REQUEST:
            return { explore_loading: true }
        case GET_EXPLORE_USERS_SUCCESS:
            return { explore_loading: false, explore_users: action.payload }
        case GET_EXPLORE_USERS_FAIL:
            return { explore_loading: false, explore_error: action.payload }
        default:
            return state
    }
}

export const set_user_Reducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_REQUEST:
            return { user_loading: true }
        case SET_USER_SUCCESS:
            return { user_loading: false, userInfo: action.payload }
        case SET_USER_FAIL:
            return { user_loading: false, error: action.payload }
        default:
            return state
    }
}

export const get_current_set_user_Reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_REQUEST:
            return { loading: true }
        case GET_CURRENT_USER_SUCCESS:
            return { loading: false, user: action.payload }
        case SET_USER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//GET A SINGLE USER
export const get_single_user_Reducer = (state = {loading: false}, action) =>{
    switch (action.type) {
        case GET_SINGLE_USER_REQUEST:
            return { loading: true }
        case GET_SINGLE_USER_SUCCESS:
            return { loading: false, user: action.payload }
        case GET_SINGLE_USER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//edit username option
export const edit_username_Reducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_USERNAME_REQUEST:
            return { loading: true }
        case EDIT_USERNAME_SUCCESS:
            return { loading: false, user: action.payload, message: "Username changed!" }
        case EDIT_USERNAME_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//edit phone number option
export const edit_phone_Reducer = (state = {phone_loading: false}, action) => {
    switch (action.type) {
        case EDIT_PHONE_REQUEST:
            return { phone_loading: true }
        case EDIT_PHONE_SUCCESS:
            return { phone_loading: false, phone_user: action.payload, phone_message: "Phone number changed!" }
        case EDIT_PHONE_FAIL:
            return { phone_loading: false, phone_error: action.payload }
        default:
            return state
    }
}

// edit bio reducer
export const edit_bio_Reducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_BIO_REQUEST:
            return { loading: true }
        case EDIT_BIO_SUCCESS:
            return { loading: false, user: action.payload, message: "Bio changed!" }
        case EDIT_BIO_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// edit gender reducer
export const edit_gender_Reducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_GENDER_REQUEST:
            return { loading: true }
        case EDIT_GENDER_SUCCESS:
            return { loading: false, user: action.payload, message: "Your gender changed!" }
        case EDIT_GENDER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// edit gender reducer
export const add_picture_Reducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PICTURE_REQUEST:
            return { loading: true }
        case ADD_PICTURE_SUCCESS:
            return { loading: false, user: action.payload, profile_message: "Your picture was added" }
        case ADD_PICTURE_FAIL:
            return { loading: false, profile_error: action.payload }
        default:
            return state
    }
}

// edit gender reducer
export const edit_profile_Reducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
            return { profile_loading: true }
        case EDIT_PROFILE_SUCCESS:
            return { profile_loading: false, user: action.payload, message: "Profile picture updated" }
        case EDIT_PROFILE_FAIL:
            return { profile_loading: false, error: action.payload }
        default:
            return state
    }
}