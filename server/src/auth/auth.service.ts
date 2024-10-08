import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign.up.dto';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport';
import { VerifyEmailData } from './types/verify.email.data';
import { VerifyEmailDto } from './dto/verify.email.dto';
import { ForgotPasswordDto } from './dto/forgot.password.dto';
import * as crypto from 'crypto';

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
    const verificationCodeData = this.generateVerificationEmailCode();

    const createdUser = await this.usersService.create({
      ...data,
      ...verificationCodeData,
      passwordHash: hash,
      avatar: filename,
    });

    return createdUser;
  }

  async verifyEmail(data: VerifyEmailDto) {
    const { code } = data;

    const user = await this.usersService.findOneByVerifyEmailCode(code);

    if (!user) {
      throw new BadRequestException('Verification code is invalid or expired');
    }

    const verifiedUser = await this.usersService.setVerified(user._id);
    const token = await this.generateToken(verifiedUser._id);

    return token;
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const { email } = data;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordTokenExpiredAt = new Date(
      Date.now() + 2 * 60 * 60 * 1000,
    );

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiredAt = resetPasswordTokenExpiredAt;

    return await user.save();
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

  private generateVerificationEmailCode(): VerifyEmailData {
    const MIN = 10000;
    const MAX = 90000;

    const verificationCode = Math.floor(MIN + Math.random() * MAX).toString();
    const verificationCodeExpiredAt = new Date(Date.now() + 15 * 60 * 1000);

    return { verificationCode, verificationCodeExpiredAt };
  }
}
