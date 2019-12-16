import thunk from "redux-thunk";
import {logger} from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import {createBrowserHistory} from "history";
import {routerMiddleware} from "connected-react-router";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import createRootReducer from '../reducers/reducer'

export const history = createBrowserHistory();

const initialState = {};

const middleware = process.env.NODE_ENV === 'production' ?
    applyMiddleware(
        routerMiddleware(history),
        thunk,
    ) : composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            logger
        )
    );

export const configureStore = () => createStore(
    createRootReducer(history),
    initialState,
    middleware
);

export default configureStore;