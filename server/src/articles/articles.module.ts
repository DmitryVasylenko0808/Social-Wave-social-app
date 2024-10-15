import { Module } from '@nestjs/common';
import { ArticlesService } from './services/articles.service';
import { ArticlesController } from './controllers/articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schemas/article.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { BookmarkedArticlesService } from './services/bookmarked-articles.service';
import { BookmarkedArticlesController } from './controllers/bookmarked-articles.controller';
import { FeedController } from './controllers/feed.controller';
import { FeedService } from './services/feed.service';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    UsersModule,
  ],
  providers: [ArticlesService, BookmarkedArticlesService, FeedService, CommentsService],
  controllers: [
    ArticlesController,
    BookmarkedArticlesController,
    FeedController,
    CommentsController,
  ],
})
export class ArticlesModule {}
