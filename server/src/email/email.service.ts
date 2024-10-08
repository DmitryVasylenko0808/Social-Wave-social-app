import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(
    email: string,
    code: number,
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

        Your confirmation code: ${code}

        This code will expire in 15 minutes.

        If you did not register on our website, please disregard this message.`,
    });
  }
}
