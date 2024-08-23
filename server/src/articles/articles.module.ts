import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schemas/article.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { BookmarkedArticlesService } from './bookmarked-articles.service';
import { BookmarkedArticlesController } from './bookmarked-articles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema }
    ])
  ],
  providers: [ArticlesService, BookmarkedArticlesService],
  controllers: [ArticlesController, BookmarkedArticlesController]
})
export class ArticlesModule {}
