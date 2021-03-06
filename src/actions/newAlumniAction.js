import axios from "axios";
import * as type from "actions/actionTypes";

export const alumniDataList = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/alumni');
        dispatch({
            type: type.NEW_ALUMNI_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const registration = formData => async dispatch => {
    try {
        let form = new FormData();
        for (const field in formData) form.append(field, formData[field]);
        const {data} = await axios.post('/api/alumni/registration', form);
        return data.id ? data : data.data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "alumni_registration",
        })
    }
};

export const confirmRegistration = formData => async (dispatch, getState) => {
    const {newAlumni: {alumni: {id}}} = getState();
    try {
        let form = new FormData();
        for (const field in formData) form.append(field, formData[field]);
        const {data} = await axios.post(`/api/alumni/confirm/${id}`, form);
        if (data.alreadyVerified) console.log('Already Verified');
        dispatch({
            type: type.NEW_ALUMNI_VERIFIED,
            payload: id
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "alumni_registration_confirm",
        })
    }
};

export const setUsernamePassword = formData => async dispatch => {
    try {
        const {data} = await axios.post(`/api/set-username/`, formData);
        return data.id ? data : data.data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "alumni_username_set"
        })
    }
};

export const alumniDataSearch = event => async dispatch => {
    const searchText = event.target.value;
    const reg = new RegExp(searchText, 'gi');
    await dispatch({
        type: type.NEW_ALUMNI_SEARCH,
        payload: reg
    });
};
