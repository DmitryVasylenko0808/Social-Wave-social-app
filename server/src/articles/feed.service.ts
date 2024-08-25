import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import { Model } from 'mongoose';
import { PaginatedArticlesResponse } from './types/paginated.articles.response';

@Injectable()
export class FeedService {
    private readonly limit: number;

    constructor(
        @InjectModel(Article.name) private readonly articleModel: Model<Article>
    ) {
        this.limit = 10;
    }

    async getFeed(page: number) { // !
        const articles = await this.articleModel.find()
            .skip((page - 1) * this.limit)
            .limit(this.limit)
            .sort({ updatedAt: "desc" })
            .populate("author", "_id firstName secondName avatar")

        const totalCount = await this.articleModel.countDocuments();
        const totalPages = Math.ceil(totalCount / this.limit);

        const res: PaginatedArticlesResponse = {
            data: articles,
            totalCount,
            totalPages,
            currentPage: page
        };

        return res;
    }

    async getFeedByUserId(userId: string, page: number) { // !
        const articles = await this.articleModel
            .find({ $or: [{ author: userId }, {bookmarks: userId}] })
            .skip((page - 1) * this.limit)
            .limit(this.limit)
            .populate("author", "_id firstName secondName avatar");

        const totalCount = await this.articleModel.countDocuments({ 
            $or: [{ author: userId }, {bookmarks: userId}] 
        });
        const totalPages = Math.ceil(totalCount / this.limit);

        const res: PaginatedArticlesResponse = {
            data: articles,
            totalCount,
            totalPages,
            currentPage: page
        };

        return res;
    }
}
