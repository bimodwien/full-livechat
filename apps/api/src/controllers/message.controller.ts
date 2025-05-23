'use strict';

import { Request, Response, NextFunction } from 'express';
import { Server, Socket } from 'socket.io';
import MessageService from '@/services/message.service';

export class MessageController {
  handleSendMessage = async (
    io: Server,
    socket: Socket,
    { receiverId, content }: { receiverId: string; content: string },
  ) => {
    try {
      const senderId = socket.data.user?.id!;
      const message = await MessageService.saveMessage(
        senderId,
        receiverId,
        content,
      );
      io.to(receiverId).emit('Received message', message);
    } catch (error) {
      socket.emit('error message', {
        message: (error as Error).message || 'Failed to sending message',
      });
    }
  };

  getMessageHistory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId1 = req.user?.id!;
      const userId2 = req.params.userId;
      const message = await MessageService.getMessageBetweenUser(
        userId1,
        userId2,
      );
      res.json(message);
    } catch (error) {
      next(error);
    }
  };
}
