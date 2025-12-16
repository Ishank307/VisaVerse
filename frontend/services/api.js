const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Authentication functions
export async function register(data) {
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || result.errors?.[0]?.msg || 'Registration failed');
        }

        // Store token
        if (result.token) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
        }

        return result;
    } catch (error) {
        console.error('Error in register:', error);
        throw error;
    }
}

export async function login(data) {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || result.errors?.[0]?.msg || 'Login failed');
        }

        // Store token
        if (result.token) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
        }

        return result;
    } catch (error) {
        console.error('Error in login:', error);
        throw error;
    }
}

export async function getCurrentUser() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return null;
        }

        const response = await fetch(`${API_URL}/api/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            // Token is invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return null;
        }

        const result = await response.json();
        return result.user;
    } catch (error) {
        console.error('Error in getCurrentUser:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return null;
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
}

export function getToken() {
    return localStorage.getItem('token');
}

export function getStoredUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Existing API functions...
export async function getVisaGuidance(data) {
    try {
        const response = await fetch(`${API_URL}/api/visa-guidance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to get visa guidance');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in getVisaGuidance:', error);
        throw error;
    }
}

export async function analyzeDocument(file) {
    try {
        const formData = new FormData();
        formData.append('document', file);

        const response = await fetch(`${API_URL}/api/document-analyze`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to analyze document');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in analyzeDocument:', error);
        throw error;
    }
}

export async function checkHealth() {
    try {
        const response = await fetch(`${API_URL}/api/health`);

        if (!response.ok) {
            throw new Error('Health check failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in checkHealth:', error);
        throw error;
    }
}
