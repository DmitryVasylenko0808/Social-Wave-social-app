import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../schemas/article.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from '../dto/create.article.dto';
import { EditArticleDto } from '../dto/edit.artcile.dto';
import { RepostArticleDto } from '../dto/repost.article.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private readonly articleModel: Model<Article>) {}

  async findOne(id: string) {
    const article = await this.articleModel
      .findById(id)
      .populate('author', '_id firstName secondName avatar');

    if (!article) {
      throw new NotFoundException('Article is not found');
    }

    return article;
  }

  async create(userId: string, data: CreateArticleDto, images?: Express.Multer.File[]) {
    const article = new this.articleModel({
      author: userId,
      images: images?.map((img) => img.filename),
      ...data,
    });

    return (await article.save()).populate('author', '_id firstName secondName avatar');
  }

  async edit(id: string, data: EditArticleDto, images?: Express.Multer.File[]) {
    const editData: EditArticleDto & { images?: string[] } = data;

    if (images.length) {
      editData.images = images.map((img) => img.filename);
    }

    const article = await this.articleModel
      .findByIdAndUpdate(id, editData, { new: true })
      .populate('author', '_id firstName secondName avatar');

    if (!article) {
      throw new NotFoundException('Article is not found');
    }

    return article;
  }

  async delete(userId: string, id: string) {
    const article = await this.articleModel.findByIdAndDelete(id);

    if (!article) {
      throw new NotFoundException('Article is not found');
    }

    await this.articleModel.deleteMany({ repostedArticle: id });
    await this.articleModel.updateOne(
      { _id: article.repostedArticle },
      {
        $pull: { reposts: userId },
      },
    );
  }

  async repost(userId: string, id: string, data?: RepostArticleDto) {
    const article = await this.articleModel.findByIdAndUpdate(
      id,
      {
        $push: { reposts: userId },
      },
      { new: true },
    );

    if (!article) {
      throw new NotFoundException('Article is not found');
    }

    const createdArticle = new this.articleModel({
      author: userId,
      repostedArticle: id,
      ...data,
    });

    const result = (await createdArticle.save()).populate(
      'author',
      '_id firstName secondName avatar',
    );

    return (await result).populate({
      path: 'repostedArticle',
      populate: {
        path: 'author',
        select: '_id firstName secondName avatar',
      },
    });
  }

  async unrepost(userId: string, id: string) {
    const article = await this.articleModel.findByIdAndUpdate(
      id,
      {
        $pull: { reposts: userId },
      },
      { new: true },
    );

    if (!article) {
      throw new NotFoundException('Article is not found');
    }

    await this.articleModel.deleteOne({
      $and: [{ author: userId }, { repostedArticle: id }],
    });
  }

  async like(userId: string, id: string) {
    const article = await this.articleModel.findByIdAndUpdate(
      id,
      {
        $push: { likes: userId },
      },
      { new: true },
    );

    if (!article) {
      throw new NotFoundException('Article is not found');
    }

    return article;
  }

  async unlike(userId: string, id: string) {
    const article = await this.articleModel.findByIdAndUpdate(
      id,
      {
        $pull: { likes: userId },
      },
      { new: true },
    );

    if (!article) {
      throw new NotFoundException('Article is not found');
    }

    return article;
  }

  async updateCommentsCount(id: string, value: number) {
    await this.articleModel.findByIdAndUpdate(id, {
      $inc: { commentsCount: value },
    });
  }
}
