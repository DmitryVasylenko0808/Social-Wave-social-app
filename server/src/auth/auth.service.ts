import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign.up.dto';
import * as bcrypt from "bcrypt";
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signUp(data: SignUpDto, filename?: string) {
        const existingUser = await this.usersService.findOneByEmail(data.email);

        if (existingUser) {
            throw new BadRequestException("User with this email is already exists");
        }

        const hash = await bcrypt.hash(data.password, 10);

        const createdUser = await this.usersService.create({
            ...data,
            passwordHash: hash,
            avatar: filename
        });
        const { passwordHash, _id } = createdUser;
        const token = await this.generateToken(_id);

        return token;
    }

    async signIn(data: any) {
        const { _id } = data.user._doc;
        const token = await this.generateToken(_id.toString());

        return token;
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            return null;
        }

        const isValidPass = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPass) {
            return null;
        }

        const { passwordHash, ...data } = user;

        return data;
    }

    async googleValidateUser(profile: Profile) {
        const email = profile.emails[0].value;

        const existingUser = await this.usersService.findOneByEmail(email);

        if (existingUser) {
            const { passwordHash, ...data } = existingUser;

            return data;
        }

        const createdUser = await this.usersService.create({
            email,
            firstName: profile.name.givenName,
            secondName: profile.name.familyName,
            avatar: profile.photos[0].value
        });

        return createdUser;
    }

    private async generateToken(data: Types.ObjectId) {
        const token = await this.jwtService.signAsync({ userId: data });

        return { token };
    }
}
