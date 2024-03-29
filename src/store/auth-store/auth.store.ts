import { produce } from 'immer';
import { AppStore } from '../application.store';
import { StateCreator } from 'zustand';
import { User } from './model/user.model';
import { Login } from './types/login.type';
import { ResponseState } from '../response-state.type';
import { toast } from 'react-toastify';
import { mainInstance } from '../../api/useAxios';
import axios from 'axios';
import { TwoFactorLogin } from './types/twoFactorLogin.type';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type AuthStoreState = {
  user: User | null;
  loginStateRes: ResponseState<string | null>;
  registerRes: ResponseState<User | null>;
};

export type AuthActions = {
  login: (data: Login) => Promise<void>;
  passwordlessLogin: (token: string) => Promise<void>;
  logout: () => void;
  fetchLoggedUser: (token: string) => Promise<void>;
  setLoginData: (token: string) => void;
  twoFactorAuthenticationLogin: (data: TwoFactorLogin) => Promise<void>;
};

export const state: AuthStoreState = {
  user: null,
  loginStateRes: {
    data: null,
    status: 'IDLE',
    error: null,
  },
  registerRes: {
    data: null,
    status: 'IDLE',
    error: null,
  },
};

export type AuthStore = AuthStoreState & AuthActions;

export const authStoreSlice: StateCreator<AppStore, [], [], AuthStore> = (
  set,
  get
) => ({
  ...state,
  login: async (body: Login) => {
    set(
      produce((state: AuthStoreState) => {
        state.loginStateRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const resp = await mainInstance.post(`/auth/login`, body);
      await get().fetchLoggedUser(resp.data.accessToken);
      set(
        produce((state: AuthStoreState) => {
          state.loginStateRes.status = 'SUCCESS';
          state.loginStateRes.data = resp.data.accessToken;
          return state;
        })
      );
      toast.success('Successfully logged in!');
    } catch (e: any) {
      console.log(e);
      set(
        produce((state: AuthStoreState) => {
          state.loginStateRes.status = 'ERROR';
          state.loginStateRes.data = null;
          state.loginStateRes.error = e.response.data.message;
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
  passwordlessLogin: async (token: string) => {
    set(
      produce((state: AuthStoreState) => {
        state.loginStateRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const resp = await axios.post(
        `${BASE_URL}/auth/passwordless/login/${token}`,
        {}
      );
      await get().fetchLoggedUser(resp.data.accessToken);
      set(
        produce((state: AuthStoreState) => {
          state.loginStateRes.status = 'SUCCESS';
          state.loginStateRes.data = resp.data.accessToken;
          return state;
        })
      );
      toast.success('Successfully logged in!');
    } catch (e: any) {
      console.log(e);
      set(
        produce((state: AuthStoreState) => {
          state.loginStateRes.status = 'ERROR';
          state.loginStateRes.data = null;
          state.loginStateRes.error = e.response.data.message;
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
  logout: () => {
    mainInstance.get('/logout').then(console.log).catch(console.log);
    set(
      produce((state: AuthStore) => {
        state.loginStateRes.status = 'IDLE';
        state.loginStateRes.data = null;
        state.user = null;
        return state;
      })
    );
  },
  fetchLoggedUser: async (token: string) => {
    try {
      const resp = await mainInstance.get(`/auth/current`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      set(
        produce((state) => {
          state.user = resp.data;
          return state;
        })
      );
    } catch (e: any) {
      set(
        produce((state) => {
          state.user = null;
          return state;
        })
      );
    }
  },
  setLoginData: (token: string) => {
    set(
      produce((state) => {
        state.loginStateRes.data = token;
        return state;
      })
    );
  },
  twoFactorAuthenticationLogin: async (login: TwoFactorLogin) => {
    set(
      produce((state: AuthStoreState) => {
        state.loginStateRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const resp = await mainInstance.post(`/auth/twofactor/login`, login);
      await get().fetchLoggedUser(resp.data.accessToken);
      set(
        produce((state: AuthStoreState) => {
          state.loginStateRes.status = 'SUCCESS';
          state.loginStateRes.data = resp.data.accessToken;
          return state;
        })
      );
      toast.success('Successfully logged in!');
    } catch (e: any) {
      console.log(e);
      set(
        produce((state: AuthStoreState) => {
          state.loginStateRes.status = 'ERROR';
          state.loginStateRes.data = null;
          state.loginStateRes.error = e.response.data.message;
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
});
