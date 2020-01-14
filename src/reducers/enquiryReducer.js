import * as type from 'actions/actionTypes'
import * as _ from "lodash";

const initialState = {
    loading: false,
    enquiriesList: [],
    enquiries: [],
    data: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case type.ENQUIRY_LOADING:
            return {...state, loading: true, data: null};

        case type.ENQUIRY_LIST:
            return {...state, enquiriesList: action.payload, enquiries: action.payload, loading: false};


        case type.ENQUIRY_VIEW:
            return {...state, data: state.enquiries.filter(donate => donate.id === action.payload)[0]};


        case type.ENQUIRY_SEARCH:
            return {...state, enquiries: enquiriesDataFilter(state.enquiriesList, action.payload)};

        default:
            return state;
    }
}

const enquiriesDataFilter = (enquiriesList, regEx) => _.flatMap(enquiriesList, enquiries => {
    const m = enquiries.mobile ? enquiries.mobile.match(regEx) : null;
    const name = enquiries.name ? enquiries.name.match(regEx) : null;
    const sub = enquiries.subject ? enquiries.subject.match(regEx) : null;

    if (!name && !m && !sub) {
        return null;
    }
    return {
        ...enquiries,
    };
}).filter(enquiries => !!enquiries);
