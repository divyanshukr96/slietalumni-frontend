import * as type from 'actions/actionTypes'
import * as _ from "lodash";

const initialState = {
    loading: false,
    users: [],
    data: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case type.USER_LOADING:
            return {...state, loading: true, data: null};
        case type.USER_LIST:
            return {...state, users: action.payload, loading: false};
        case type.USER_ADD:
            return {...state, users: [action.payload, ...state.users]};

        case type.USER_EDIT:
            return {...state, data: state.users.filter(user => user.id === action.payload)[0]};

        case type.USER_DELETE:
            return {...state, users: state.users.filter(user => user.id !== action.payload), data: null};

        case type.USER_UPDATE:
            const newData = [...state.users];
            const key = action.payload.id;
            const index = newData.findIndex(item => key === item.id);
            newData.splice(index, 1, {...action.payload});
            return {...state, users: newData, data: action.payload};

        default:
            return state;
    }
}

