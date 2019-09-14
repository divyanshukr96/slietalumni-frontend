import * as type from 'actions/actionTypes'

const initialState = {
    loading: false,
    images: [],
    image: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        // case type.IMAGE_LOADING:
        //     return {...state, loading: true, data: null};
        case type.IMAGE_LIST:
            return {...state, images: action.payload, loading: false};
        case type.IMAGE_ADD:
            return {...state, images: [action.payload, ...state.images]};
        //
        // case type.IMAGE_EDIT:
        //     return {...state, data: state.eventTypes.filter(event => event.id === action.payload)[0]};
        //
        // case type.IMAGE_DELETE:
        //     return {...state, eventTypes: state.eventTypes.filter(event => event.id !== action.payload), data: null};

        default:
            return state;
    }
}

