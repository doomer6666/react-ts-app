import api from './axiosInstance';

const poster = async <T>(url: string, { arg }: { arg: T }) => {
  const response = await api.post(url, arg);
  return response.data;
};

export default poster;
