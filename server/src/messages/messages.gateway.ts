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
import { WsAuthService } from 'src/auth/services/ws.auth.service';

@WebSocketGateway({ cors: '*' })
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

  @SubscribeMessage('chats:join')
  handleJoinChat(client: Socket, payload: { chatId: string }) {
    client.join(payload.chatId);
  }

  @SubscribeMessage('chats:leave')
  handleLeaveChat(client: Socket, payload: { chatId: string }) {
    client.leave(payload.chatId);
  }

  async updateChats(firstUserId: string, secondUserId: string) {
    const firstUserSocketId = this.usersMap.get(firstUserId);
    const firstUserChats = await this.chatsService.getByUserId(firstUserId);

    this.wss.to(firstUserSocketId).emit('chats', firstUserChats);

    const secondUserSocketId = this.usersMap.get(secondUserId);
    const secondUserChats = await this.chatsService.getByUserId(secondUserId);

    this.wss.to(secondUserSocketId).emit('chats', secondUserChats);
  }

  async updateMessages(chatId: string) {
    const messages = await this.messagesService.getByChatId(chatId);

    this.wss.to(chatId).emit('messages', messages);
  }
}
