import { Request } from 'express';

export interface UserRequest extends Request {
  user: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    roleId: number;
    phone: string;
    isActive: string;
    isOnline: string;
    userimg: string;
    companyId: number;
    powers: number[];
  };
}
