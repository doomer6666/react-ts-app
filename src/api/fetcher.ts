import api from './axiosInstance';

export const fetcher = (url: string) => api.get(url).then(res => res.data);
