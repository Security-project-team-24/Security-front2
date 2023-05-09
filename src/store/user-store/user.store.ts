import axios from "axios"
import { StateCreator} from "zustand"
import produce from "immer"
import {AppStore} from "../application.store"
import { ResponseState } from "../response-state.type";
import { User } from "../auth-store/model/user.model";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type UserStoreState = {
    getEmployeesRes: ResponseState<User[]>
}
export type UserActions = {
    getEmployees: () => Promise<void>
}

export const state: UserStoreState = {
    getEmployeesRes: {
        data: [],
        status: "IDLE",
        error: null
    },
}

export type UserStore = UserStoreState & UserActions

export const userStoreSlice: StateCreator<AppStore, [], [], UserStore> = (set, get) => ({
    ...state,
    getEmployees: async () => {
        set(
            produce((state: UserStore) => {
                state.getEmployeesRes.status = "LOADING"
                return state
            })
        )
        try {
            const res = await axios.get(`${BASE_URL}/user/employees`, 
                {
                    headers: {
                        "Authorization": "Bearer " + get().loginStateRes.data
                    }
                }
            )
            set(
                produce((state: UserStore) => {
                    state.getEmployeesRes.status = "SUCCESS"
                    state.getEmployeesRes.data = res.data
                    return state
                })
            )
        } catch (e) {
            set(
                produce((state: UserStore) => {
                    state.getEmployeesRes.status = "ERROR"
                    return state
                })
            )
        }
    },
})
