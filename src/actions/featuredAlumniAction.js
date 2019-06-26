import * as type from './actionTypes'
import axios from 'axios';

export const addFeaturedAlumni = formData => async dispatch => {
    try {
        let form = new FormData();
        for (const field in formData) form.append(field, formData[field]);
        const {data} = await axios.post('/api/featured-alumni', form);
        data.data && dispatch({
            type: type.FEATURED_ALUMNI_ADD,
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

export const getFeaturedAlumni = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/featured-alumni');
        data.data && dispatch({
            type: type.FEATURED_ALUMNI,
            payload: data.data
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const searchAlumni = search => async (dispatch, getState) => {
    const {alumniDatabase: {alumni, editingKey}} = getState();
    try {
        const {data} = await axios.get(`/api/featured-alumni/${search}?alumni`);
        await dispatch({
            type: type.FEATURED_ALUMNI_SEARCH,
            payload: data
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