import { User } from '../../../../store/auth-store/model/user.model';
import { Project } from './project.type';

export type ProjectEmployee = {
  id: number;
  employee: User;
  jobDescription: string;
  startDate: Date;
  endDate: Date;
  project: Project;
};
