import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}

    async create(data: Omit<User, "followers" | "followings">) {
        const createdUser = new this.userModel({
            ...data,
            followers: [],
            followings: []
        });

        return createdUser.save();
    }

    async findOneByEmail(email: string) {
        const user = await this.userModel.findOne({ email });

        return user;
    }

    async findOneById(id: string) {
        const user = await this.userModel.findById(id);

        return user;
    }
}
