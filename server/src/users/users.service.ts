import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { EditUserDto } from './dto/edit.user.dto';
import { PaginatedUsersResponse } from './types/paginated.users.response';

@Injectable()
export class UsersService {
  private readonly limit: number;

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    this.limit = 10;
  }

  async create(data: Omit<User, 'followers' | 'followings'>) {
    const createdUser = new this.userModel({
      ...data,
      followers: [],
      followings: [],
    });

    return createdUser.save();
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id, '-passwordHash');

    if (!user) {
      throw new NotFoundException('user is not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findOneByVerifyEmailCode(verificationCode: string) {
    const currentDate = new Date();

    const user = await this.userModel.findOne({
      verificationCode,
      verificationCodeExpiredAt: { $gt: currentDate },
    });

    return user;
  }

  async setVerified(id: Types.ObjectId) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiredAt = undefined;

    return await user.save();
  }

  async edit(
    id: string,
    data: EditUserDto,
    files?: {
      avatar: Express.Multer.File[];
      coverImage: Express.Multer.File[];
    },
  ) {
    const { avatar, coverImage } = files;

    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        ...data,
        avatar: avatar && avatar[0].filename,
        coverImage: coverImage && coverImage[0].filename,
      },
      { new: true },
    );

    if (!user) {
      throw new BadRequestException('User is not found');
    }

    return user;
  }

  async follow(id: string, userId: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        $push: { followers: userId },
      },
      { new: true },
    );

    if (!user) {
      throw new BadRequestException('User is not found');
    }

    await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { followings: id },
      },
      { new: true },
    );
  }

  async unfollow(id: string, userId: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        $pull: { followers: userId },
      },
      { new: true },
    );

    if (!user) {
      throw new BadRequestException('User is not found');
    }

    await this.userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { followings: id },
      },
      { new: true },
    );
  }

  async getFollowers(id: string, page: number) {
    const user = await this.userModel.findById(id).populate({
      path: 'followers',
      select: '_id firstName secondName avatar',
      options: {
        skip: (page - 1) * this.limit,
        limit: this.limit,
      },
    });

    const totalCount = user.followers.length;
    const totalPages = Math.ceil(totalCount / this.limit);

    const res: PaginatedUsersResponse = {
      data: user.followers,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }

  async getFollowings(id: string, page: number) {
    const user = await this.userModel.findById(id).populate({
      path: 'followings',
      select: '_id firstName secondName avatar',
      options: {
        skip: (page - 1) * this.limit,
        limit: this.limit,
      },
    });

    const totalCount = user.followings.length;
    const totalPages = Math.ceil(totalCount / this.limit);

    const res: PaginatedUsersResponse = {
      data: user.followings,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }
}
