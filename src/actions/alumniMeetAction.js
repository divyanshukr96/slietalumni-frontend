import axios from "axios";
import * as type from "actions/actionTypes";

export const alumniDataList = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/alumni-meet', {
            params: {
                // year: '2020'
            }
        });
        data.data && dispatch({
            type: type.ALUMNI_MEET_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response ? dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        }) : dispatch({
            type: type.ALUMNI_MEET_LIST,
            payload: []
        });
    }
};

export const meetDataUpdate = (id, formData) => async dispatch => {
    try {
        const {data} = await axios.patch(`/api/alumni-meet/${id}`, formData);
        data.data && dispatch({
            type: type.ALUMNI_MEET_UPDATE,
            payload: data.data
        });
        return data.id ? data : data.data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "alumni_meet_update"
        })
    }
};

export const meetRegister = formData => async dispatch => {
    try {
        dispatch({
            type: type.ALUMNI_MEET_LOADING,
            payload: true
        });
        const {data} = await axios.post('/api/meet/registration', formData);
        dispatch({
            type: type.ALUMNI_MEET_LOADING,
            payload: false
        });
        return data.id ? data : data.data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "alumni_meet_registration"
        });
        dispatch({
            type: type.ALUMNI_MEET_LOADING,
            payload: false
        });
    }
};

export const confirmMeetRegistration = formData => async (dispatch, getState) => {
    const {alumniMeet: {alumni: {id}}} = getState();
    try {
        let form = new FormData();
        for (const field in formData) form.append(field, formData[field]);
        const {data} = await axios.post(`/api/alumni-meet/confirm/${id}`, form);

        if (data.alreadyVerified) console.log('Already Verified');

        data.data && dispatch({
            type: type.ALUMNI_MEET_UPDATE,
            payload: data.data
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "alumni_meet_confirmation"
        })
    }
};


export const alumniDataSearch = event => async dispatch => {
    const searchText = event.target.value;
    const reg = new RegExp(searchText, 'gi');
    await dispatch({
        type: type.ALUMNI_MEET_SEARCH,
        payload: reg
    });
};
