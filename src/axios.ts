import OriginAxios from 'axios';

export const baseAxios = OriginAxios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const corsProxyAxios = OriginAxios.create({
  baseURL: import.meta.env.VITE_API_CORS_ANYWHERE,
});
