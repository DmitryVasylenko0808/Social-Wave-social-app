import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignUpDto } from './dto/sign.up.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { avatarsStorage } from 'src/multer.config';
import { AuthGuard } from '@nestjs/passport';
import { EmailService } from 'src/email/email.service';
import { VerifyEmailDto } from './dto/verify.email.dto';
import { ForgotPasswordDto } from './dto/forgot.password.dto';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-up')
  @UseInterceptors(FileInterceptor('avatar', { storage: avatarsStorage }))
  async signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile(
      new ParseFilePipeBuilder().addFileTypeValidator({ fileType: 'jpeg' }).build({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return await this.authService.signUp(signUpDto, file?.filename);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return await this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Request() req: any) {
    return await this.authService.signIn(req);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth(@Request() req: any) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async googleAuthRedirect(@Request() req: any, @Res() res: Response) {
    const { token } = await this.authService.signIn(req);
    return res.redirect(
      `${this.configService.get<string>('GOOGLE_CLIENT_AUTH_URL')}/google-auth-redirect?token=${token}`,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Request() req: any) {
    return { userId: req.user.userId };
  }
}
