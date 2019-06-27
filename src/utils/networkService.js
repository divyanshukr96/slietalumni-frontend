import axios from "axios";
import {unauthorized} from "../actions/authAction";

if (process.env.NODE_ENV !== 'production') {
    axios.defaults.baseURL = "http://127.0.0.1:8000";
}

export default {
    setupInterceptors: (store, history) => {
        axios.defaults.headers.common['Accept'] = `application/json`;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            switch (error.response.status) {
                case 401:
                    store.dispatch(unauthorized());
                    history.push('/login');
                    break;
                case 403:
                    console.log('Permission denied');
                    break;
                default:
                    return Promise.reject(error);
            }
            return Promise.reject(error);
        });
        axios.interceptors.request.use(response => {
            return response;
        }, error => {
            return Promise.reject(error);
        });
    },
};