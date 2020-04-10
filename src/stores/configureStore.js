import thunk from "redux-thunk";
import {logger} from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import {createBrowserHistory} from "history";
import {routerMiddleware} from "connected-react-router";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import createRootReducer from '../reducers/reducer'

import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createEncryptor from 'redux-persist-transform-encrypt'

export const history = createBrowserHistory();

const initialState = {};


const encryptor = createEncryptor({
    secretKey: 'divyanshu96@slietalumni.com',
    onError: function(error) {
        localStorage.clear();
    }
});

const persistConfig = {
    key: 'slietAlumni',
    storage,
    blacklist: [],
    transforms: [encryptor]
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

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


export default () => {
    let store = createStore(
        persistedReducer,
        initialState,
        middleware
    );
    let persist = persistStore(store);
    return {store, persist}
}
