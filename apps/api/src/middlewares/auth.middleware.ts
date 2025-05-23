'use strict';

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/libraries/jwt';

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  if (!token) {
    return next(new Error('No token provided'));
  }

  try {
    const decode = verifyToken(token);
    if (decode.type !== 'access_token') throw new Error('Invalid Token');
    next();
  } catch (error) {
    next(error);
  }
};

export const validateRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  if (!token) {
    return next(new Error('No token provided'));
  }

  try {
    const decode = verifyToken(token);
    if (decode.type !== 'refresh_token') throw new Error('Invalid Token');
    next();
  } catch (error) {
    next(error);
  }
};
