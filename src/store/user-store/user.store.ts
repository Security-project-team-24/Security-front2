import axios from "axios"
import { StateCreator} from "zustand"
import produce from "immer"
import {AppStore} from "../application.store"
import { ResponseState } from "../response-state.type";
import { User } from "../auth-store/model/user.model";
import { Page } from "../page.type";
import { ChangePasswordRequest } from "./type/changepassword.type";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type UserStoreState = {
    getEmployeesRes: ResponseState<Page<User>>
    updatePersonalInfoRes: ResponseState<User | null>
    changePasswordRes: ResponseState<any>
}
export type UserActions = {
    getEmployees: (pageSize: number, pageNumber: number) => Promise<void>
    updatePersonalInfo: (user: User) => Promise<void>
    changePassword: (request: ChangePasswordRequest) => Promise<void>
}

export const state: UserStoreState = {
    getEmployeesRes: {
        data: {content: [], totalPages: 0},
        status: "IDLE",
        error: null
    },
    updatePersonalInfoRes: {
        data: null,
        status: "IDLE",
        error: null
    },
    changePasswordRes: {
        data: null,
        status: "IDLE",
        error: null
    },
}

export type UserStore = UserStoreState & UserActions

export const userStoreSlice: StateCreator<AppStore, [], [], UserStore> = (set, get) => ({
    ...state,
    getEmployees: async (pageSize: number, pageNumber: number) => {
        set(
            produce((state: UserStore) => {
                state.getEmployeesRes.status = "LOADING"
                return state
            })
        )
        try {
            const res = await axios.get(`${BASE_URL}/user/employees/${pageSize}/${pageNumber}`, 
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
    changePassword: async (request: ChangePasswordRequest) => {
        set(
            produce((state: UserStore) => {
                state.changePasswordRes.status = "LOADING"
                return state
            })
        )
        try {
            const res = await axios.put(`${BASE_URL}/user/change-password`, request,
                {
                    headers: {
                        "Authorization": "Bearer " + get().loginStateRes.data
                    }
                }
            )
            set(
                produce((state: UserStore) => {
                    state.changePasswordRes.status = "SUCCESS"
                    state.updatePersonalInfoRes.data = res.data
                    return state
                })
            )
        } catch (e: any) {
            set(
                produce((state: UserStore) => {
                    state.changePasswordRes.error = e.response.data.message
                    state.changePasswordRes.status = "ERROR"
                    console.log(e)
                    return state
                })
            )
        }
    },
    updatePersonalInfo: async (user: User) => {
        set(
            produce((state: UserStore) => {
                state.updatePersonalInfoRes.status = "LOADING"
                return state
            })
        )
        try {
            const res = await axios.patch(`${BASE_URL}/user/update`, user,
                {
                    headers: {
                        "Authorization": "Bearer " + get().loginStateRes.data
                    }
                }
            )
            set(
                produce((state: UserStore) => {
                    state.updatePersonalInfoRes.status = "SUCCESS"
                    state.updatePersonalInfoRes.data = res.data
                    return state
                })
            )
        } catch (e) {
            set(
                produce((state: UserStore) => {
                    state.updatePersonalInfoRes.status = "ERROR"
                    return state
                })
            )
        }
    }
})
