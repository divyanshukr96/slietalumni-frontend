import * as type from 'actions/actionTypes'

const initialState = {
    errors: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.ERROR_VALIDATION:
            return {...state, errors: action.payload.errors, ...action.payload};
        case type.ERROR_CLEAR:
            return {...state, errors: {}};
        default:
            return state;
    }
}