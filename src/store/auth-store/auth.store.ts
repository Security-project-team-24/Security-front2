import { produce } from 'immer';
import axios from 'axios';
import { AppStore } from '../application.store';
import { StateCreator } from 'zustand';
import { User } from './model/user.model';
import { Login } from './types/login.type';
import { ResponseState } from '../response-state.type';
import { Register } from './types/register.type';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../api/axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type AuthStoreState = {
  user: User | null;
  loginStateRes: ResponseState<string | null>;
  registerRes: ResponseState<User | null>;
  sendLoginMailRes: ResponseState<null>;
};

export type AuthActions = {
  login: (data: Login) => Promise<void>;
  passwordlessLogin: (token: string) => Promise<void>;
  sendLoginMail: (email: string) => Promise<void>;
  logout: () => void;
  fetchLoggedUser: (token: string) => Promise<void>;
  registerUser: (request: Register) => Promise<void>;
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
  sendLoginMailRes: {
    data: null,
    status: "IDLE",
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
      const resp = await axiosInstance(set).post(`/auth/login`, body);
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
  sendLoginMail: async (email: string) => {
    set(
      produce((state: AuthStoreState) => {
        state.sendLoginMailRes.status = "LOADING";
        return state;
      })
    );
    try {
      await axios.post(`${BASE_URL}/auth/send/login/${email}`, {});
      set(
        produce((state: AuthStoreState) => {
          state.sendLoginMailRes.status = "SUCCESS";
          return state;
        })
      );
      toast.success("Check your email for login link!");
    } catch (e: any) {
      console.log(e);
      set(
        produce((state: AuthStoreState) => {
          state.sendLoginMailRes.status = "ERROR";
          state.sendLoginMailRes.error = e.response.data.message;
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
  passwordlessLogin: async (token: string) => {
    set(
      produce((state: AuthStoreState) => {
        state.loginStateRes.status = "LOADING";
        return state;
      })
    );
    try {
      const resp = await axios.post(`${BASE_URL}/auth/passwordless/login/${token}`, {});
      await get().fetchLoggedUser(resp.data.accessToken);
      set(
        produce((state: AuthStoreState) => {
          state.loginStateRes.status = "SUCCESS";
          state.loginStateRes.data = resp.data.accessToken;
          return state;
        })
      );
      toast.success("Successfully logged in!");
    } catch (e: any) {
      console.log(e);
      set(
        produce((state: AuthStoreState) => {
          state.loginStateRes.status = "ERROR";
          state.loginStateRes.data = null;
          state.loginStateRes.error = e.response.data.message;
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
  logout: () => {
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
      const resp = await axiosInstance(set).get(`${BASE_URL}/auth/current`, {
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
  registerUser: async (body: Register) => {
    set(
      produce((state: AuthStoreState) => {
        state.registerRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const resp = await axiosInstance(set).post(
        `${BASE_URL}/auth/register`,
        body
      );
      set(
        produce((state: AuthStoreState) => {
          state.registerRes.status = 'SUCCESS';
          state.registerRes.data = resp.data.accessToken;
          return state;
        })
      );
      toast.success('Successfully registered!');
    } catch (e: any) {
      set(
        produce((state: AuthStoreState) => {
          state.registerRes.status = 'ERROR';
          state.registerRes.data = null;
          state.registerRes.error = e.response.data.message;
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
});
