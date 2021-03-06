import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import errors from './errorReducer'
import auth from './authReducer'
import alumniDatabase from './alumniDatabaseReducer'
import newAlumni from './newAlumniReducer'
import roles from './roleReducer'
import users from './userReducer'
import eventTypes from './eventTypeReducer'
import events from './eventReducer'
import news from './newsReducer'
import featuredAlumni from './featuredAlumniReducer'
import images from './imageReducer'
import alumniMeet from './alumniMeetReducer'
import donation from "./donationReducer";
import enquiries from "./enquiryReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    alumniDatabase,
    featuredAlumni,
    alumniMeet,
    eventTypes,
    newAlumni,
    enquiries,
    donation,
    errors,
    images,
    events,
    roles,
    users,
    news,
    auth,
})
