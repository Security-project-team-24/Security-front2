import axios, { AxiosError } from 'axios';
import { AppStore, useApplicationStore } from '../store/application.store';
import { produce } from 'immer';
const BASE_URL = process.env.REACT_APP_BASE_URL;
type ZustandSet = (
  partial:
    | AppStore
    | Partial<AppStore>
    | ((state: AppStore) => AppStore | Partial<AppStore>),
  replace?: boolean | undefined
) => void;

const refreshTokenInstance = axios.create({
  baseURL: BASE_URL,
});

const getRefreshToken = async () => {
  try {
    refreshTokenInstance.defaults.withCredentials = true;
    const resp = await refreshTokenInstance.get('/auth/refresh');
    return resp.data.accessToken;
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

export const axiosInstance = (set: ZustandSet) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((request) => {
    const accessToken = useApplicationStore.getState().loginStateRes.data;
    if (!request.headers.Authorization) {
      request.headers.setAuthorization(`Bearer ${accessToken}`);
    }

    return request;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await getRefreshToken();
        if (!newAccessToken || newAccessToken === '') {
          return Promise.reject(error);
        }
        set(
          produce((state) => {
            state.loginStateRes.data = newAccessToken;
          })
        );
        prevRequest.headers.setAuthorization(`Bearer ${newAccessToken}`);
        return instance(prevRequest);
      }
      return Promise.reject(error);
    }
  );
  return instance;
};
