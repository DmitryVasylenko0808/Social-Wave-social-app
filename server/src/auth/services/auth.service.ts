import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { SignUpDto } from '../dto/sign.up.dto';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport';
import { VerifyEmailDto } from '../dto/verify.email.dto';
import { ForgotPasswordDto } from '../dto/forgot.password.dto';
import { ResetPasswordDto } from '../dto/reset.password.dto';
import { VerificationCodesService } from './verification.codes.service';
import { EmailService } from 'src/email/email.service';
import { ResetPasswordTokensService } from './reset.password.tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly verificationCodesService: VerificationCodesService,
    private readonly resetPasswordTokensService: ResetPasswordTokensService,
    private readonly emailService: EmailService,
  ) {}

  async signUp(data: SignUpDto, filename?: string) {
    const existingUser = await this.usersService.findOneByEmail(data.email);

    if (existingUser) {
      throw new BadRequestException('User with this email is already exists');
    }

    const hash = await bcrypt.hash(data.password, 10);
    const createdUser = await this.usersService.create({
      ...data,
      passwordHash: hash,
      avatar: filename,
    });
    const { _id: userId, email, firstName, secondName } = createdUser;

    const verificationCode = await this.verificationCodesService.generate(userId);

    await this.emailService.sendVerifyCode(email, verificationCode.code, firstName, secondName);

    const res = { userId, email };

    return res;
  }

  async verifyEmail(data: VerifyEmailDto) {
    const { userId, code } = data;

    const isValidCode = await this.verificationCodesService.compare(userId, code);

    if (!isValidCode) {
      throw new BadRequestException('Verification code is invalid or expired');
    }

    const verifiedUser = await this.usersService.setVerified(userId);
    const token = await this.generateToken(verifiedUser._id);

    await this.verificationCodesService.remove(userId);

    return token;
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const { email } = data;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    const { firstName, secondName } = user;
    const resetPasswordToken = await this.resetPasswordTokensService.generate(user._id);

    await this.emailService.sendResetPasswordLink(
      email,
      resetPasswordToken.token,
      firstName,
      secondName,
    );
  }

  async resetPassword(data: ResetPasswordDto) {
    const { token, newPassword } = data;
    const resetPasswordToken = await this.resetPasswordTokensService.findOne(token);

    await this.resetPasswordTokensService.remove(token);

    if (!resetPasswordToken) {
      throw new BadRequestException('Token is invalid or expired');
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await this.usersService.changePassword(resetPasswordToken.userId, hash);
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
}
