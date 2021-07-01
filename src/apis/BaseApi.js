import axios from 'axios';

axios.defaults.baseURL = 'https://parseapi.back4app.com/';

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