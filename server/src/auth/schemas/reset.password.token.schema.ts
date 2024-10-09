import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ResetPasswordTokenDocument = HydratedDocument<ResetPasswordToken>;

@Schema()
export class ResetPasswordToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true, default: () => new Date(Date.now() + 2 * 60 * 60 * 1000) })
  expiresAt: Date;
}

export const ResetPasswordTokenSchema = SchemaFactory.createForClass(ResetPasswordToken);
