import prisma from '@/prisma';

class MessageService {
  static async saveMessage(
    senderId: string,
    receiverId: string,
    content: string,
  ) {
    return prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  static async getMessageBetweenUser(userId1: string, userId2: string) {
    return prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId1, receiverId: userId2 },
          { senderId: userId2, receiverId: userId1 },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}

export default MessageService;
