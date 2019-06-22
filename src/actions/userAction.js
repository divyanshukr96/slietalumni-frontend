import axios from "axios";
import * as type from "actions/actionTypes";


export const fetchUsers = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/users');
        data.data && dispatch({
            type: type.USER_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const userAdd = formData => async dispatch => {
    try {
        const {data} = await axios.post('/api/users', formData);
        data.data && dispatch({
            type: type.USER_ADD,
            payload: data.data
        });
        return data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const userUpdate = (id, formData) => async dispatch => {
    try {
        const {data} = await axios.patch('/api/users/' + id, formData);
        data.data && dispatch({
            type: type.USER_UPDATE,
            payload: data.data
        });
        return data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const userDelete = () => async (dispatch, getState) => {
    const {users: {data: {id}}} = getState();
    try {
        const {data} = await axios.delete('/api/users/' + id);
        data.data && dispatch({
            type: type.USER_DELETE,
            payload: id
        });
        return data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};