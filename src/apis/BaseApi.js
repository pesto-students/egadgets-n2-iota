import axios from 'axios';

axios.defaults.baseURL = 'https://iota.b4a.io';

// axios.interceptors.request.use((request) => {
//   request.headers['X-Parse-Application-Id'] =
//     'NZK11KBs4bC0ErXQN01qEKU3a3WVWgnr6EM0Syoc';
//   request.headers['X-Parse-REST-API-Key'] =
//     'pVDT4kF8JhQvA7iYffZOv9hKzC1mCBVKwbZQPlpz';
//   return request;
// });

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body, headers = null) =>
        axios.post(url, body, headers).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    del: (url) => axios.delete(url).then(responseBody),
};

const categoryService = {
    list: () => requests.get('/classes/Categories'),
};

const productService = {
    list: () => requests.get('/classes/Categories'),
};

const authService = {
    signup: (user) =>
        requests.post('/users', user, {
            'X-Parse-Revocable-Session': 1,
        }),
};

const BaseAPI = { categoryService, productService, authService };
export default BaseAPI;