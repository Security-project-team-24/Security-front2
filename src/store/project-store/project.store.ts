import axios from 'axios';
import { StateCreator } from 'zustand';
import produce from 'immer';
import { AppStore } from '../application.store';
import { ResponseState } from '../response-state.type';
import { Project } from './types/project.type';
import { User } from '../auth-store/model/user.model';
import { ProjectEmployeeRequest } from './types/project.employee.request.type';
import { ProjectEmployee } from './types/projectEmployee.type';
import { Page } from '../page.type';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../api/axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type ProjectStoreState = {
  getProjectsRes: ResponseState<Page<Project>>;
  createProjectRes: ResponseState<any>;
  getAvailableEmployeesRes: ResponseState<User[]>;
  addEmployeeRes: ResponseState<any>;
  getProjectEngineersRes: ResponseState<ProjectEmployee[]>;
  engineerProjects: ResponseState<ProjectEmployee[]>;
};
export type ProjectActions = {
  getProjects: (pageSize: number, pageNumber: number) => Promise<void>;
  createProject: (project: Project) => Promise<void>;
  getAvailableEmployees: (projectId: number) => Promise<void>;
  addEmployee: (request: ProjectEmployeeRequest) => Promise<void>;
  getProjectEngineers: (projectId: number) => Promise<void>;
  getEngineerProjects: () => Promise<void>;
};

export const state: ProjectStoreState = {
  getProjectsRes: {
    data: { content: [], totalPages: 0 },
    status: 'IDLE',
    error: null,
  },
  createProjectRes: {
    data: null,
    status: 'IDLE',
    error: null,
  },
  getAvailableEmployeesRes: {
    data: [],
    status: 'IDLE',
    error: null,
  },
  addEmployeeRes: {
    data: null,
    status: 'IDLE',
    error: null,
  },
  getProjectEngineersRes: {
    data: [],
    status: 'IDLE',
    error: null,
  },
  engineerProjects: {
    data: [],
    status: 'IDLE',
    error: null,
  },
};

export type ProjectStore = ProjectStoreState & ProjectActions;

export const projectStoreSlice: StateCreator<AppStore, [], [], ProjectStore> = (
  set,
  get
) => ({
  ...state,
  getProjects: async (pageSize: number, pageNumber: number) => {
    set(
      produce((state: ProjectStore) => {
        state.getProjectsRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axiosInstance(set).get(
        `${BASE_URL}/project/${pageSize}/${pageNumber}`
      );
      set(
        produce((state: ProjectStore) => {
          state.getProjectsRes.status = 'SUCCESS';
          state.getProjectsRes.data = res.data;
          return state;
        })
      );
    } catch (e) {
      set(
        produce((state: ProjectStore) => {
          state.getProjectsRes.status = 'ERROR';
          return state;
        })
      );
    }
  },
  createProject: async (project: Project) => {
    set(
      produce((state: ProjectStore) => {
        state.createProjectRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axiosInstance(set).post(`${BASE_URL}/project`, project);
      set(
        produce((state: ProjectStore) => {
          state.createProjectRes.status = 'SUCCESS';
          state.createProjectRes.data = res.data;
          return state;
        })
      );
      toast.success('Successfully created project');
    } catch (e: any) {
      set(
        produce((state: ProjectStore) => {
          state.createProjectRes.status = 'ERROR';
          return state;
        })
      );
      toast.success(e.response.data.message);
    }
  },
  getAvailableEmployees: async (projectId: number) => {
    set(
      produce((state: ProjectStore) => {
        state.getAvailableEmployeesRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axiosInstance(set).get(
        `${BASE_URL}/project-employee/available/${projectId}`
      );
      set(
        produce((state: ProjectStore) => {
          state.getAvailableEmployeesRes.status = 'SUCCESS';
          state.getAvailableEmployeesRes.data = res.data;
          return state;
        })
      );
    } catch (e) {
      set(
        produce((state: ProjectStore) => {
          state.getAvailableEmployeesRes.status = 'ERROR';
          return state;
        })
      );
    }
  },
  addEmployee: async (request: ProjectEmployeeRequest) => {
    set(
      produce((state: ProjectStore) => {
        state.addEmployeeRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axiosInstance(set).post(
        `${BASE_URL}/project-employee`,
        request
      );
      set(
        produce((state: ProjectStore) => {
          state.addEmployeeRes.status = 'SUCCESS';

          state.addEmployeeRes.data = res.data;
          return state;
        })
      );
      toast.success('Succuessfully added employee');
    } catch (e: any) {
      set(
        produce((state: ProjectStore) => {
          state.addEmployeeRes.status = 'ERROR';
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
  getProjectEngineers: async (projectId: number) => {
    set(
      produce((state: ProjectStore) => {
        state.getProjectEngineersRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axiosInstance(set).get(
        `${BASE_URL}/project-employee/${projectId}/engineers`
      );
      set(
        produce((state: ProjectStore) => {
          state.getProjectEngineersRes.status = 'SUCCESS';
          state.getProjectEngineersRes.data = res.data;
          return state;
        })
      );
    } catch (e) {
      set(
        produce((state: ProjectStore) => {
          state.getProjectEngineersRes.status = 'ERROR';
          return state;
        })
      );
    }
  },
  getEngineerProjects: async () => {
    set(
      produce((state: ProjectStore) => {
        state.engineerProjects.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axios.get(`${BASE_URL}/project-employee/projects`, {
        headers: {
          Authorization: 'Bearer ' + get().loginStateRes.data,
        },
      });
      set(
        produce((state: ProjectStore) => {
          state.engineerProjects.status = 'SUCCESS';
          state.engineerProjects.data = res.data;
          return state;
        })
      );
    } catch (e) {
      set(
        produce((state: ProjectStore) => {
          state.engineerProjects.status = 'ERROR';
          return state;
        })
      );
    }
  },
});
