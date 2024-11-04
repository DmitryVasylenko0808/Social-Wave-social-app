import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { Socket } from 'socket.io';
import { SocketMiddleware } from '../types/socket.middleware';

@Injectable()
export class WsAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  getSocketMiddleware(): SocketMiddleware {
    return async (socket: Socket, next) => {
      try {
        const [type, token] = socket.handshake.headers?.authorization?.split(' ') ?? [];
        const bearerToken = type === 'Bearer' ? token : null;

        if (!bearerToken) {
          next(new Error('Unathorized'));
        }

        const payload = await this.jwtService.verifyAsync(bearerToken);
        const user = await this.usersService.findOneById(payload.userId);

        socket = Object.assign(socket, { userId: user._id.toString() });

        next();
      } catch (err) {
        next(new Error('Unathorized'));
      }
    };
  }
}
