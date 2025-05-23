'use strict';

import { MessageController } from '@/controllers/message.controller';
import { Router } from 'express';
import { validateToken } from '@/middlewares/auth.middleware';

export class MessageRouter {
  private router: Router;
  private messageController: MessageController;

  constructor() {
    this.messageController = new MessageController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/:userId',
      validateToken,
      this.messageController.getMessageHistory,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
