import * as type from 'actions/actionTypes'
import * as _ from "lodash";

const initialState = {
    featured: [],
    alumni: [],
    data: null,
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


        case type.ALUMNI_DATA_VIEW:
            return {...state, alumni: state.data.filter(alumni => alumni.id === action.payload)[0]};
        case type.ALUMNI_DATA_EDIT:
            return {...state, editingKey: action.payload};
        case type.ALUMNI_DATA_EDIT_CANCEL:
            return {...state, editingKey: action.payload};
        case type.ALUMNI_DATA_SEARCH:
            return {...state, data: dataFilter(state, action.payload)};
        case type.ALUMNI_DATA_UPDATE:
            return {...state, dataList: dataUpdate(state.dataList, action), data: dataUpdate(state.data, action)};
        case type.ALUMNI_DATA_DELETE:
            return {
                ...state,
                dataList: state.data.filter(alumni => alumni.id !== action.payload),
                data: state.data.filter(alumni => alumni.id !== action.payload)
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

const dataFilter = (state, reg) => _.flatMap(state.dataList, record => {
    const nameMatch = record.name.match(reg);
    const e = record.email ? record.email.match(reg) : null;
    const m = record.mobile ? record.mobile.match(reg) : null;
    const pr = record.programme ? record.programme.match(reg) : null;
    const b = record.branch ? record.branch.match(reg) : null;
    const ba = record.batch ? record.batch.toString().match(reg) : null;
    const p = record.passing ? record.passing.toString().match(reg) : null;
    if (!nameMatch && !e && !m && !pr && !b && !ba && !p) {
        return null;
    }
    return {
        ...record,
    };
}).filter(record => !!record);