import * as type from 'actions/actionTypes'

const initialState = {
    isAuthenticated: false,
    errors: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN_SUCCESS:
            return {...state, authenticated: true, ...action.payload};
        // case UNAUTHENTICATED:
        //     return {...state, authenticated: false};
        case type.LOGIN_ERROR:
            return {...state, errors: action.payload.errors};
        case "LOGIN_ERROR_CLEAR":
            return {...state, errors: {}};
        default:
            return state;
    }
}