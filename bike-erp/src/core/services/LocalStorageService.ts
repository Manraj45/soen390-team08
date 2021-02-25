import axios from "axios";

const localStorageService = (() => {
    return {
        setToken: (token: any) => {
            localStorage.setItem('access_token', token['accessToken']);
            localStorage.setItem('refresh_token', token['refreshToken']);
        },
        getAccessToken: () => {
            return localStorage.getItem('access_token');
        },
        getRefreshToken: () => {
            return localStorage.getItem('refresh_token');
        },
        clearAllTokens: () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
        setBearerToken: () => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token');
        }
    }
})();

export default localStorageService;