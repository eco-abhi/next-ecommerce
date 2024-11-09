import { create } from 'zustand';

export enum AuthMode {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    RESET_PASSWORD = 'RESET_PASSWORD',
    EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
    RESET_PASSWORD_REQUESTED = 'RESET_PASSWORD_REQUESTED'
}

interface AuthStore {
    mode: AuthMode;
    setMode: (mode: AuthMode) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
    message: string;
    setMessage: (message: string) => void;
    // Add helper for getting route from mode
    getRouteFromMode: (mode: AuthMode) => string;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    mode: AuthMode.LOGIN,
    setMode: (mode) => set({ mode }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: '',
    setError: (error) => set({ error }),
    message: '',
    setMessage: (message) => set({ message }),
    getRouteFromMode: (mode) => {
        const routes = {
            [AuthMode.LOGIN]: '/account/login',
            [AuthMode.REGISTER]: '/account/register',
            [AuthMode.RESET_PASSWORD]: '/account/reset-password',
            [AuthMode.EMAIL_VERIFICATION]: '/account/email-verification',
            [AuthMode.RESET_PASSWORD_REQUESTED]: '/account/reset-password-requested'
        };
        return routes[mode];
    }
}));