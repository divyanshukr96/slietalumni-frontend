import axios from "axios";
import * as type from "actions/actionTypes";


export const fetchNews = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/news');
        data.data && dispatch({
            type: type.NEWS_LIST,
            payload: data.data
        });
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data
        })
    }
};

export const addNews = formData => async dispatch => {

    try {
        let form = new FormData();
        for (let field in formData) form.append(field, formData[field]);
        const {data} = await axios.post('/api/news', form);
        data.data && dispatch({
            type: type.NEWS_ADD,
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

export const updateNews = (id, formData) => async dispatch => {
    try {
        let form = new FormData();
        for (let field in formData) form.append(field, formData[field]);
        const {data} = await axios.post('/api/news/' + id, form);
        data.data && dispatch({
            type: type.NEWS_UPDATE,
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

export const publishNews = () => async (dispatch, getState) => {
    const {news: {data: {id}}} = getState();
    try {
        const {data} = await axios.patch(`/api/news/${id}/publish`);
        data.data && dispatch({
            type: type.NEWS_UPDATE,
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

export const deleteNews = () => async (dispatch, getState) => {
    const {news: {data: {id}}} = getState();
    try {
        await axios.delete('/api/news/' + id);
        dispatch({
            type: type.NEWS_DELETE,
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