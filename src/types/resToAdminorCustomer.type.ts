import { Admin } from '../admin/admin.model';
import { Customer } from '../customer/customer.model';
import { Tokens } from './tokens.type';

export type ResponseToAdmin = {
  message: string;
  admin: Admin;
  tokens?: Tokens;
};

export type ResponseToUser = {
  message: string;
  customer: Customer;
  tokens?: Tokens;
};
