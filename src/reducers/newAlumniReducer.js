import * as type from 'actions/actionTypes'
import * as _ from "lodash";

const initialState = {
    searchText: '',
    dataList: [],
    data: null,
    alumni: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case type.NEW_ALUMNI_LIST:
            return {...state, dataList: action.payload, data: action.payload};
        case type.NEW_ALUMNI_VIEW:
            return {...state, alumni: state.data.filter(alumni => alumni.id === action.payload)[0]};
        case type.NEW_ALUMNI_SEARCH:
            return {...state, data: dataFilter(state, action.payload)};
        case type.NEW_ALUMNI_VERIFIED:
            return {
                ...state,
                dataList: state.data.filter(alumni => alumni.id !== action.payload),
                data: state.data.filter(alumni => alumni.id !== action.payload),
                alumni: null,
            };
        default:
            return state;
    }
}

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