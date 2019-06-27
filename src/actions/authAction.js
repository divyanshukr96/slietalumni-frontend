import * as type from './actionTypes'
import axios from 'axios';
import * as _ from 'lodash'

export const unauthorized = () => {
    localStorage.removeItem('token1');
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

export const login = formData => async dispatch => {
    try {
        dispatch({
            type: type.LOGIN_LOADING,
            payload: true
        });
        const {data} = await axios.post('/api/auth/login', formData);
        dispatch({
            type: type.LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('token', data.access_token);
        return data;
    } catch ({response}) {
        dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        });
        dispatch({
            type: type.LOGIN_LOADING,
            payload: false
        });
    }
};
