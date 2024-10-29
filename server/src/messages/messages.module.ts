import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessagesGateway } from './messages.gateway';
import { ChatsService } from './services/chats.service';
import { MessagesService } from './services/messages.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [MessagesGateway, ChatsService, MessagesService],
})
export class MessagesModule {}
