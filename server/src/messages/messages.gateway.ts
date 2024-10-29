import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatCreatePayload } from './types/chat.create.payload';
import { ChatsService } from './services/chats.service';
import { ChatDeletePayload } from './types/chat.delete.payload';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger('MessagesGateway');
  private readonly usersMap = new Map<string, string>();

  @WebSocketServer() wss: Server;

  constructor(private readonly chatsService: ChatsService) {}

  afterInit(server: any) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Connected');

    const { userId } = client.handshake.query;

    this.usersMap.set(userId as string, client.id);

    console.log(this.usersMap);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Disconnected');

    let userId: string;

    for (const [k, v] of this.usersMap.entries()) {
      if (v === client.id) {
        userId = k;

        break;
      }
    }

    this.usersMap.delete(userId);

    console.log(this.usersMap);
  }

  @SubscribeMessage('chats:get')
  async handleGetChats(client: Socket, payload: { userId: string }) {
    const chats = await this.chatsService.getByUserId(payload.userId);

    client.emit('chats', chats);
  }

  @SubscribeMessage('chats:create')
  async handleCreateChat(client: Socket, payload: ChatCreatePayload) {
    await this.chatsService.create(payload);
    await this.updateChats(payload.members);
  }

  @SubscribeMessage('chats:delete')
  async handleDeleteChat(client: Socket, payload: ChatDeletePayload) {
    const deletedChat = await this.chatsService.delete(payload);

    if (!deletedChat) {
      throw Error('Chat is not found');
    }

    const membersIds = deletedChat.members.map((m) => m.toString());

    console.log(deletedChat.members);

    await this.updateChats(membersIds);
  }

  @SubscribeMessage('chats:join')
  handleJoinChat(client: Socket, payload: { chatId: string }) {
    client.join(payload.chatId);
  }

  @SubscribeMessage('chats:leave')
  handleLeaveChat(client: Socket, payload: { chatId: string }) {
    client.leave(payload.chatId);
  }

  async updateChats(userIds: string[]) {
    const [senderId, receiverId] = userIds;

    const senderSocketId = this.usersMap.get(senderId);
    const senderChats = await this.chatsService.getByUserId(senderId);

    this.wss.to(senderSocketId).emit('chats', senderChats);

    const receiverSocketId = this.usersMap.get(receiverId);
    const receiverChats = await this.chatsService.getByUserId(receiverId);

    this.wss.to(receiverSocketId).emit('chats', receiverChats);
  }
}
