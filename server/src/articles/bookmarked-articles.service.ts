import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';

@Injectable()
export class BookmarkedArticlesService {
    constructor(
        @InjectModel(Article.name) private readonly articleModel: Model<Article>
    ) {}

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
}
