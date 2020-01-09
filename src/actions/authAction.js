import * as type from './actionTypes'
import axios from 'axios';
import * as _ from 'lodash'
import SetAuthorizationToken from "../utils/setAuthorizationToken";

export const logout = () => dispatch => {
    dispatch(unauthorized());
};

export const unauthorized = () => {
    SetAuthorizationToken(null);
    localStorage.removeItem('token');
    return {
        type: type.USER_AUTHENTICATED,
        payload: false
    }
};

export const setCurrentUser = token => {
    return {
        type: type.USER_AUTHENTICATED,
        payload: !_.isEmpty(token)
    }
};

export const authRequired = (data) => {
    return {
        type: type.LOGIN_REQUIRED,
        payload: _.isBoolean(data) ? data : true
    }
};

export const login = formData => async dispatch => {
    try {
        dispatch({
            type: type.LOGIN_LOADING,
            payload: true
        });
        const {data} = await axios.post('/api/auth/login', formData);
        SetAuthorizationToken(data.access_token);
        localStorage.setItem('token', data.access_token);
        dispatch({
            type: type.LOGIN_SUCCESS,
            payload: data
        });
        dispatch({
            type: type.LOGIN_LOADING,
            payload: false
        });
        return data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "login_form",
        });
        dispatch({
            type: type.LOGIN_LOADING,
            payload: false
        });
    }
};

export const authCheck = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/auth');
        data.data && dispatch({
            type: type.AUTH_USER_DETAIL,
            payload: data.data
        });
        return data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        });
    }
};

export const fetchDetails = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/auth');
        data.data && dispatch({
            type: type.AUTH_USER_DETAIL,
            payload: data.data
        });
        return data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        });
    }
};


export const forgotPassword = (formData) => async dispatch => {
    try {
        const {data} = await axios.post('/api/auth/password/forgot', formData);
        return data;
    } catch ({response}) {
        dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: 'forgot_password'
        });
    }
};


export const resetPassword = (formData) => async dispatch => {
    try {
        dispatch({
            type: type.LOGIN_LOADING,
            payload: true
        });
        const {data} = await axios.post('/api/auth/password/reset', formData);
        dispatch({
            type: type.LOGIN_LOADING,
            payload: false
        });
        return data;
    } catch ({response}) {
        dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "reset_password",
        });
        dispatch({
            type: type.LOGIN_LOADING,
            payload: false
        });
    }
};
