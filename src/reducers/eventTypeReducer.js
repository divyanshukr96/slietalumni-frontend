import * as type from 'actions/actionTypes'

const initialState = {
    loading: false,
    eventTypes: [],
    data: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case type.EVENT_TYPE_LOADING:
            return {...state, loading: true, data: null};
        case type.EVENT_TYPE_LIST:
            return {...state, eventTypes: action.payload, loading: false};
        case type.EVENT_TYPE_ADD:
            return {...state, eventTypes: [action.payload, ...state.eventTypes]};

        case type.EVENT_TYPE_EDIT:
            return {...state, data: state.eventTypes.filter(event => event.id === action.payload)[0]};

        case type.EVENT_TYPE_DELETE:
            return {...state, eventTypes: state.eventTypes.filter(event => event.id !== action.payload), data: null};

        case type.EVENT_TYPE_UPDATE:
            const newData = [...state.eventTypes];
            const key = action.payload.id;
            const index = newData.findIndex(item => key === item.id);
            newData.splice(index, 1, {...action.payload});
            return {...state, eventTypes: newData, data: action.payload};

        default:
            return state;
    }
}

