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
            payload: response.data,
            name: "add_new_role",
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
            payload: response.data,
            name: "edit_role",
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
        response ? dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        }) : dispatch({
            type: type.ROLE_LIST,
            payload: []
        });
    }
    try {
        const {data} = await axios.get('/api/permissions');
        data.data && dispatch({
            type: type.PERMISSION_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response ? dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        }) : dispatch({
            type: type.PERMISSION_LIST,
            payload: []
        });
    }
};
