import * as type from 'actions/actionTypes'

const initialState = {
    loading: false,
    donations: [],
    data: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case type.DONATE_LOADING:
            return {...state, loading: true, data: null};
        case type.DONATE_LIST:
            return {...state, events: action.payload, loading: false};
        case type.DONATE_ADD:
            return {...state, events: [action.payload, ...state.events]};

        case type.DONATE_EDIT:
            return {...state, data: state.events.filter(event => event.id === action.payload)[0]};

        case type.DONATE_DELETE:
            return {...state, events: state.events.filter(event => event.id !== action.payload), data: null};

        case type.DONATE_UPDATE:
            const newData = [...state.events];
            const key = action.payload.id;
            const index = newData.findIndex(item => key === item.id);
            newData.splice(index, 1, {...action.payload});
            return {...state, events: newData, data: action.payload};

        default:
            return state;
    }
}

