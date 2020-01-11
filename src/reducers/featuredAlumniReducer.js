import * as type from 'actions/actionTypes'
// import * as _ from "lodash";

const initialState = {
    featured: [],
    alumni: [],
    data: null,
    featuredAlumni: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.FEATURED_ALUMNI:
            return {...state, featured: action.payload};

        case type.FEATURED_ALUMNI_SEARCH:
            return {...state, alumni: action.payload || []};

        case type.FEATURED_ALUMNI_SELECT:
            return {...state, data: state.alumni.filter(e => e.id === action.payload)[0]};

        case type.FEATURED_ALUMNI_ADD:
            return {...state, featured: [action.payload, ...state.featured]};

        case type.FEATURED_ALUMNI_VIEW:
            return {...state, featuredAlumni: state.featured.filter(alumni => alumni.id === action.payload)[0]};

        case type.FEATURED_ALUMNI_UPDATE:
            return {...state, featured: dataUpdate(state.featured, action), featuredAlumni: action.payload};

        case type.FEATURED_ALUMNI_DELETE:
            return {
                ...state,
                featured: state.featured.filter(alumni => alumni.id !== action.payload),
                featuredAlumni: null
            };
        default:
            return state;
    }
}

const dataUpdate = (data, action) => {
    const newData = [...data];
    const key = action.payload.id;
    const index = newData.findIndex(item => key === item.id);
    newData.splice(index, 1, {...action.payload});
    return newData;
};
