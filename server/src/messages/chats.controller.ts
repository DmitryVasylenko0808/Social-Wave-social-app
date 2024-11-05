import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './services/chats.service';
import { MessagesService } from './services/messages.service';
import { AuthGuard } from '@nestjs/passport';
import { MessagesGateway } from './messages.gateway';
import { ChatCreateDto } from './dto/chat.create.dto';
import { SendMessageDto } from './dto/send.message.dto';
import { EditMessageDto } from './dto/edit.message.dto';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
    private readonly messagesGateway: MessagesGateway,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async getChats(@Request() req: any) {
    return await this.chatsService.getByUserId(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createChat(@Request() req: any, @Body() chatCreateDto: ChatCreateDto) {
    const chat = await this.chatsService.create(req.user.userId, chatCreateDto);
    await this.messagesGateway.updateChats(req.user.userId, chatCreateDto.targetUserId);

    return chat;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':chatId')
  async deleteChat(@Param('chatId') chatId: string) {
    const chat = await this.chatsService.delete(chatId);
    await this.messagesService.deleteAllByChatId(chatId);

    await this.messagesGateway.updateChats(chat.members[0].toString(), chat.members[1].toString());

    return chat;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':chatId/messages')
  async getMessages(@Param('chatId') chatId: string) {
    return await this.messagesService.getByChatId(chatId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':chatId/messages')
  async sendMessage(
    @Param('chatId') chatId: string,
    @Request() req: any,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    const message = await this.messagesService.create(chatId, req.user.userId, sendMessageDto);

    await this.messagesGateway.updateMessages(chatId);

    return message;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':chatId/messages/:messageId')
  async editMessage(
    @Param('chatId') chatId: string,
    @Param('messageId') messageId: string,
    @Body() editMessageDto: EditMessageDto,
  ) {
    const message = await this.messagesService.edit(chatId, messageId, editMessageDto);

    await this.messagesGateway.updateMessages(chatId);

    return message;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':chatId/messages/:messageId')
  async deleteMessage(@Param('chatId') chatId: string, @Param('messageId') messageId: string) {
    const message = await this.messagesService.delete(chatId, messageId);

    await this.messagesGateway.updateMessages(chatId);

    return message;
  }
}
