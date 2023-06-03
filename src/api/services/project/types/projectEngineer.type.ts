import { Engineer } from '../../../../store/auth-store/model/engineer.model';
import { User } from '../../../../store/auth-store/model/user.model';
import { Project } from './project.type';

export type ProjectEngineer = {
  id: number;
  employee: User;
  engineer: Engineer;
  jobDescription: string;
  startDate: Date;
  endDate: Date;
  project: Project;
};
