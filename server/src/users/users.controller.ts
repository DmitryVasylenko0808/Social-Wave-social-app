import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  Request,
  UseInterceptors,
  Get,
  Query,
  UploadedFiles,
  Post,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { EditUserDto } from './dto/edit.user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { avatarsStorage } from 'src/multer.config';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.usersService.findOneById(id);
  }

  @Get('search/by/name')
  async search(@Query('query') query: string, @Query('page', ParseIntPipe) page: number) {
    return await this.usersService.findByName(query, page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 },
      ],
      { storage: avatarsStorage },
    ),
  )
  async edit(
    @Param('id') id: string,
    @Body() editUserDto: EditUserDto,
    @UploadedFiles() files: { avatar: Express.Multer.File[]; coverImage: Express.Multer.File[] },
  ) {
    console.log(files);
    return await this.usersService.edit(id, editUserDto, files);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/follow')
  async follow(@Param('id') id: string, @Request() req: any) {
    await this.usersService.follow(id, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/unfollow')
  async unfollow(@Param('id') id: string, @Request() req: any) {
    await this.usersService.unfollow(id, req.user.userId);
  }

  @Get(':id/followers')
  async getFollowers(
    @Param('id') id: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('search') search: string,
  ) {
    return await this.usersService.getFollowers(id, page, search);
  }

  @Get(':id/followings')
  async getFollowings(
    @Param('id') id: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('search') search: string,
  ) {
    return await this.usersService.getFollowings(id, page, search);
  }

  @Get(':id/suggested')
  async getSuggested(@Param('id') id: string) {
    return await this.usersService.getSuggested(id);
  }
}
