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
import { ChatsService } from './services/chats.service';
import { MessagesService } from './services/messages.service';
import { ChatCreatePayload } from './types/chat.create.payload';
import { ChatDeletePayload } from './types/chat.delete.payload';
import { SendMessagePayload } from './types/send.message.payload';
import { DeleteMessagePayload } from './types/delete.message.payload';
import { EditMessagePayload } from './types/edit.message.payload';
import { WsAuthService } from 'src/auth/services/ws.auth.service';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger('MessagesGateway');
  private readonly usersMap = new Map<string, string>();

  @WebSocketServer() wss: Server;

  constructor(
    private readonly wsAuthService: WsAuthService,
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('Initialized');

    server.use(this.wsAuthService.getSocketMiddleware());
  }

  handleConnection(client: Socket, ...args: any[]) {
    const userId = client['userId'];

    this.usersMap.set(userId as string, client.id);
  }

  handleDisconnect(client: Socket) {
    let userId: string;

    for (const [k, v] of this.usersMap.entries()) {
      if (v === client.id) {
        userId = k;

        break;
      }
    }

    this.usersMap.delete(userId);
  }

  @SubscribeMessage('chats:get')
  async handleGetChats(client: Socket, payload: { userId: string }) {
    const chats = await this.chatsService.getByUserId(payload.userId);

    client.emit('chats', chats);
  }

  @SubscribeMessage('chats:create')
  async handleCreateChat(client: Socket, payload: ChatCreatePayload) {
    const createdChat = await this.chatsService.create(payload);

    await this.updateChats(payload.members);

    client.emit('chats:created', createdChat);
  }

  @SubscribeMessage('chats:delete')
  async handleDeleteChat(client: Socket, payload: ChatDeletePayload) {
    const deletedChat = await this.chatsService.delete(payload);

    if (!deletedChat) {
      throw Error('Chat is not found');
    }

    await this.messagesService.deleteAllByChatId(payload.chatId);

    const membersIds = deletedChat.members.map((m) => m.toString());

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

  @SubscribeMessage('messages:get')
  async handleGetMessages(client: Socket, payload: { chatId: string }) {
    const messages = await this.messagesService.getByChatId(payload.chatId);

    client.emit('messages', messages);
  }

  @SubscribeMessage('messages:send')
  async handleSendMessage(client: Socket, payload: SendMessagePayload) {
    const { userId, chatId, content } = payload;

    const chat = await this.chatsService.get(chatId);

    if (!chat) {
      throw Error('Chat is not found');
    }

    await this.messagesService.create({ userId, chatId, content });
    await this.updateMessages(chatId);
  }

  @SubscribeMessage('messages:delete')
  async handleDeleteMessage(client: Socket, payload: DeleteMessagePayload) {
    const { chatId, messageId } = payload;

    const chat = await this.chatsService.get(chatId);

    if (!chat) {
      throw Error('Chat is not found');
    }

    const deletedMessage = await this.messagesService.delete({ chatId, messageId });

    if (!deletedMessage) {
      throw Error('Message is not found');
    }

    await this.updateMessages(chatId);
  }

  @SubscribeMessage('messages:edit')
  async handleEditMessage(client: Socket, payload: EditMessagePayload) {
    const { chatId, messageId, content } = payload;

    const chat = await this.chatsService.get(chatId);

    if (!chat) {
      throw Error('Chat is not found');
    }

    const editedMessage = await this.messagesService.edit({ chatId, messageId, content });

    if (!editedMessage) {
      throw Error('Message is not found');
    }

    await this.updateMessages(chatId);
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

  async updateMessages(chatId: string) {
    const messages = await this.messagesService.getByChatId(chatId);

    this.wss.to(chatId).emit('messages', messages);
  }
}
