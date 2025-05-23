import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { Article } from "./article.schema";

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
    @Prop({ required: true })
    text: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    author: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Article" })
    article: Article;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);