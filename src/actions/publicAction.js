import axios from "axios";
import * as type from "actions/actionTypes";

export const getCarousel = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/public/carousel');

        return data.data ? data.data : data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const contactUs = formData => async dispatch => {
    try {
        const {data} = await axios.post('/api/contact', formData);
        return data.id ? data : data.data
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "contact_form"
        })
    }
};
