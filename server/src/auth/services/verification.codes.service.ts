import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VerificationCode } from '../schemas/verification.code.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class VerificationCodesService {
  constructor(
    @InjectModel(VerificationCode.name) private readonly verificationModel: Model<VerificationCode>,
  ) {}

  async generate(userId: Types.ObjectId) {
    const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();

    const code = new this.verificationModel({
      userId,
      code: verificationCode,
    });

    return await code.save();
  }

  async compare(userId: string, code: string) {
    const verificationCode = await this.verificationModel.findOne({
      userId,
      code,
      expiresAt: { $gt: Date.now() },
    });

    return !!verificationCode;
  }

  async remove(userId: string) {
    await this.verificationModel.deleteMany({ userId });
  }
}
