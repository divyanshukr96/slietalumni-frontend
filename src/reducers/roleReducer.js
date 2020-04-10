import * as type from 'actions/actionTypes'

const initialState = {
    loading: false,
    permissions: [],
    roles: [],
    data: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case type.LOG_OUT:
            return initialState;

        case type.ROLE_LOADING:
            return {...state, loading: true, data: null};
        case type.ROLE_LIST:
            return {...state, roles: action.payload, loading: false};
        case type.PERMISSION_LIST:
            return {...state, permissions: action.payload, loading: false};

        case type.ROLE_LIST_ADD:
            return {...state, roles: [action.payload, ...state.roles]};
        case type.ROLE_EDIT:
            return {...state, data: state.roles.filter(role => role.id === action.payload)[0]};
        case type.ROLE_UPDATE:
            const newData = [...state.roles];
            const key = action.payload.id;
            const index = newData.findIndex(item => key === item.id);
            newData.splice(index, 1, {...action.payload});
            return {...state, roles: newData};

        default:
            return state;
    }
}

