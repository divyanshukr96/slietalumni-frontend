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

export default (history) => combineReducers({
    router: connectRouter(history),
    alumniDatabase,
    featuredAlumni,
    newAlumni,
    errors,
    roles,
    users,
    eventTypes,
    images,
    events,
    news,
    auth,
})
