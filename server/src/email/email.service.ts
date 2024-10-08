import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyCode(
    email: string,
    code: string,
    firstName: string,
    secondName: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      from: 'Social Wave <emiliano.langworth@ethereal.email>',
      subject: 'Verification Email',
      text: `
        Hello, ${firstName} ${secondName}!
        
        Thank you for registering on our application. To complete the registration process and verify your account, please use the following code:

        Your verification code: ${code}

        This code will expire in 15 minutes.

        If you did not register on our website, please disregard this message.`,
    });
  }

  async sendResetPasswordLink(
    email: string,
    token: string,
    firstName: string,
    secondName: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      from: 'Social Wave <emiliano.langworth@ethereal.email>',
      subject: 'Reset Password',
      text: `
        Hello, ${firstName} ${secondName}!

        You received this email because a request was made to reset the password for your account. If this was you, please use the link below to set a new password:

        Password Reset Link: http://localhost:4444/auth/reset-password/${token}

        This link will expire in 2 hours.

        If you did not request a password reset, simply ignore this email — your password will remain unchanged.`,
    });
  }
}
