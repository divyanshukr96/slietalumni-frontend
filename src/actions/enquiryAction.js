import * as type from './actionTypes'
import axios from 'axios';

export const fetchEnquiry = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/contact');
        data.data && dispatch({
            type: type.ENQUIRY_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response ? dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
        }) : dispatch({
            type: type.ENQUIRY_LIST,
            payload: []
        });
    }
};

export const enquiryDataSearch = event => async dispatch => {
    const searchText = event.target.value;
    const reg = new RegExp(searchText, 'gi');
    await dispatch({
        type: type.ENQUIRY_SEARCH,
        payload: reg
    });
};
