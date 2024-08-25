import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { Comment } from "./comment.schema";

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
    @Prop()
    text?: string;

    @Prop()
    images?: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    author: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    likes: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    reposts: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    bookmarks: User[];

    @Prop({ default: 0 })
    commentsCount: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Article" })
    repostedArticle?: Article;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);