import * as type from 'actions/actionTypes'

const initialState = {
    loading: false,
    news: [],
    data: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'HELLO':
            return {...state, loading: true, data: null};

        default:
            return state;
    }
}

