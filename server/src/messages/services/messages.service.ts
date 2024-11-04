import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas/message.schema';
import { Model } from 'mongoose';
import { ChatsService } from './chats.service';
import { SendMessageDto } from '../dto/send.message.dto';
import { EditMessageDto } from '../dto/edit.message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messagesModel: Model<Message>,
    private readonly chatsService: ChatsService,
  ) {}

  async getByChatId(chatId: string) {
    const chat = await this.chatsService.get(chatId);

    if (!chat) {
      throw new NotFoundException('Chat is not found');
    }

    const messages = await this.messagesModel
      .find({ chat: chatId })
      .populate('user', '_id firstName secondName avatar');

    return messages;
  }

  async create(chatId: string, userId: string, data: SendMessageDto) {
    const chat = await this.chatsService.get(chatId);

    if (!chat) {
      throw new NotFoundException('Chat is not found');
    }

    const message = new this.messagesModel({
      user: userId,
      chat: chatId,
      ...data,
    });

    return message.save();
  }

  async edit(chatId: string, messageId: string, data: EditMessageDto) {
    const chat = await this.chatsService.get(chatId);

    if (!chat) {
      throw new NotFoundException('Chat is not found');
    }

    const message = await this.messagesModel.findByIdAndUpdate(
      messageId,
      { ...data },
      { new: true },
    );

    if (!message) {
      throw new NotFoundException('Message is not found');
    }

    return message;
  }

  async delete(chatId: string, messageId: string) {
    const chat = await this.chatsService.get(chatId);

    if (!chat) {
      throw new NotFoundException('Chat is not found');
    }

    const message = await this.messagesModel.findByIdAndDelete(messageId);

    if (!message) {
      throw new NotFoundException('Message is not found');
    }

    return message;
  }

  async deleteAllByChatId(chatId: string) {
    await this.messagesModel.deleteMany({ chat: chatId });
  }
}
