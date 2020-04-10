import * as type from 'actions/actionTypes'

const initialState = {
    loading: false,
    events: [],
    data: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case type.LOG_OUT:
            return initialState;

        case type.EVENT_LOADING:
            return {...state, loading: true, data: null};
        case type.EVENT_LIST:
            return {...state, events: action.payload, loading: false};
        case type.EVENT_ADD:
            return {...state, events: [action.payload, ...state.events]};

        case type.EVENT_EDIT:
            return {...state, data: state.events.filter(event => event.id === action.payload)[0]};

        case type.EVENT_DELETE:
            return {...state, events: state.events.filter(event => event.id !== action.payload), data: null};

        case type.EVENT_UPDATE:
            const newData = [...state.events];
            const key = action.payload.id;
            const index = newData.findIndex(item => key === item.id);
            newData.splice(index, 1, {...action.payload});
            return {...state, events: newData, data: action.payload};

        default:
            return state;
    }
}

