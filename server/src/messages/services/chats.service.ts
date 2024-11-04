import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from '../schemas/chat.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/services/users.service';
import { ChatCreateDto } from '../dto/chat.create.dto';
import { MessagesService } from './messages.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}

  async get(id: string) {
    const chat = await this.chatModel.findById(id);

    return chat;
  }

  async getByUserId(userId: string) {
    const chats = await this.chatModel
      .find({
        members: { $in: [userId] },
      })
      .populate('members', '_id firstName secondName avatar');

    return chats;
  }

  async create(userId: string, data: ChatCreateDto) {
    const { targetUserId } = data;

    await this.usersService.findOneById(targetUserId);

    const existedChat = await this.chatModel.findOne({
      members: { $all: [userId, targetUserId] },
    });

    if (existedChat) {
      return existedChat;
    }

    const createdChat = new this.chatModel({
      members: [userId, targetUserId],
    });

    return createdChat.save();
  }

  async delete(id: string) {
    const deletedChat = await this.chatModel.findByIdAndDelete(id);

    if (!deletedChat) {
      throw new NotFoundException('Chat is not found');
    }

    await this.messagesService.deleteAllByChatId(id);

    return deletedChat;
  }
}
