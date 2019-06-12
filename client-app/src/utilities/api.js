const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    contentType: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

export const getToken = () => {
    sessionStorage.getItem('token');
}

export const setToken = (token) => {
    sessionStorage.setItem('token', token);
}

export const getRequest = (url, params, token) => {
    return instance.get(url, {
        params: params,
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

export const postRequest = (url, params, token) => {
    return instance.post(url, {
        params: params,
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}