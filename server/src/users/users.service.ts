import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { EditUserDto } from './dto/edit.user.dto';

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

    async findOneById(id: string) {
        const user = await this.userModel.findById(id);

        return user;
    }

    async findOneByEmail(email: string) {
        const user = await this.userModel.findOne({ email });

        return user;
    }

    async edit(id: string, data: EditUserDto, avatar?: string) {
        const user = await this.userModel.findByIdAndUpdate(
            id,
            { ...data, avatar},
            { new: true }
        );

        if (!user) {
            throw new BadRequestException("User is not found");
        }

        return user;
    }

    async follow(id: string, userId: string) {
        const user = await this.userModel.findByIdAndUpdate(
            id,
            { 
               $push: { followers: userId } 
            },
            { new: true }
        );

        if (!user) {
            throw new BadRequestException("User is not found")
        }

        await this.userModel.findByIdAndUpdate(
            userId,
            {
                $push: { followings: id }
            },
            { new: true }
        );
    }

    async unfollow(id: string, userId: string) {
        const user = await this.userModel.findByIdAndUpdate(
            id,
            { 
               $pull: { followers: userId } 
            },
            { new: true }
        );

        if (!user) {
            throw new BadRequestException("User is not found")
        }

        await this.userModel.findByIdAndUpdate(
            userId,
            {
                $pull: { followings: id }
            },
            { new: true }
        );
    }

}
