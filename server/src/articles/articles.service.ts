import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create.article.dto';
import { EditArticleDto } from './dto/edit.artcile.dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name) private readonly articleModel: Model<Article>
    ) {}

    async findOne(id: string) {
        const article = await this.articleModel.findById(id)
            .populate("author", "_id firstName secondName avatar");

        if (!article) {
            throw new NotFoundException("Article is not found");
        }

        return article;
    }

    async create(userId: string, data: CreateArticleDto, images?: Express.Multer.File[]) {
        const article = new this.articleModel({
            author: userId,
            images: images?.map(img => img.filename),
            ...data
        });

        return article.save();
    }

    async edit(id: string, data: EditArticleDto, images?: Express.Multer.File[]) {
        const article = await this.articleModel.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        if (!article) {
            throw new NotFoundException("Article is not found");
        }

        return article;
    }

    async delete(id: string) {
        const article = await this.articleModel.findByIdAndDelete(id);

        if (!article) {
            throw new NotFoundException("Article is not found")
        };
    }

    async repost(userId: string, id: string) {
        const article = await this.articleModel.findByIdAndUpdate(
            id,
            {
                $push: { reposts: userId }
            },
            { new: true }
        );

        if (!article) {
            throw new NotFoundException("Article is not found");
        }

        return article;
    }

    async unrepost(userId: string, id: string) {
        const article = await this.articleModel.findByIdAndUpdate(
            id,
            {
                $pull: { reposts: userId }
            },
            { new: true }
        );

        if (!article) {
            throw new NotFoundException("Article is not found");
        }

        return article;
    }

    async like(userId: string, id: string) {
        const article = await this.articleModel.findByIdAndUpdate(
            id,
            {
                $push: { likes: userId }
            },
            { new: true }
        );

        if (!article) {
            throw new NotFoundException("Article is not found");
        }

        return article;
    }

    async unlike(userId: string, id: string) {
        const article = await this.articleModel.findByIdAndUpdate(
            id,
            {
                $pull: { likes: userId }
            },
            { new: true }
        );

        if (!article) {
            throw new NotFoundException("Article is not found");
        }

        return article;
    }

    async updateCommentsCount(id: string, value: number) {
        await this.articleModel.findByIdAndUpdate(id, { $inc: { commentsCount: value } });
    }
}
