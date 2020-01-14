import * as type from './actionTypes'
import axios from 'axios';

export const donate = formData => async dispatch => {
    try {
        let form = new FormData();
        for (let field in formData) form.append(field, formData[field]);
        const {data} = await axios.post('/api/donation', form);
        data.data && dispatch({
            type: type.DONATE_ADD,
            payload: data.data
        });
        return data.id ? data.id : data.data.id;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "donation_form"
        })
    }
};

export const fetchDonation = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/donation');
        data.data && dispatch({
            type: type.DONATE_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response ? dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
        }) : dispatch({
            type: type.DONATE_LIST,
            payload: []
        });
    }
};

export const confirmDonation = (id, formData) => async dispatch => {
    try {
        const {data} = await axios.patch(`/api/donation/${id}`, formData);
        data.data && dispatch({
            type: type.DONATE_UPDATE,
            payload: data.data
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "donation_confirmation",
        });
    }
};

export const donationDataSearch = event => async dispatch => {
    const searchText = event.target.value;
    const reg = new RegExp(searchText, 'gi');
    await dispatch({
        type: type.DONATE_SEARCH,
        payload: reg
    });
};
