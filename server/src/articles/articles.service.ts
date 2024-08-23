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
}
