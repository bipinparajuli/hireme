import axios from "axios";
import { hasToken, getSession,  } from './Session';

const METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
}

const BASEURL = process.env.REACT_APP_API_URL;

// CHECK BELOW FOR SAMPLE DATA TO BE PASSED
class Api {
    isLoggedIn = false;

    constructor() {
        this.baseURL = BASEURL;
        this.isAlreadyFetchingAccessToken = false;
        this.getAuthenticationInfo();
    }

    getAuthenticationInfo() {
        if (hasToken()) {
            this.isLoggedIn = true;
            this.accessToken = JSON.parse(getSession()).token;
        }
    }

    // URL FOR API
    get(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.GET, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.POST, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    put(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.PUT, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    delete(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.DELETE, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    api(method, url, data) {
        this.getAuthenticationInfo();
        return new Promise((resolve, reject) => {
            let axiosConfig = {};
            axiosConfig.method = method;

            axiosConfig.url = this.baseURL + url;

            axiosConfig.headers = this.setHeaders(data);
            if (data) {
                if (data.params) axiosConfig.params = data.params;

                if (data.data) axiosConfig.data = data.data;
            }
console.log(axiosConfig);
            axios(axiosConfig)
                .then(response => {
                    console.log(response);
                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        if (!this.isAlreadyFetchingAccessToken) {
                            this.isAlreadyFetchingAccessToken = true;
                            // const auth = new Auth();
                            // auth.renewSession();
                            const newUrl = axiosConfig.url.replace(process.env.REACT_APP_API_URL, '');
                            this.api(axiosConfig.method, newUrl, axiosConfig.data);
                        }
                    } else if (error.response) {
                        console.log('ERROR', error.response);
                        reject(error.response.data);
                    }
                });
        });
    }

    setHeaders(data) {
        let headers = {};
        headers['accept-language'] = 'en';
        headers['Content-Type'] = 'application/json';

        if (data) {
            if (data.isMultipart) {
                headers['Content-Type'] = 'multipart/form-data';
            }

            if (data.headers) {
                for (var key in data.headers) {
                    if (data.headers.hasOwnProperty(key)) {
                        headers[key] = data.headers[key];
                    }
                }
            }
        }

        if (this.isLoggedIn !== false && !(data && data.skipAuth)) {
            headers['Authorization'] = 'Bearer ' + this.accessToken;
        }

        return headers;
    }
}


export default Api;