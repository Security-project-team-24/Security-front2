import axios from "axios"
import { StateCreator} from "zustand"
import produce from "immer"
import {AppStore} from "../application.store"
import { ResponseState } from "../response-state.type";
import { Project } from "./types/project.type";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type ProjectStoreState = {
    getProjectsRes: ResponseState<Project[]>
    createProjectRes: ResponseState<any>
}
export type ProjectActions = {
    getProjects: () => Promise<void>
    createProject: (project: Project) => Promise<void>
}

export const state: ProjectStoreState = {
    getProjectsRes: {
        data: [],
        status: "IDLE",
        error: null
    },
    createProjectRes: {
        data: null,
        status: "IDLE",
        error: null
    },
}

export type ProjectStore = ProjectStoreState & ProjectActions

export const projectStoreSlice: StateCreator<AppStore, [], [], ProjectStore> = (set, get) => ({
    ...state,
    getProjects: async () => {
        set(
            produce((state: ProjectStore) => {
                state.getProjectsRes.status = "LOADING"
                return state
            })
        )
        try {
            const res = await axios.get(`${BASE_URL}/project`, 
                {
                    headers: {
                        "Authorization": "Bearer " + get().loginStateRes.data
                    }
                }
            )
            set(
                produce((state: ProjectStore) => {
                    state.getProjectsRes.status = "SUCCESS"
                    state.getProjectsRes.data = res.data
                    return state
                })
            )
        } catch (e) {
            set(
                produce((state: ProjectStore) => {
                    state.getProjectsRes.status = "ERROR"
                    return state
                })
            )
        }
    },
    createProject: async (project: Project) => {
        set(
            produce((state: ProjectStore) => {
                state.createProjectRes.status = "LOADING"
                return state
            })
        )
        try {
            const res = await axios.post(`${BASE_URL}/project`, project, 
                {
                    headers: {
                        "Authorization": "Bearer " + get().loginStateRes.data
                    }
                }
            )
            set(
                produce((state: ProjectStore) => {
                    state.createProjectRes.status = "SUCCESS"
                    state.createProjectRes.data = res.data
                    return state
                })
            )
        } catch (e) {
            set(
                produce((state: ProjectStore) => {
                    state.createProjectRes.status = "ERROR"
                    return state
                })
            )
        }
    },
})
