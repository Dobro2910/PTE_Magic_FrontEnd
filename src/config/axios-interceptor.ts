import axios from 'axios';
import { SERVER_API_URL, AUTH_TOKEN_KEY } from './constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common["xsrfcookiename"] = "aaaaa";
// axios.defaults.headers.common["xsrfheadername"] = "bbbb";

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = response => response;
  const onResponseError = err => {
    // console.log(JSON.stringify(err));
    // console.log(err.response);
    
	if (err) {
        let status = null
        if (err.status){
            status = err.status || err.response.status;
        }else if (err.response != null) {
            status = err.response.status;
        }

		if (status === 403 || status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      // setTimeout(function(){  window.location.href="/auth/login"; }, 0);
		  onUnauthenticated();
		}
	}
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
