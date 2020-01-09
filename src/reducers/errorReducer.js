import * as type from 'actions/actionTypes'

const initialState = {
    errors: {},
    name: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.ERROR_VALIDATION:
            return {...state, errors: action.payload.errors, name: action.name, ...action.payload};
        case type.ERROR_CLEAR:
            return {...state, errors: {}, name: null};
        default:
            return state;
    }
}
