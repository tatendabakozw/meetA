import thunk from "redux-thunk"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import { login_user_Reducer, register_user_Reducer } from "./reducers/authReducers";
import {
    add_picture_Reducer,
    edit_bio_Reducer,
    edit_gender_Reducer,
    edit_phone_Reducer,
    edit_profile_Reducer,
    edit_username_Reducer,
    get_current_set_user_Reducer,
    get_explore_users_Reducer,
    set_user_Reducer
} from "./reducers/userReducer";
import { get_all_messages_Reducer, send_message_Reducer } from "./reducers/chatReducer";

const initialState = {
    userSignIn: {
        loading: false
    }
}

const reducer = combineReducers({
    user_register: register_user_Reducer,
    userSignIn: login_user_Reducer,
    set_user: set_user_Reducer,
    current_user: get_current_set_user_Reducer,
    edit_username: edit_username_Reducer,
    edit_phone: edit_phone_Reducer,
    edit_bio: edit_bio_Reducer,
    edit_gender: edit_gender_Reducer,
    add_picture: add_picture_Reducer,
    edit_profile: edit_profile_Reducer,
    explore_users: get_explore_users_Reducer,
    send_message: send_message_Reducer,
    get_all_messages: get_all_messages_Reducer
})

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store