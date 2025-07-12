// lib/auth.ts

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  profile_photo_url: string;
  created_at: string | null;
  updated_at: string | null;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: string;
  role: string;
}

export interface CurrentUserResponse {
  user: User;
}

const API_BASE_URL = 'https://api.techsisterskenya.org/api';

/**
 * Get the stored authentication token
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

/**
 * Get the stored user information
 */
export const getStoredUserInfo = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('user_info');
};

/**
 * Get the stored user role
 */
export const getUserRole = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('user_role');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Clear all authentication data
 */
export const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_info');
  localStorage.removeItem('user_role');
};

/**
 * Store authentication data
 */
export const storeAuthData = (token: string, user: string, role: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_info', user);
  localStorage.setItem('user_role', role);
};

/**
 * Get current user information from API
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid, clear auth data
        clearAuthData();
        return null;
      }
      throw new Error('Failed to fetch user data');
    }

    const data: CurrentUserResponse = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

/**
 * Login user
 */
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid email or password');
    } else if (response.status === 422) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid input. Please check your email and password.');
    } else {
      throw new Error('Login failed. Please try again.');
    }
  }

  const data: AuthResponse = await response.json();
  storeAuthData(data.token, data.user, data.role);
  return data;
};

interface RegisterResponse {
  token?: string;
  user?: User;
  message?: string;
}

/**
 * Register new user
 */
export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: userData.firstName,
      last_name: userData.lastName,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password,
    }),
  });

  if (!response.ok) {
    if (response.status === 422) {
      const errorData = await response.json();
      if (errorData.errors) {
        const errorMessages = Object.values(errorData.errors).flat();
        throw new Error(errorMessages.join(', '));
      } else {
        throw new Error(errorData.message || 'Validation failed. Please check your input.');
      }
    } else if (response.status === 409) {
      throw new Error('An account with this email already exists.');
    } else {
      throw new Error('Registration failed. Please try again.');
    }
  }

  return await response.json();
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
  const token = getAuthToken();

  if (token) {
    try {
      // If your API has a logout endpoint, call it here
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
      // Continue with clearing local data even if API call fails
    }
  }

  clearAuthData();
};

/**
 * Create authenticated fetch wrapper
 */
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If we get a 401, clear auth data and redirect to login
  if (response.status === 401) {
    clearAuthData();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  return response;
};
