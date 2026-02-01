export interface User {
    id: string;
    email: string;
    // Add other user properties as needed
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user?: User; // Optional if backend returns user info
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name?: string;
    // Add other registration fields
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}
