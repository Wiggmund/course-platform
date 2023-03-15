import axios from 'axios';
import InterceptorException from '../exceptions/InterceptorException';
import AuthService, { AuthResponse } from '../services/AuthService';


export class ServerApi {
    static getBaseUrl = () => {
        const host = process.env.REACT_APP_HOST;
        const apiVersion = process.env.REACT_APP_API_VERSION;
    
        return `${host}/${apiVersion}`
    };
}


const $api = axios.create({
    baseURL: ServerApi.getBaseUrl(),
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL
    }
});

$api.interceptors.request.use((config) => {
    const token = `Bearer ${localStorage.getItem(AuthService.getLocalStorageTokenKey())}`;
    config.headers.Authorization = token;
    return config;
});

$api.interceptors.response.use(response => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !error.config._isRetry) {
        try {
            originalRequest._isRetry = true;
            const response = await axios.get<AuthResponse>(`${ServerApi.getBaseUrl()}/${AuthService.getAuthEndpoint()}`);
            localStorage.setItem(AuthService.getLocalStorageTokenKey(), response.data.token);
            return $api.request(originalRequest);
        } catch(err) {
            throw new InterceptorException('response');
        }
    }
});



export default $api;