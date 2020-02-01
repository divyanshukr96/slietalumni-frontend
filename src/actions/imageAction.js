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


export const fetchGalleryAlbum = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/gallery/album');
        data.data && dispatch({
            type: type.GALLERY_ALBUM_LIST,
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


export const addGalleryAlbum = formData => async dispatch => {
    try {
        let form = new FormData();
        for (let field in formData) form.append(field, formData[field]);
        const {data} = await axios.post('/api/gallery/album', form);
        data.data && dispatch({
            type: type.GALLERY_ALBUM_ADD,
            payload: data.data
        });
        return data.data ? data.data : data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "gallery_album"
        })
    }
};


export const fetchGalleryImage = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/gallery/image');
        data.data && dispatch({
            type: type.GALLERY_IMAGE_LIST,
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


export const deleteGalleryImage = (id) => async dispatch => {
    try {
        await axios.delete(`/api/gallery/image/${id}`);
        dispatch({
            type: type.GALLERY_IMAGE_DELETE,
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

export const addGalleryImage = formData => async dispatch => {
    try {
        let form = new FormData();
        if (formData.constructor !== FormData) {
            for (let field in formData) {
                form.append(field, formData[field]);
            }
        } else {
            form = formData;
        }

        const {data} = await axios.post('/api/gallery/image', form);
        data.data && dispatch({
            type: type.GALLERY_IMAGE_ADD,
            payload: data.data
        });
        return data.data ? data.data : data;
    } catch ({response}) {
        response && dispatch({
            type: type.ERROR_VALIDATION,
            payload: response.data,
            name: "gallery_image"
        })
    }
};
