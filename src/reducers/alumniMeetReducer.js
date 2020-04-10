import * as type from 'actions/actionTypes'
import * as _ from "lodash";

const initialState = {
    searchText: '',
    dataList: [],
    data: null,
    alumni: null,
    loading: false,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case type.LOG_OUT:
            return initialState;

        case type.ALUMNI_MEET_LOADING:
            return {...state, loading: action.payload};

        case type.ALUMNI_MEET_LIST:
            return {...state, dataList: action.payload, data: action.payload};

        case type.ALUMNI_MEET_VIEW:
            return {...state, alumni: state.data.filter(alumni => alumni.id === action.payload)[0]};

        case type.ALUMNI_MEET_UPDATE:
            return {
                ...state,
                dataList: dataUpdate(state.dataList, action),
                data: dataUpdate(state.data, action),
                alumni: action.payload,
            };

        case type.ALUMNI_MEET_SEARCH:
            return {...state, data: dataFilter(state, action.payload)};

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
    const meet = record.meet_id ? record.meet_id.toString().match(reg) : null;
    if (!nameMatch && !e && !m && !pr && !b && !ba && !p && !meet) {
        return null;
    }
    return {
        ...record,
    };
}).filter(record => !!record);
