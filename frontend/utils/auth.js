// Auth utility functions for client-side authentication

export const AUTH_TOKEN_KEY = 'visaverse_token';
export const AUTH_USER_KEY = 'visaverse_user';

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return !!token;
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch (e) {
        return null;
    }
}

/**
 * Save auth token and user data
 */
export function saveAuth(token, user) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    // Trigger auth-change event
    window.dispatchEvent(new Event('auth-change'));
}

/**
 * Clear auth data (logout)
 */
export function clearAuth() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    // Trigger auth-change event
    window.dispatchEvent(new Event('auth-change'));
}

/**
 * Get auth token
 */
export function getAuthToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
}
