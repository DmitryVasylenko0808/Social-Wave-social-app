import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas/message.schema';
import { Model } from 'mongoose';
import { SendMessagePayload } from '../types/send.message.payload';
import { EditMessagePayload } from '../types/edit.message.payload';
import { DeleteMessagePayload } from '../types/delete.message.payload';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private readonly messagesModel: Model<Message>) {}

  async getByChatId(chatId: string) {
    const messages = await this.messagesModel
      .find({ chat: chatId })
      .populate('user', '_id firstName secondName avatar');

    return messages;
  }

  async create(data: SendMessagePayload) {
    const { userId, chatId, content } = data;

    const message = new this.messagesModel({
      user: userId,
      chat: chatId,
      content,
    });

    return message.save();
  }

  async edit(data: EditMessagePayload) {
    const { messageId, content } = data;

    const message = await this.messagesModel.findByIdAndUpdate(
      messageId,
      { content },
      { new: true },
    );

    return message;
  }

  async delete(data: DeleteMessagePayload) {
    const message = await this.messagesModel.findByIdAndDelete(data.messageId);

    return message;
  }

  async deleteAllByChatId(chatId: string) {
    await this.messagesModel.deleteMany({ chat: chatId });
  }
}
