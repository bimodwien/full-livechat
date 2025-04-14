'use strict';

import UserService from '@/services/user.service';
import { Request, Response, NextFunction } from 'express';

export class UserController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await UserService.register(req);
      res.status(201).send({
        message: 'User created successfully',
        user: data,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { access_token, refresh_token } = await UserService.login(req);
      res
        .status(200)
        .cookie('access_token', access_token)
        .cookie('refresh_token', refresh_token)
        .json({
          message: 'User logged in successfully',
          access_token,
          refresh_token,
        });
    } catch (error) {
      next(error);
    }
  };
}
