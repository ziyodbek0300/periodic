import { Request } from 'express';
import { Admin } from '@/interfaces/admins.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithAdmin extends Request {
  admin: Admin;
}
