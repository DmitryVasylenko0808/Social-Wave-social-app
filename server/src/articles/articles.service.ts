import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create.article.dto';

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
}
