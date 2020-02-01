import * as type from 'actions/actionTypes'

const initialState = {
    loading: false,
    images: [],
    image: null,
    albums: [],
    gallery: [],
};


export default (state = initialState, action) => {
    switch (action.type) {
        // case type.IMAGE_LOADING:
        //     return {...state, loading: true, data: null};

        case type.IMAGE_LIST:
            return {...state, images: action.payload, loading: false};

        case type.IMAGE_ADD:
            return {...state, images: [action.payload, ...state.images]};

        case type.IMAGE_UPDATE:
            const newData = [...state.images];
            const key = action.payload.id;
            const index = newData.findIndex(item => key === item.id);
            newData.splice(index, 1, {...action.payload});
            return {...state, images: newData};

        case type.IMAGE_DELETE:
            return {...state, images: state.images.filter(e => e.id !== action.payload)};


        case type.GALLERY_ALBUM_LIST:
            return {...state, albums: action.payload};

        case type.GALLERY_ALBUM_ADD:
            return {...state, albums: [action.payload, ...state.albums]};

        case type.GALLERY_IMAGE_LIST:
            return {...state, gallery: action.payload};

        case type.GALLERY_IMAGE_ADD:
            return {...state, gallery: [action.payload, ...state.gallery]};

        case type.GALLERY_IMAGE_DELETE:
            return {...state, gallery: state.gallery.filter(data => data.id !== action.payload)};

        //
        // case type.IMAGE_EDIT:
        //     return {...state, data: state.eventTypes.filter(event => event.id === action.payload)[0]};
        //

        default:
            return state;
    }
}

