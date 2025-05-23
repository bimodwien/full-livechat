import { SignOptions, sign, verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import { TDecode } from '@/models/user.model';

export const createToken = (
  payload: any,
  expiresIn: SignOptions['expiresIn'] = '3d',
) => {
  return sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string): TDecode => {
  return verify(token, SECRET_KEY) as TDecode;
};
