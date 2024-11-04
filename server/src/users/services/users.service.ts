import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { EditUserDto } from '../dto/edit.user.dto';
import { PaginatedUsersResponse } from '../types/paginated.users.response';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

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
      throw new NotFoundException('User is not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findByName(name: string, page: number) {
    const LIMIT = 5;
    const search = new RegExp(name);

    if (!name) {
      const res: PaginatedUsersResponse = {
        data: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        searchValue: '',
      };

      return res;
    }

    const users = await this.userModel
      .find(
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ['$firstName', ' ', '$secondName'] },
              regex: search,
              options: 'i',
            },
          },
        },
        '_id firstName secondName avatar',
      )
      .skip((page - 1) * LIMIT)
      .limit(LIMIT);

    const totalCount = await this.userModel.countDocuments({
      $expr: {
        $regexMatch: {
          input: { $concat: ['$firstName', ' ', '$secondName'] },
          regex: search,
          options: 'i',
        },
      },
    });
    const totalPages = Math.ceil(totalCount / LIMIT);

    const res: PaginatedUsersResponse = {
      data: users.length ? users : [],
      totalCount,
      totalPages,
      currentPage: page,
      searchValue: name,
    };

    return res;
  }

  async setVerified(id: Types.ObjectId | string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    user.isVerified = true;

    return await user.save();
  }

  async changePassword(id: Types.ObjectId | string | ObjectId, newPasswordHash: string) {
    const user = await this.userModel.findByIdAndUpdate(id, { passwordHash: newPasswordHash });

    if (!user) {
      throw new NotFoundException('User is not found');
    }
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

  async getSuggested(id: string) {
    const suggestedUsers = await this.userModel.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(id) } } },
      { $match: { followers: { $nin: [new mongoose.Types.ObjectId(id)] } } },
      {
        $addFields: {
          followersCount: { $size: '$followers' },
        },
      },
      {
        $sort: { followersCount: -1 },
      },
      { $limit: 3 },
      {
        $project: {
          firstName: 1,
          secondName: 1,
          avatar: 1,
        },
      },
    ]);

    return suggestedUsers;
  }
}
