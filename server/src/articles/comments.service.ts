import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create.comment.dto';
import { ArticlesService } from './articles.service';
import { PaginatedCommentsResponse } from './types/paginated.comments.response';
import { EditCommentDto } from './dto/edit.comment.dto';

@Injectable()
export class CommentsService {
    private readonly limit: number

    constructor(
        @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
        private readonly articlesService: ArticlesService 
    ) {
        this.limit = 12;
    }

    async getComments(articleId: string, page: number) {
        await this.articlesService.findOne(articleId);

        const comments = await this.commentModel.find({ article: articleId })
            .skip((page - 1) * this.limit)
            .limit(this.limit)
            .populate("author", "_id firstName secondName avatar");

        const totalCount = await this.commentModel.countDocuments({ article: articleId });
        const totalPages = Math.ceil(totalCount / this.limit);

        const res: PaginatedCommentsResponse = {
            data: comments,
            totalCount,
            totalPages,
            currentPage: page
        };

        return res;
    }

    async create(userId: string, articleId: string, data: CreateCommentDto) {
        await this.articlesService.findOne(articleId);
        
        const comment = new this.commentModel({ 
            author: userId, 
            article: articleId,
            answers: [],
            ...data 
        });

        await this.articlesService.updateCommentsCount(articleId, 1);

        return await comment.save();
    }

    async edit(articleId: string, commentId: string, data: EditCommentDto) {
        await this.articlesService.findOne(articleId);

        const comment = await this.commentModel.findByIdAndUpdate(
            commentId,
            data,
            { new: true }
        );

        if (!comment) {
            throw new NotFoundException("Comment is not found")
        }

        return comment;
    }

    async delete(articleId: string, commentId: string) {
        await this.articlesService.findOne(articleId);

        const comment = await this.commentModel.findByIdAndDelete(commentId);

        if (!comment) {
            throw new NotFoundException("Comment is not found");
        }

        await this.articlesService.updateCommentsCount(articleId, -1);

        return comment;
    }
}
