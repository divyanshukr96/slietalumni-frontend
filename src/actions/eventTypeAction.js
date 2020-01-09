import axios from "axios";
import * as type from "actions/actionTypes";


export const fetchEventTypes = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/event-type');
        data.data && dispatch({
            type: type.EVENT_TYPE_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response ? dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        }) : dispatch({
            type: type.EVENT_TYPE_LIST,
            payload: []
        });
    }
};

export const addEventType = formData => async dispatch => {
    try {
        const {data} = await axios.post('/api/event-type', formData);
        data.data && dispatch({
            type: type.EVENT_TYPE_ADD,
            payload: data.data
        });
        return data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "new_event_type",
        })
    }
};

export const updateEventType = (id, formData) => async dispatch => {
    try {
        const {data} = await axios.patch('/api/event-type/' + id, formData);
        data.data && dispatch({
            type: type.EVENT_TYPE_UPDATE,
            payload: data.data
        });
        return data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "event_type_update",
        })
    }
};


export const deleteEventType = () => async (dispatch, getState) => {
    const {eventTypes: {data: {id}}} = getState();
    try {
        await axios.delete('/api/event-type/' + id);
        dispatch({
            type: type.EVENT_TYPE_DELETE,
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
