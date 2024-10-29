import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Message } from './message.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], required: true })
  members: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  lastMessage?: Message;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
