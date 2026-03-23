// Importing libs
import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL //Imports api url
})


// Interceptor which adds tokens to api requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getITem(ACCESS_TOKEN);
        if (token) {
        config.headers.Authorization = `Bearer ${token}` //Creates access token header
        }
        return config
        
    },
    (error) => {
        return Promise.reject(error)
    }
)


export default api

