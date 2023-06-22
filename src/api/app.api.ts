import axios, { AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';

export interface TokenData {
    AuthenticationResult: any
}

const openRequest = async (
    method: string,
    url: string,
    data: object = {},
): Promise<AxiosResponse> => {
    return axios.request({
        method,
        url: import.meta.env.VITE_API_URL + url,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
        },
        data,
    });
}

const authRequest = async (
    method: string,
    url: string,
    data: object = {},
): Promise<AxiosResponse> => {
    let accessToken = String(localStorage.getItem('AccessToken'));
    if (isTokenExpired(accessToken)) {
        accessToken = await refresh();
    }

    return axios.request({
        method,
        url: import.meta.env.VITE_API_URL + url,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Authorization': accessToken,
        },
        data,
    });
};

export const setTokenStorage = (result: TokenData): void => {
    localStorage.setItem('AccessToken', result.AuthenticationResult.AccessToken);
    localStorage.setItem('RefreshToken', result.AuthenticationResult.RefreshToken);
};

export const clearTokenStorage = (): void => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
};

export const logout = (): void => {
    clearTokenStorage();
    window.location.reload();
};

export const refresh = async (): Promise<string> => {
    const refreshToken = localStorage.getItem('RefreshToken');
    if (!refreshToken) {
        throw new Error('No Refresh Token Found');
    }

    return authRequest('POST', '/auth/refresh', { refreshToken })
        .then((response) => response.data)
        .then((data => {
            setTokenStorage(data)
            return data.AuthenticationResult.AccessToken;
        }))
        .catch((error) => console.error(error.response.data));
};

export const isExpired = (unixTime: number): boolean => {
    const expiration = unixTime * 1000;
    return expiration < Date.now();
};

export const isTokenExpired = (token: string): boolean => {
    const tokenDecoded = jwt_decode(token) as any;
    const tokenExpiration = parseInt(tokenDecoded.exp);
    if (!isExpired(tokenExpiration)) {
        return false;
    }
    return true;
};

export const generateWorkout = async (data: { category: string, length: number }): Promise<AxiosResponse> => {
    return openRequest('POST', '/workouts/generate', data);
};

export const getAllExercises = async (): Promise<AxiosResponse> => {
    return openRequest('GET', '/exercises');
};

export const getStatusCheck = async (): Promise<AxiosResponse> => {
    return openRequest('GET', '/api/status-check');
};

export const login = async (data: { username: string, password: string }) => {
    return openRequest('POST', '/auth/login', data);
};

export const register = async (data: { firstName: string, lastName: string, username: string, password: string }) => {
    return openRequest('POST', '/auth/register', data);
};

export const getUserWorkouts = async () => {
    return authRequest('GET', '/account/workouts');
};

export const getWorkout = async (workoutId: string) => {
    return authRequest('GET', `/workouts/${workoutId}`);
};

export const deleteWorkout = async (workoutId: string) => {
    return authRequest('DELETE', `/workouts/${workoutId}`);
}

export const createWorkout = async (data: object) => {
    return authRequest('POST', `/workouts`, data);
}

export const updateUserWorkout = async (workoutId: string, data: object) => {
    return authRequest('PUT', `/workouts/${workoutId}`, data);
}

export const getWorkoutWithExercises = async (workoutId: string) => {
    return authRequest('GET', `/workouts/${workoutId}/exercises`);
}

export const updateUser = async (data: object) => {
    return authRequest('PUT', `/account`, data);
}
