import * as type from 'actions/actionTypes'

const initialState = {
    authRequired: false,
    loading: false,
    isAuthenticated: false,
    errors: {},
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN_REQUIRED:
            return {...state, authRequired: action.payload};
        case type.LOGIN_LOADING:
            return {...state, loading: action.payload};
        case type.LOGIN_SUCCESS:
            return {...state, authRequired: false, isAuthenticated: true, ...action.payload};
        case type.USER_AUTHENTICATED:
            return {...state, authRequired: false, isAuthenticated: action.payload};
        case type.AUTH_USER_DETAIL:
            return {...state, user: action.payload};
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
