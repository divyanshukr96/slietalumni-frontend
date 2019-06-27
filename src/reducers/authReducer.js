import * as type from 'actions/actionTypes'

const initialState = {
    loading: false,
    isAuthenticated: false,
    errors: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN_LOADING:
            return {...state, loading: action.payload};
        case type.LOGIN_SUCCESS:
            return {...state, isAuthenticated: true, ...action.payload};
        case type.USER_AUTHENTICATED:
            return {...state, isAuthenticated: action.payload};
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