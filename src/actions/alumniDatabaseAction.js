import * as type from './actionTypes'
import axios from 'axios';

export const alumniDataAdd = formData => async dispatch => {
    try {
        const {data} = await axios.post('/api/alumni-data', formData);
        data.data && dispatch({
            type: type.ALUMNI_DATA_ADD,
            payload: data.data
        });
        return true;
    } catch ({response}) {
        dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const alumniDataList = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/alumni-data');
        data.data && dispatch({
            type: type.ALUMNI_DATA_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const alumniDataUpdate = (id, formData) => async (dispatch, getState) => {
    const {alumniDatabase: {alumni, editingKey}} = getState();
    try {
        const {data} = await axios.patch('/api/alumni-data/' + id, formData);
        data.data && await dispatch({
            type: type.ALUMNI_DATA_UPDATE,
            payload: data.data
        });
        if (alumni && data.data) await dispatch({
            type: type.ALUMNI_DATA_VIEW,
            payload: data.data.id
        });
        if (editingKey) await dispatch({
            type: type.ALUMNI_DATA_EDIT_CANCEL,
        });
        return true;
    } catch ({response}) {
        response && await dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        });
    }
};
export const alumniDataDelete = () => async (dispatch, getState) => {
    const {alumniDatabase: {alumni: {id}}} = getState();
    try {
        await axios.delete('/api/alumni-data/' + id);
        await dispatch({
            type: type.ALUMNI_DATA_DELETE,
            payload: id
        });
        await dispatch({
            type: type.ALUMNI_DATA_VIEW,
            payload: null
        });
        return true;
    } catch ({response}) {
        await dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        });
    }
};

export const alumniDataSearch = event => async dispatch => {
    const searchText = event.target.value;
    const reg = new RegExp(searchText, 'gi');
    await dispatch({
        type: type.ALUMNI_DATA_SEARCH,
        payload: reg
    });
};