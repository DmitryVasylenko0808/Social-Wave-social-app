import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResetPasswordToken } from '../schemas/reset.password.token.schema';
import { Model, ObjectId, Types } from 'mongoose';
import * as crypto from 'crypto';

@Injectable()
export class ResetPasswordTokensService {
  constructor(
    @InjectModel(ResetPasswordToken.name)
    private readonly resetPasswordTokenModel: Model<ResetPasswordToken>,
  ) {}

  async generate(userId: Types.ObjectId) {
    const token = crypto.randomBytes(12).toString('hex');

    const resetPasswordToken = new this.resetPasswordTokenModel({
      userId,
      token,
    });

    return await resetPasswordToken.save();
  }

  async findOne(token: string) {
    const resetPasswordToken = await this.resetPasswordTokenModel.findOne({
      token,
      expiresAt: { $gt: Date.now() },
    });

    return resetPasswordToken;
  }

  async remove(token: string) {
    await this.resetPasswordTokenModel.deleteMany({ token });
  }
}
