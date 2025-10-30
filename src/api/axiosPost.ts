import axios from 'axios';

const poster = async (url: string, data: unknown) => {
  const response = await axios.post(url, data);
  return response.data;
};

export default poster;
