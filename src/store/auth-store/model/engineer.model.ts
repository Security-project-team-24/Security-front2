import { User } from './user.model';

export type Engineer = {
  id: number;
  cv_url: string;
  seniority: string;
  user: User;
};
