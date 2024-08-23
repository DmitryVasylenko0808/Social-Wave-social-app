import { Controller, Delete, HttpCode, HttpStatus, Param, Post, UseGuards, Request } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkedArticlesService } from './bookmarked-articles.service';

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
    @HttpCode(HttpStatus.OK)
    async unbookmark(@Request() req: any, @Param("id") id: string) {
        return await this.bookmarkedArticleService.unbookmark(req.user.userId, id);
    }

}
