import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, ObjectId, Types } from 'mongoose';
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

  async getFollowers(id: string, page: number, search?: string) {
    const query = new RegExp(search);
    const followers = await this.userModel
      .find(
        {
          followings: { $in: [id] },
          $expr: {
            $regexMatch: {
              input: { $concat: ['$firstName', ' ', '$secondName'] },
              regex: query,
              options: 'i',
            },
          },
        },
        '_id firstName secondName avatar',
      )
      .skip((page - 1) * this.limit)
      .limit(this.limit);

    const totalCount = await this.userModel.countDocuments({
      followings: { $in: [id] },
      $expr: {
        $regexMatch: {
          input: { $concat: ['$firstName', ' ', '$secondName'] },
          regex: query,
          options: 'i',
        },
      },
    });
    const totalPages = Math.ceil(totalCount / this.limit);

    const res: PaginatedUsersResponse = {
      data: followers,
      totalCount,
      totalPages,
      currentPage: page,
      searchValue: search,
    };

    return res;
  }

  async getFollowings(id: string, page: number, search?: string) {
    const query = new RegExp(search);
    const followings = await this.userModel
      .find(
        {
          followers: { $in: [id] },
          $expr: {
            $regexMatch: {
              input: { $concat: ['$firstName', ' ', '$secondName'] },
              regex: query,
              options: 'i',
            },
          },
        },
        '_id firstName secondName avatar',
      )
      .skip((page - 1) * this.limit)
      .limit(this.limit);

    const totalCount = await this.userModel.countDocuments({
      followers: { $in: [id] },
      $expr: {
        $regexMatch: {
          input: { $concat: ['$firstName', ' ', '$secondName'] },
          regex: query,
          options: 'i',
        },
      },
    });
    const totalPages = Math.ceil(totalCount / this.limit);

    const res: PaginatedUsersResponse = {
      data: followings,
      totalCount,
      totalPages,
      currentPage: page,
      searchValue: search,
    };

    return res;
  }

  async getFollowingsIds(id: string) {
    const user = await this.userModel.findById(id, 'followings');
    const followingsIds = user.followings;

    return followingsIds;
  }
}
