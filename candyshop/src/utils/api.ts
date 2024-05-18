import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;
type PayLoadTypes<T> = {
    [key: string]: T;
};

const makeGetRequest = (url: string) => {
    return axios
        .get(API_URL + url)
        .then((response) => response)
        .catch((error) => error.response);
};

function makePostRequest<T>(
    url: string,
    bodyFormData: PayLoadTypes<T> | FormData | string | null
) {
    return axios
        .post(API_URL + url, bodyFormData, {})
        .then((response) => response)
        .catch((error) => error.response);
}

export { makeGetRequest, makePostRequest};