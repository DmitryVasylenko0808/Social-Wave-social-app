import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schemas/article.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { BookmarkedArticlesService } from './bookmarked-articles.service';
import { BookmarkedArticlesController } from './bookmarked-articles.controller';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema }
    ])
  ],
  providers: [
    ArticlesService, 
    BookmarkedArticlesService, 
    FeedService, 
    CommentsService
  ],
  controllers: [
    ArticlesController, 
    BookmarkedArticlesController, 
    FeedController, 
    CommentsController
  ]
})
export class ArticlesModule {}
