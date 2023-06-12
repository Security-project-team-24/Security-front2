import { User } from './user.model';

export type Engineer = {
  id: number;
  cvName: string;
  seniority: string;
  user: User;
  hireDate: Date;
};
