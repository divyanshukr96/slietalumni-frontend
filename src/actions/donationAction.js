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
