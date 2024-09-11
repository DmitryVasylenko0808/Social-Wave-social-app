import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../schemas/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from '../dto/create.comment.dto';
import { PaginatedResponse } from '../types/paginated.response';
import { EditCommentDto } from '../dto/edit.comment.dto';

@Injectable()
export class CommentsService {
  private readonly limit: number;

  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {
    this.limit = 12;
  }

  async getComments(articleId: string, page: number) {
    const comments = await this.commentModel
      .find({ article: articleId })
      .skip((page - 1) * this.limit)
      .limit(this.limit)
      .sort({ createdAt: 'desc' })
      .populate('author', '_id firstName secondName avatar');

    const totalCount = await this.commentModel.countDocuments({
      article: articleId,
    });
    const totalPages = Math.ceil(totalCount / this.limit);

    const res: PaginatedResponse<Comment> = {
      data: comments,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }

  async create(userId: string, articleId: string, data: CreateCommentDto) {
    const comment = new this.commentModel({
      author: userId,
      article: articleId,
      answers: [],
      ...data,
    });

    return (await comment.save()).populate(
      'author',
      '_id firstName secondName avatar',
    );
  }

  async edit(commentId: string, data: EditCommentDto) {
    const comment = await this.commentModel.findByIdAndUpdate(commentId, data, {
      new: true,
    });

    if (!comment) {
      throw new NotFoundException('Comment is not found');
    }
  }

  async delete(commentId: string) {
    const comment = await this.commentModel.findByIdAndDelete(commentId);

    if (!comment) {
      throw new NotFoundException('Comment is not found');
    }
  }

  async deleteAll(articleId: string) {
    await this.commentModel.deleteMany({ article: articleId });
  }
}
