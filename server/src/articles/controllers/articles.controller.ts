import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateArticleDto } from '../dto/create.article.dto';
import { ArticlesService } from '../services/articles.service';
import { articlesStorage } from 'src/multer.config';
import { EditArticleDto } from '../dto/edit.artcile.dto';
import { CommentsService } from '../services/comments.service';
import { RepostArticleDto } from '../dto/repost.article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.articlesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, { storage: articlesStorage }))
  async create(
    @Request() req: any,
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFiles(
      new ParseFilePipeBuilder().addFileTypeValidator({ fileType: 'jpeg' }).build({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    files?: Express.Multer.File[],
  ) {
    return await this.articlesService.create(req.user.userId, createArticleDto, files);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 5, { storage: articlesStorage }))
  async edit(
    @Param('id') id: string,
    @Body() editArticleDto: EditArticleDto,
    @UploadedFiles(
      new ParseFilePipeBuilder().addFileTypeValidator({ fileType: 'jpeg' }).build({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    files?: Express.Multer.File[],
  ) {
    return await this.articlesService.edit(id, editArticleDto, files);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    await this.articlesService.delete(req.user.userId, id);
    await this.commentsService.deleteAll(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/repost')
  @HttpCode(HttpStatus.OK)
  async repost(
    @Request() req: any,
    @Param('id') id: string,
    @Body() repostArticleDto?: RepostArticleDto,
  ) {
    return await this.articlesService.repost(req.user.userId, id, repostArticleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/repost')
  async unrepost(@Request() req: any, @Param('id') id: string) {
    await this.articlesService.unrepost(req.user.userId, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  async like(@Request() req: any, @Param('id') id: string) {
    return await this.articlesService.like(req.user.userId, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/like')
  async unlike(@Request() req: any, @Param('id') id: string) {
    return await this.articlesService.unlike(req.user.userId, id);
  }
}
