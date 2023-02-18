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
