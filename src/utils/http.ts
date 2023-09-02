import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const http = axios.create({
  // baseURL:  process.env.NEST_API_HOST,
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
});

const makeHttp = (): AxiosInstance => http;

export default makeHttp;
