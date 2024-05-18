import axios, { AxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;
type PayLoadTypes<T> = {
    [key: string]: T;
};

const makeGetRequest = (
    url: string,
    config: AxiosRequestConfig<any> | undefined
) => {
    return axios
        .get(API_URL + url, {
            ...config,
        })
        .then((response) => response)
        .catch((error) => error.response);
};

function makePostRequest<T>(
    url: string,
    bodyFormData: PayLoadTypes<T> | FormData | string | null,
    config: AxiosRequestConfig<any> | undefined
) {
    return axios
        .post(API_URL + url, bodyFormData, {
            ...config,
            withCredentials: true,
        })
        .then((response) => response)
        .catch((error) => error.response);
}

export { makeGetRequest, makePostRequest};