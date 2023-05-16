import { Skill } from './type/skill';
import axios from 'axios';
import { StateCreator } from 'zustand';
import produce from 'immer';
import { AppStore } from '../application.store';
import { ResponseState } from '../response-state.type';
import { User } from '../auth-store/model/user.model';
import { Page } from '../page.type';
import { ChangePasswordRequest } from './type/changepassword.type';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../api/axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type UserStoreState = {
  getEmployeesRes: ResponseState<Page<User>>;
  updatePersonalInfoRes: ResponseState<User | null>;
  changePasswordRes: ResponseState<any>;
  addSkillRes: ResponseState<any>;
  uploadCvRes: ResponseState<any>;
};
export type UserActions = {
  getEmployees: (pageSize: number, pageNumber: number) => Promise<void>;
  updatePersonalInfo: (user: User) => Promise<void>;
  changePassword: (request: ChangePasswordRequest) => Promise<void>;
  addSkill: (skill: Skill) => Promise<void>;
  uploadCv: (cv: FileList) => Promise<void>;
};

export const state: UserStoreState = {
  getEmployeesRes: {
    data: { content: [], totalPages: 0 },
    status: 'IDLE',
    error: null,
  },
  updatePersonalInfoRes: {
    data: null,
    status: 'IDLE',
    error: null,
  },
  changePasswordRes: {
    data: null,
    status: 'IDLE',
    error: null,
  },
  addSkillRes: {
    data: null,
    status: 'IDLE',
    error: null,
  },
  uploadCvRes: {
    data: null,
    status: 'IDLE',
    error: null,
  },
};

export type UserStore = UserStoreState & UserActions;

export const userStoreSlice: StateCreator<AppStore, [], [], UserStore> = (
  set,
  get
) => ({
  ...state,
  getEmployees: async (pageSize: number, pageNumber: number) => {
    set(
      produce((state: UserStore) => {
        state.getEmployeesRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axiosInstance(set).get(
        `${BASE_URL}/user/employees/${pageSize}/${pageNumber}`
      );
      console.log('triggered');
      console.log(res.data);
      set(
        produce((state: UserStore) => {
          state.getEmployeesRes.status = 'SUCCESS';
          state.getEmployeesRes.data = res.data;
          return state;
        })
      );
    } catch (e) {
      set(
        produce((state: UserStore) => {
          state.getEmployeesRes.status = 'ERROR';
          state.getEmployeesRes.data = { content: [], totalPages: 0 };
          return state;
        })
      );
    }
  },
  changePassword: async (request: ChangePasswordRequest) => {
    set(
      produce((state: UserStore) => {
        state.changePasswordRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axiosInstance(set).put(
        `${BASE_URL}/user/change-password`,
        request
      );
      set(
        produce((state: UserStore) => {
          state.changePasswordRes.status = 'SUCCESS';
          state.changePasswordRes.data = res.data;
          return state;
        })
      );

      await get().fetchLoggedUser(get().loginStateRes.data ?? '');
      toast.success('Successfully changed password!');
    } catch (e: any) {
      set(
        produce((state: UserStore) => {
          state.changePasswordRes.error = e.response.data.message;
          state.changePasswordRes.status = 'ERROR';
          console.log(e);
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
  updatePersonalInfo: async (user: User) => {
    set(
      produce((state: UserStore) => {
        state.updatePersonalInfoRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axios.patch(`${BASE_URL}/user/update`, user, {
        headers: {
          Authorization: 'Bearer ' + get().loginStateRes.data,
        },
      });
      set(
        produce((state: UserStore) => {
          state.updatePersonalInfoRes.status = 'SUCCESS';
          state.updatePersonalInfoRes.data = res.data;
          return state;
        })
      );
      toast.success('Successfully updated personal info');
    } catch (e: any) {
      set(
        produce((state: UserStore) => {
          state.updatePersonalInfoRes.status = 'ERROR';
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
  addSkill: async (skill: Skill) => {
    set(
      produce((state: UserStore) => {
        state.addSkillRes.status = 'LOADING';
        state.updatePersonalInfoRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axios.post(
        `${BASE_URL}/user/skill`,
        {
          skills: [
            {
              skill: skill.skills,
              strength: skill.strength,
            },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer ' + get().loginStateRes.data,
          },
        }
      );
      set(
        produce((state: UserStore) => {
          state.addSkillRes.status = 'SUCCESS';
          state.addSkillRes.data = res.data;
          return state;
        })
      );
      toast.success('Skill successfully added!');
    } catch (e: any) {
      set(
        produce((state: UserStore) => {
          state.addSkillRes.status = 'ERROR';
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
  uploadCv: async (cv: FileList) => {
    const formData = new FormData();

    Array.from(cv).forEach((cv) => {
      formData.append('file', cv);
    });

    set(
      produce((state: UserStore) => {
        state.uploadCvRes.status = 'LOADING';
        return state;
      })
    );
    try {
      const res = await axios.post(`${BASE_URL}/user/cv/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + get().loginStateRes.data,
        },
      });
      set(
        produce((state: UserStore) => {
          state.uploadCvRes.status = 'SUCCESS';
          state.uploadCvRes.data = res.data;
          return state;
        })
      );
      toast.success('CV successfully uploaded!');
    } catch (e: any) {
      set(
        produce((state: UserStore) => {
          state.uploadCvRes.status = 'ERROR';
          return state;
        })
      );
      toast.error(e.response.data.message);
    }
  },
});
