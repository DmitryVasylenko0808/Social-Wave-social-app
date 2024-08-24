import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/create.comment.dto';
import { EditCommentDto } from './dto/edit.comment.dto';

@Controller('articles/:articleId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get()
    async getComments(
        @Param("articleId") articleId: string, 
        @Query("page", ParseIntPipe) page: number
    ) {
        return await this.commentsService.getComments(articleId, page);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async create(
        @Request() req: any, 
        @Param("articleId") articleId: string,
        @Body() createCommentDto: CreateCommentDto
    ) {
        return await this.commentsService.create(req.user.userId, articleId, createCommentDto);
    } 

    @UseGuards(AuthGuard("jwt"))
    @Patch(":commentId")
    async edit(
        @Param("articleId") articleId: string,
        @Param("commentId") commentId: string,
        @Body() editCommentDto: EditCommentDto
    ) {
        return await this.commentsService.edit(articleId, commentId, editCommentDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(":commentId")
    async delete(
        @Param("articleId") articleId: string,
        @Param("commentId") commentId: string
    ) {
        return await this.commentsService.delete(articleId, commentId);
    }
}
