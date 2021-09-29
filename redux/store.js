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
    get_single_user_Reducer,
    set_user_Reducer
} from "./reducers/userReducer";
import { get_all_messages_Reducer, send_message_Reducer } from "./reducers/chatReducer";
import { getData } from "../helpers/async-storage";
import { create_a_post_Reducer, get_all_posts_Reducer, get_a_single_post_Reducer, like_a_post_Reducer } from "./reducers/postReducer";
import { toggle_follow_Reducer } from "./reducers/followReducer";

const initialState = {
    userSignIn: {
        userInfo: getData() ? getData() : null
    }
}

const reducer = combineReducers({
    //for auth
    user_register: register_user_Reducer,
    userSignIn: login_user_Reducer,

    //for messages
    send_message: send_message_Reducer,
    get_all_messages: get_all_messages_Reducer,
    
    //for posts
    all_posts: get_all_posts_Reducer,
    create_post : create_a_post_Reducer,
    like_post: like_a_post_Reducer,
    get_single_post: get_a_single_post_Reducer,
    
    //for user actions
    get_single_user:get_single_user_Reducer,
    set_user: set_user_Reducer,
    current_user: get_current_set_user_Reducer,
    edit_username: edit_username_Reducer,
    edit_phone: edit_phone_Reducer,
    edit_bio: edit_bio_Reducer,
    edit_gender: edit_gender_Reducer,
    add_picture: add_picture_Reducer,
    edit_profile: edit_profile_Reducer,
    explore_users: get_explore_users_Reducer,
    
    // for following
    toggle_follow: toggle_follow_Reducer,
    
})

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store