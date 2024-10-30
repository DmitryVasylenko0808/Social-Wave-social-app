import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { EmailModule } from 'src/email/email.module';
import { VerificationCodesService } from './services/verification.codes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationCode, VerificationCodeSchema } from './schemas/verification.code.schema';
import { ResetPasswordTokensService } from './services/reset.password.tokens.service';
import {
  ResetPasswordToken,
  ResetPasswordTokenSchema,
} from './schemas/reset.password.token.schema';
import { WsAuthService } from './services/ws.auth.service';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    MongooseModule.forFeature([
      { name: VerificationCode.name, schema: VerificationCodeSchema },
      { name: ResetPasswordToken.name, schema: ResetPasswordTokenSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    VerificationCodesService,
    ResetPasswordTokensService,
    WsAuthService,
  ],
  controllers: [AuthController],
  exports: [WsAuthService],
})
export class AuthModule {}
