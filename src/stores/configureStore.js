import thunk from "redux-thunk";
// import {logger} from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import {createBrowserHistory} from "history";
import {routerMiddleware} from "connected-react-router";
// import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import createRootReducer from '../reducers/reducer'

export const history = createBrowserHistory();

const initialState = {};

const configureStore = () => createStore(
    createRootReducer(history),
    initialState,
    // composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            // logger
        )
    // )
);

export default configureStore;