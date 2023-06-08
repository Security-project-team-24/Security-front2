import { Address } from './address.model';
import { Engineer } from './engineer.model';

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  blocked?: boolean;
  roles: string[];
  status?: number;
  address: Address;
  phoneNumber: string;
  firstLogged?: boolean;
  engineer?: Engineer;
};
