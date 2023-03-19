import $api from "../http"

export interface AuthResponse {
    token: string;
}

class AuthService {
    static authEndpoint = 'auth/anonymous?platform=subscriptions';
    static tokenLocalStorageKey = 'token';
    
    static async authenticate(): Promise<void> {
        const { data } = await $api.get<AuthResponse>(AuthService.authEndpoint);
        localStorage.setItem(AuthService.tokenLocalStorageKey, data.token);
    }

    static async checkAuth(): Promise<void> {
        const token = localStorage.getItem(AuthService.tokenLocalStorageKey);
        if (!token) {
            console.log("Initial Authentication");
            AuthService.authenticate();
        }
    }
}

export default AuthService;