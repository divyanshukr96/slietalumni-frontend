import axios from "axios";
import * as type from "actions/actionTypes";


export const addNewRoles = formData => async dispatch => {
    try {
        const {data} = await axios.post('/api/roles', formData);
        data.data && dispatch({
            type: type.ROLE_LIST_ADD,
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

export const updateRole = formData => async (dispatch, getState) => {
    const {roles: {data: {id}}} = getState();
    try {
        const {data} = await axios.patch('/api/roles/' + id, formData);
        data.data && dispatch({
            type: type.ROLE_UPDATE,
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

export const updatePermission = formData => async dispatch => {
    try {
        const {data} = await axios.post('/api/permissions', formData);
        data.data && dispatch({
            type: type.ROLE_LIST_ADD,
            payload: data.data
        });
        return data;
    } catch ({response}) {
        dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};


export const fetchRolesPermissions = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/roles');
        data.data && dispatch({
            type: type.ROLE_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
    try {
        const {data} = await axios.get('/api/permissions');
        data.data && dispatch({
            type: type.PERMISSION_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};