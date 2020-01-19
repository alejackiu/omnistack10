import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jackiu02.azurewebsites.net/'
})

export default api;