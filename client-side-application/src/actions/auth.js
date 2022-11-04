import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from './types';
import {updateKeyPwd} from "../api/dropbox";

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, body, config);

        if (res.data.message === "Successfully login") {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const register = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, body, config);

        if (res.data.message === "Successfully signup") {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("pwd", res.data.pwd);
            localStorage.setItem("username", res.data.username);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            return res.data;
        } else {
            dispatch({
                type: REGISTER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const logout = () => async dispatch => {
    try {
        localStorage.setItem("token", "");
        localStorage.setItem("username", "");
        dispatch({
            type: LOGOUT_SUCCESS
        });
    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};
