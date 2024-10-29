import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from '../schemas/chat.schema';
import { Model } from 'mongoose';
import { ChatCreatePayload } from '../types/chat.create.payload';
import { ChatDeletePayload } from '../types/chat.delete.payload';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private readonly chatModel: Model<Chat>) {}

  async getByUserId(userId: string) {
    const chats = await this.chatModel
      .find({
        members: { $in: [userId] },
      })
      .populate('members', '_id firstName secondName avatar');

    return chats;
  }

  async create(data: ChatCreatePayload) {
    const createdChat = new this.chatModel(data);

    return createdChat.save();
  }

  async delete(data: ChatDeletePayload) {
    const deletedChat = await this.chatModel.findByIdAndDelete(data.chatId);

    return deletedChat;
  }
}
