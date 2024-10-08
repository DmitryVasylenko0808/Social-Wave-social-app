import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTest(to: string) {
    await this.mailerService.sendMail({
      to,
      from: 'Social Wave <emiliano.langworth@ethereal.email>',
      subject: 'Test Email',
      text: 'That`s easy!',
    });

    console.log('Success!');
  }
}
