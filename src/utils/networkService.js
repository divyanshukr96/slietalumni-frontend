import axios from "axios";
// import {unauthorized} from "../actions/authActions";

if (process.env.NODE_ENV !== 'production') {
    axios.defaults.baseURL = "http://127.0.0.1:8000";
}

export default {
    setupInterceptors: (store, history) => {
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            // switch (error.response.status) {
            //     case 401:
            //         // store.dispatch(unauthorized(history));
            //         break;
            //     // case 404:
            //     //     history.push('/not-found');
            //     //     break;
            //     default:
            //         return Promise.reject(error);
            // }
            return Promise.reject(error);
        });
    },
};