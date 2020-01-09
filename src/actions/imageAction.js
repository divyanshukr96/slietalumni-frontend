import axios from "axios";
import * as type from "actions/actionTypes";

export const fetchCarousel = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/carousel');
        data.data && dispatch({
            type: type.IMAGE_LIST,
            payload: data.data
        });
        return data.data ? data.data : data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const addCarousel = formData => async dispatch => {
    try {
        let form = new FormData();
        for (let field in formData) form.append(field, formData[field]);
        const {data} = await axios.post('/api/carousel', form);
        data.data && dispatch({
            type: type.IMAGE_ADD,
            payload: data.data
        });
        return data.data ? data.data : data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "carousel_upload"
        })
    }
};

export const activateCarousel = id => async dispatch => {
    try {
        const {data} = await axios.patch(`/api/carousel/${id}`);
        data.data && dispatch({
            type: type.IMAGE_UPDATE,
            payload: data.data
        });
        return data.data ? data.data : data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
        })
    }
};

export const deleteCarousel = id => async dispatch => {
    try {
        await axios.delete(`/api/carousel/${id}`);
        dispatch({
            type: type.IMAGE_DELETE,
            payload: id
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
        })
    }
};
