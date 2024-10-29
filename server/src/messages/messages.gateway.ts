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

  // @SubscribeMessage('chats:create')
  // async handleMessage(client: Socket, payload: ChatCreatePayload) {
  //   await this.chatsService.create(payload);
  //   client.emit('chats', 'Hello!');
  // }
}
