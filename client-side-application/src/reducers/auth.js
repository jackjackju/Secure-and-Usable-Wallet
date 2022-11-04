import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../actions/types';

const initialState = {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token")
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    //Actions and dispatchers
    switch(type) {
        case REGISTER_SUCCESS:
            //set user info
            return {
                ...state,
                username: payload.username,
                token: payload.token,
            }
        case LOGIN_SUCCESS:
            //set user info
            return {
                ...state,
                username: payload.username,
                token: payload.token
            }
        case LOGOUT_SUCCESS:
            //clean user info
            return {
                ...state,
                username: "",
                token: ""
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            alert("Check your username or password")
        case LOGOUT_FAIL:
        default:
            return state
    };
};
