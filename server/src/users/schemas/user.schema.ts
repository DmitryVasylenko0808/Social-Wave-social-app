import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: String;

    @Prop({ required: true })
    firstName: String;

    @Prop({ required: true })
    secondName: String;

    @Prop()
    passwordHash?: String;
    
    @Prop()
    avatar?: String;

    @Prop()
    bio?: String;

    @Prop()
    coverImage?: String;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    followers: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    followings: User[];
}

export const UserSchema = SchemaFactory.createForClass(User); 