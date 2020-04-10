import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {ConnectedRouter} from 'connected-react-router'
import * as serviceWorker from './serviceWorker';
import NetworkService from "./utils/networkService"
import configureStore, {history} from "./stores/configureStore";
import routes from "./routes";
import './index.css';
import SetAuthorizationToken from "utils/setAuthorizationToken";
import {setCurrentUser, authCheck} from "actions/authAction";
import { PersistGate } from 'redux-persist/integration/react'


const {store, persist} = configureStore();

NetworkService.setupInterceptors(store, history);

const token = localStorage.token;
SetAuthorizationToken(token);
if (token) {
    store.dispatch(authCheck());
    store.dispatch(setCurrentUser(token))
}

ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
        <ConnectedRouter history={history} children={routes}/>
    </PersistGate>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
