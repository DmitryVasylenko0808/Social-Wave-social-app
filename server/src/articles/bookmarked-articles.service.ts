import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import { PaginatedArticlesResponse } from './types/paginated.articles.response';

@Injectable()
export class BookmarkedArticlesService {
    private readonly limit: number

    constructor(
        @InjectModel(Article.name) private readonly articleModel: Model<Article>
    ) {
        this.limit = 10;
    }

    async bookmark(userId: string, id: string) {
        const article = await this.articleModel.findByIdAndUpdate(
            id,
            {
                $push: { bookmarks: userId }
            },
            { new: true }
        );

        if (!article) {
            throw new NotFoundException("Article is not found");
        }

        return article;
    }

    async unbookmark(userId: string, id: string) {
        const article = await this.articleModel.findByIdAndUpdate(
            id,
            {
                $pull: { bookmarks: userId }
            },
            { new: true }
        );

        if (!article) {
            throw new NotFoundException("Article is not found");
        }

        return article;
    }

    async getBookmarked(userId: string, page: number) {
        const articles = await this.articleModel.find({ bookmarks: userId })
            .skip((page - 1) * this.limit)
            .limit(this.limit)
            .populate("author", "_id firstName secondName avatar");

        const totalCount = await this.articleModel.countDocuments({ bookmarks: userId });
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
