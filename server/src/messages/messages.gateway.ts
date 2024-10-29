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

@WebSocketGateway()
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger('MessagesGateway');

  @WebSocketServer() wss: Server;

  afterInit(server: any) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Connected');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Disconnected');
  }

  @SubscribeMessage('messages:test')
  handleMessage(client: Socket, payload: any) {
    client.emit('test', 'Hello!');
  }
}
