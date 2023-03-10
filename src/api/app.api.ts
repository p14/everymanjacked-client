import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const setupConfig = (method: string, url: string, data: any): AxiosRequestConfig => {
  return {
    method,
    url: process.env.REACT_APP_API_URL + url,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
    },
    data,
  }
};

export const generateWorkout = (data: { category: string, length: number }): Promise<AxiosResponse> => {
  const config = setupConfig('POST', '/workouts/generate', data);
  return axios.request(config);
};

export const getAllExercises = (): Promise<AxiosResponse> => {
  const config = setupConfig('GET', '/exercises', null);
  return axios.request(config);
};

export const getStatusCheck = (): Promise<AxiosResponse> => {
  const config = setupConfig('GET', '/api/status-check', null);
  return axios.request(config);
};
