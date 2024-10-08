import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign.up.dto';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport';
import { VerifyEmailData } from './types/verify.email.data';
import { VerifyEmailDto } from './dto/verify.email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto, filename?: string) {
    const existingUser = await this.usersService.findOneByEmail(data.email);

    if (existingUser) {
      throw new BadRequestException('User with this email is already exists');
    }

    const hash = await bcrypt.hash(data.password, 10);
    const verifyEmailData = this.generateVerifyEmailCode();

    const createdUser = await this.usersService.create({
      ...data,
      ...verifyEmailData,
      passwordHash: hash,
      avatar: filename,
    });

    return createdUser;
  }

  async verifyEmail(data: VerifyEmailDto) {
    const { code } = data;

    const user = await this.usersService.findOneByVerifyEmailCode(code);
    const currentDate = new Date();

    if (currentDate > user.verifyEmailCodeExpiredAt) {
      throw new BadRequestException('Verify code is expired');
    }

    const verifiedUser = await this.usersService.setVerified(user._id);
    const token = await this.generateToken(verifiedUser._id);

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
      avatar: profile.photos[0].value,
    });

    return createdUser;
  }

  private async generateToken(data: Types.ObjectId) {
    const token = await this.jwtService.signAsync({ userId: data });

    return { token };
  }

  private generateVerifyEmailCode(): VerifyEmailData {
    const verifyEmailCode = Math.floor(100000 + Math.random() * 900000);

    const currentDate = new Date(Date.now());
    const verifyEmailCodeExpiredAt = new Date(currentDate);

    verifyEmailCodeExpiredAt.setMinutes(currentDate.getMinutes() + 5);

    return { verifyEmailCode, verifyEmailCodeExpiredAt };
  }
}
