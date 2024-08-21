import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    secondName: string;

    @Prop()
    passwordHash?: string;
    
    @Prop()
    avatar?: string;

    @Prop()
    bio?: string;

    @Prop()
    coverImage?: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    followers: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    followings: User[];
}

export const UserSchema = SchemaFactory.createForClass(User); 