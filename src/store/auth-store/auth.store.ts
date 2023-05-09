import {produce} from 'immer';
import axios from 'axios';
import {AppStore} from "../application.store";
import {StateCreator} from "zustand"
import {User} from "./model/user.model"
import {Login} from "./types/login.type"
import {ResponseState} from "../response-state.type";


const BASE_URL = process.env.REACT_APP_BASE_URL

export type AuthStoreState = {
    user: User | null,
    loginStateRes: ResponseState<string | null>,
}

export type AuthActions = {
    login: (data: Login) => Promise<void>,
    logout: () => void,
    fetchLoggedUser: (token: string) => Promise<void>

}

export const state: AuthStoreState = {
    user: null,
    loginStateRes: {
        data: null,
        status: "IDLE",
        error: null
    }
}


export type AuthStore = AuthStoreState & AuthActions

export const authStoreSlice: StateCreator<AppStore, [], [], AuthStore> = (set, get) => ({
    ...state,
    login: async (body: Login) => {
        set(
            produce((state: AuthStoreState) => {
                state.loginStateRes.status = "LOADING"
                return state;
            })
        )
        try {
            const resp = await axios.post(`${BASE_URL}/auth/login`, body)
            set(
                produce((state: AuthStoreState) => {
                    state.loginStateRes.status = "SUCCESS"
                    state.loginStateRes.data = resp.data.accessToken
                    return state;
                })
            )
            await get().fetchLoggedUser(resp.data.accessToken)
        } catch (e: any) {
            console.log(e)
            set(
                produce((state: AuthStoreState) => {
                    state.loginStateRes.status = "ERROR"
                    state.loginStateRes.data = null
                    state.loginStateRes.error = e.response.data.message
                    return state
                })
            )
        }
    },
    logout: () => {
        set(
            produce((state: AuthStore) => {
                state.loginStateRes.status = "IDLE"
                state.loginStateRes.data = null
                state.user = null
                return state
            })
        )
    },
    fetchLoggedUser: async (token: string) => {
        try {
            const resp = await axios.get(`${BASE_URL}/auth/current`,  {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            set(
                produce(state => {
                    state.user = resp.data;
                    console.log(state.user)
                    return state
                })
            )
        } catch (e: any) {
            set(
                produce(state => {
                    state.user = null
                    return state
                })
            )

        }
    }
})

