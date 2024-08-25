import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from '../dto/create.comment.dto';
import { EditCommentDto } from '../dto/edit.comment.dto';
import { ArticlesService } from '../services/articles.service';

@Controller('articles/:articleId/comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
        private readonly articlesService: ArticlesService
    ) {}

    @Get()
    async getComments(
        @Param("articleId") articleId: string, 
        @Query("page", ParseIntPipe) page: number
    ) {
        await this.articlesService.findOne(articleId);
        return await this.commentsService.getComments(articleId, page);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async create(
        @Request() req: any, 
        @Param("articleId") articleId: string,
        @Body() createCommentDto: CreateCommentDto
    ) {
        await this.articlesService.findOne(articleId);
        await this.commentsService.create(req.user.userId, articleId, createCommentDto);
        await this.articlesService.updateCommentsCount(articleId, 1);
    } 

    @UseGuards(AuthGuard("jwt"))
    @Patch(":commentId")
    async edit(
        @Param("articleId") articleId: string,
        @Param("commentId") commentId: string,
        @Body() editCommentDto: EditCommentDto
    ) {
        await this.articlesService.findOne(articleId);
        await this.commentsService.edit(commentId, editCommentDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(":commentId")
    async delete(
        @Param("articleId") articleId: string,
        @Param("commentId") commentId: string
    ) {
        await this.articlesService.findOne(articleId);
        await this.commentsService.delete(commentId);
        await this.articlesService.updateCommentsCount(articleId, -1);
    }
}
