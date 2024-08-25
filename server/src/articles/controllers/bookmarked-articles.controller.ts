import { Controller, Delete, HttpCode, HttpStatus, Param, Post, UseGuards, Request, Get, Query, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkedArticlesService } from '../services/bookmarked-articles.service';

@Controller('articles')
export class BookmarkedArticlesController {
    constructor(private readonly bookmarkedArticleService: BookmarkedArticlesService) {}

    @UseGuards(AuthGuard("jwt"))
    @Post(":id/bookmark")
    @HttpCode(HttpStatus.OK)
    async bookmark(@Request() req: any, @Param("id") id: string) {
        return await this.bookmarkedArticleService.bookmark(req.user.userId, id);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(":id/bookmark")
    async unbookmark(@Request() req: any, @Param("id") id: string) {
        return await this.bookmarkedArticleService.unbookmark(req.user.userId, id);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("user/:userId/bookmarked")
    async getBookmarked(
        @Param("userId") userId: string,
        @Query("page", ParseIntPipe) page: number
    ) {
        return await this.bookmarkedArticleService.getBookmarked(userId, page);
    }

}
