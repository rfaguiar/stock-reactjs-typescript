import axios from "axios";
import {store} from "../redux";

const baseURL = process.env.REACT_APP_API_BASE_URL
console.log('baseURL', baseURL)
const http = axios.create({
    baseURL,
});

http.interceptors.request.use(config => {
    const token = store.getState().authentication.profile?.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`        
    }
    if (!baseURL) {
        config.url = `/api${config.url}`
    }
    return config
})

export default http;