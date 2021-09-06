import {
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_USER_FAIL, 
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../constants/authConstants";

export const register_user_Reducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return { loading: true, success : false }
        case REGISTER_USER_SUCCESS:
            return { loading: false, userInfo: action.payload, message: 'Registration Successful', success : true }
        case REGISTER_USER_FAIL:
            return { loading: false, error: action.payload, success : false }
        default:
            return state
    }
}

//logi user
export const login_user_Reducer = (state = {loading: false}, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return { loading: true }
        case LOGIN_USER_SUCCESS:
            return { loading: false, userInfo: action.payload, message: 'Login Successful' }
        case LOGIN_USER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//logi user
export const logout_user_Reducer = (state = {loading: false}, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return { loading: true }
        case LOGOUT_SUCCESS:
            return { loading: false, userInfo: action.payload, message: 'Logout Successful' }
        case LOGOUT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}