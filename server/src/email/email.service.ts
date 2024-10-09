import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyCode(email: string, code: string, firstName: string, secondName: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verification Email',
      html: `
        <p>Hello, ${firstName} ${secondName}!</p>
        
        <p>Thank you for registering on our application. To complete the registration process and verify your account, please use the following code:</p>

        <p>Your verification code: <strong>${code}</strong></p>

        <p>This code will expire in 2 hours.</p>

        <p>If you did not register on our website, please disregard this message.</p>`,
    });
  }

  async sendResetPasswordLink(email: string, token: string, firstName: string, secondName: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      html: `
        <p>Hello, ${firstName} ${secondName}!</p>

        <p>You received this email because a request was made to reset the password for your account. If this was you, please use the link below to set a new password:</p>

        <p>Password Reset Link: <a href="http://localhost:4444/auth/reset-password?token=${token}">Click here to reset your password</a></p>

        <p>This link will expire in 2 hours.</p>

        <p>If you did not request a password reset, simply ignore this email — your password will remain unchanged.</p>`,
    });
  }
}
