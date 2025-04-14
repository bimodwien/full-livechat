import { TUser } from './user.model';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: TUser;
    }
  }
}
