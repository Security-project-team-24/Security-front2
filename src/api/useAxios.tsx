import { useApplicationStore } from '../store/application.store';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
export const mainInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const useAxios = () => {
  const token = useApplicationStore((state) => state.loginStateRes.data);
  const setToken = useApplicationStore((state) => state.setLoginData);
  const logout = useApplicationStore((state) => state.logout);

  const getRefreshToken = async () => {
    try {
      const resp = await axiosInstance.get('/auth/refresh', {
        withCredentials: true,
      });
      return resp.data.accessToken;
    } catch (e: any) {
      console.log(e);
      return null;
    }
  };

  mainInstance.interceptors.request.use((request) => {
    if (!request.headers.Authorization) {
      request.headers.setAuthorization(`Bearer ${token}`);
    }
    return request;
  });

  mainInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await getRefreshToken();
        if (!newAccessToken || newAccessToken === '') {
          logout();
          return Promise.reject(error);
        }
        setToken(newAccessToken);
        prevRequest.headers.setAuthorization(`Bearer ${newAccessToken}`);
        return mainInstance(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return { axios: mainInstance };
};
