import * as type from 'actions/actionTypes'

const initialState = {
    loading: false,
    news: [],
    data: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case type.NEWS_LOADING:
            return {...state, loading: true, data: null};
        case type.NEWS_LIST:
            return {...state, news: action.payload, loading: false};
        case type.NEWS_ADD:
            return {...state, news: [action.payload, ...state.news]};

        case type.NEWS_EDIT:
            return {...state, data: state.news.filter(item => item.id === action.payload)[0]};

        case type.NEWS_DELETE:
            return {...state, news: state.news.filter(item => item.id !== action.payload), data: null};

        case type.NEWS_UPDATE:
            const newData = [...state.news];
            const key = action.payload.id;
            const index = newData.findIndex(item => key === item.id);
            newData.splice(index, 1, {...action.payload});
            return {...state, news: newData, data: action.payload};

        default:
            return state;
    }
}

