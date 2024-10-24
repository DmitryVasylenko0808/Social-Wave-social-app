import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../schemas/article.schema';
import { Model } from 'mongoose';
import { PaginatedResponse } from '../types/paginated.response';
import { SortDate } from '../types/sort.date';
import { SubscriptionsService } from 'src/users/services/subscriptions.service';

@Injectable()
export class FeedService {
  private readonly limit: number;

  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
    private readonly subcriptionsService: SubscriptionsService,
  ) {
    this.limit = 10;
  }

  async getFeed(page: number) {
    const articles = await this.articleModel
      .find({ repostedArticle: null })
      .skip((page - 1) * this.limit)
      .limit(this.limit)
      .sort({ createdAt: 'desc' })
      .populate('author', '_id firstName secondName avatar');

    const totalCount = await this.articleModel.countDocuments({
      repostedArticle: null,
    });
    const totalPages = Math.ceil(totalCount / this.limit);

    const res: PaginatedResponse<Article> = {
      data: articles,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }

  async getFeedByUserId(userId: string, page: number, sortDate: SortDate) {
    const articles = await this.articleModel
      .find({ author: userId })
      .skip((page - 1) * this.limit)
      .limit(this.limit)
      .sort({ createdAt: sortDate })
      .populate('author', '_id firstName secondName avatar')
      .populate({
        path: 'repostedArticle',
        populate: {
          path: 'author',
          select: '_id firstName secondName avatar',
        },
      });

    const totalCount = await this.articleModel.countDocuments({
      $or: [{ author: userId }, { reposts: userId }],
    });
    const totalPages = Math.ceil(totalCount / this.limit);

    const res: PaginatedResponse<Article> = {
      data: articles,
      currentPage: page,
      totalCount,
      totalPages,
      sortDate,
    };

    return res;
  }

  async getFollowingFeedByUserId(userId: string, page: number) {
    const followingsIds = await this.subcriptionsService.getFollowingsIds(userId);
    const articles = await this.articleModel
      .find({
        author: { $in: followingsIds },
      })
      .skip((page - 1) * this.limit)
      .limit(this.limit)
      .sort({ createdAt: 'desc' })
      .populate('author', '_id firstName secondName avatar')
      .populate({
        path: 'repostedArticle',
        populate: {
          path: 'author',
          select: '_id firstName secondName avatar',
        },
      });

    const totalCount = await this.articleModel.countDocuments({
      $or: [{ author: { $in: followingsIds } }, { reposts: { $in: followingsIds } }],
    });
    const totalPages = Math.ceil(totalCount / this.limit);

    const res: PaginatedResponse<Article> = {
      data: articles,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }
}
