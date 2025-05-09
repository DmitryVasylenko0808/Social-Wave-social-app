import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessagesGateway } from './messages.gateway';
import { ChatsService } from './services/chats.service';
import { MessagesService } from './services/messages.service';
import { AuthModule } from 'src/auth/auth.module';
import { ChatsController } from './chats.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    AuthModule,
    UsersModule,
  ],
  providers: [MessagesGateway, ChatsService, MessagesService],
  controllers: [ChatsController],
})
export class MessagesModule {}
