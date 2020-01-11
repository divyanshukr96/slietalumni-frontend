import * as type from './actionTypes'
import axios from 'axios';

export const getFeaturedAlumni = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/featured-alumni');
        data.data && dispatch({
            type: type.FEATURED_ALUMNI,
            payload: data.data
        });
    } catch ({response}) {
        response ? dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        }) : dispatch({
            type: type.FEATURED_ALUMNI,
            payload: []
        });
    }
};

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
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "new_featured_alumni",
        })
    }
};

export const updateFeaturedAlumni = (id, formData) => async dispatch => {
    try {
        let form = new FormData();
        for (const field in formData) form.append(field, formData[field]);
        form.append("_method", "PATCH");
        const {data} = await axios.post(`/api/featured-alumni/${id}`, form);
        data.data && dispatch({
            type: type.FEATURED_ALUMNI_UPDATE,
            payload: data.data
        });
        return true;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "featured_alumni_update",
        })
    }
};


export const searchAlumni = search => async dispatch => {
    try {
        const {data} = await axios.get(`/api/featured-alumni/${search}?alumni`);
        await dispatch({
            type: type.FEATURED_ALUMNI_SEARCH,
            payload: data.data
        });
        return true;
    } catch ({response}) {
        response && await dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        });
    }
};

export const deleteFeaturedAlumni = (id) => async dispatch => {
    try {
        await axios.delete('/api/featured-alumni/' + id);
        await dispatch({
            type: type.FEATURED_ALUMNI_DELETE,
            payload: id
        });
        return true;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        });
    }
};
