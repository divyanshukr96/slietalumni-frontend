import * as type from './actionTypes'
import axios from 'axios';

export const login = formData => async dispatch => {
    try {
        const {data} = await axios.post('/api/auth/login', formData);
        dispatch({
            type: type.LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('token', data.access_token);
    } catch ({response}) {
        dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};
