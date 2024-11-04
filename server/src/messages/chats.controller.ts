import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ChatsService } from './services/chats.service';
import { MessagesService } from './services/messages.service';
import { AuthGuard } from '@nestjs/passport';
import { ChatCreateDto } from './dto/chat.create.dto';
import { MessagesGateway } from './messages.gateway';

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
    await this.messagesGateway.updateChats(chat.members[0].toString(), chat.members[1].toString());

    return chat;
  }
}
