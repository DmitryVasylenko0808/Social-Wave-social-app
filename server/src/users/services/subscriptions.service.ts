import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { PaginatedUsersResponse } from 'src/users/types/paginated.users.response';

@Injectable()
export class SubscriptionsService {
  private readonly limit: number;

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    this.limit = 10;
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
