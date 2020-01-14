import * as type from 'actions/actionTypes'
import * as _ from "lodash";

const initialState = {
    loading: false,
    donationList: [],
    donations: [],
    data: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case type.DONATE_LOADING:
            return {...state, loading: true, data: null};

        case type.DONATE_LIST:
            return {...state, donationList: action.payload, donations: action.payload, loading: false};

        case type.DONATE_ADD:
            return {
                ...state,
                donationList: [action.payload, ...state.donationList],
                donations: [action.payload, ...state.donations]
            };

        case type.DONATE_VIEW:
            console.log(state)
            return {...state, data: state.donations.filter(donate => donate.id === action.payload)[0]};

        case type.DONATE_DELETE:
            return {
                ...state,
                donationList: state.donationList.filter(donate => donate.id !== action.payload),
                donations: state.donations.filter(donate => donate.id !== action.payload),
                data: null
            };

        case type.DONATE_UPDATE:
            return {
                ...state,
                donationList: dataUpdate(state.donationList, action),
                donations: dataUpdate(state.donations, action),
                data: action.payload,
            };

        case type.DONATE_SEARCH:
            return {...state, donations: donationDataFilter(state.donationList, action.payload)};

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

const donationDataFilter = (donationList, regEx) => _.flatMap(donationList, donation => {
    const pr = donation.category ? donation.category.match(regEx) : null;
    const b = donation.amount ? donation.amount.match(regEx) : null;

    const o = donation.organisation ? donation.organisation.match(regEx) : null;
    const d = donation.designation ? donation.designation.match(regEx) : null;

    const e = donation.email ? donation.email.match(regEx) : null;
    const m = donation.mobile ? donation.mobile.match(regEx) : null;
    const name = donation.name ? donation.name.match(regEx) : null;

    if (!name && !e && !m && !pr && !b && !o && !d) {
        return null;
    }
    return {
        ...donation,
    };
}).filter(donation => !!donation);
