import $api from "../http"

export interface AuthResponse {
    token: string;
}

class AuthService {
    static async authenticate(): Promise<void> {
        const { data } = await $api.get<AuthResponse>(AuthService.getAuthEndpoint());
        localStorage.setItem(AuthService.getLocalStorageTokenKey(), data.token);
    }

    static getAuthEndpoint(): string {
        return `auth/anonymous?platform=subscriptions`;
    }

    static getLocalStorageTokenKey(): string {
        return 'token';
    }

    static async checkAuth(): Promise<void> {
        const token = localStorage.getItem(AuthService.getLocalStorageTokenKey());
        if (!token) {
            console.log("Initial Authentication");
            AuthService.authenticate();
        }
    }
}

export default AuthService