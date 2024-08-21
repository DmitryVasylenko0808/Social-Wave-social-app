import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign.up.dto';
import * as bcrypt from "bcrypt";
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signUp(data: SignUpDto) {
        const existingUser = await this.usersService.findOneByEmail(data.email);

        if (existingUser) {
            throw new BadRequestException("User with this email is already exists");
        }

        const hash = await bcrypt.hash(data.password, 10);

        const createdUser = await this.usersService.create({
            ...data,
            passwordHash: hash
        });
        const { passwordHash, _id } = createdUser;
        const token = await this.generateToken(_id);

        return token;
    }

    async signIn(data: unknown) {

    }

    async validateUser(data: unknown) {

    }

    private async generateToken(data: Types.ObjectId) {
        const token = await this.jwtService.signAsync({ userId: data });

        return { token };
    }
}
