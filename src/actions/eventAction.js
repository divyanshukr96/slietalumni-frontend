import axios from "axios";
import * as type from "actions/actionTypes";


export const fetchEvents = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/events');
        data.data && dispatch({
            type: type.EVENT_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const addEvent = formData => async dispatch => {
    try {
        let form = new FormData();
        for (let field in formData) form.append(field, formData[field]);
        const {data} = await axios.post('/api/events', form);
        data.data && dispatch({
            type: type.EVENT_ADD,
            payload: data.data
        });
        return data.id ? data.id : data.data.id;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const updateEvent = (id, formData) => async dispatch => {
    try {
        let form = new FormData();
        for (let field in formData) form.append(field, formData[field]);
        const {data} = await axios.post('/api/events/' + id, form);
        data.data && dispatch({
            type: type.EVENT_UPDATE,
            payload: data.data
        });
        return data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const publishEvent = () => async (dispatch, getState) => {
    const {events: {data: {id}}} = getState();
    try {
        const {data} = await axios.patch(`/api/events/${id}/publish`);
        data.data && dispatch({
            type: type.EVENT_PUBLISH,
            payload: data.data
        });
        return data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const deleteEvent = () => async (dispatch, getState) => {
    const {events: {data: {id}}} = getState();
    try {
        await axios.delete('/api/events/' + id);
        dispatch({
            type: type.EVENT_DELETE,
            payload: id
        });
        return id;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};