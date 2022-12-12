import { Admin } from '../admin/admin.model';
import { Tokens } from './tokens.type';

export type ResponseToAdmin = {
  message: string;
  admin: Admin;
  tokens: Tokens;
};
