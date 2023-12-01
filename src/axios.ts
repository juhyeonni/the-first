import OriginAxios from 'axios';

const axios = OriginAxios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default axios;
