/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail({ subject, template, name, email, body, info, emails }: any) {
    await this.mailerService.sendMail({
      to: email,//emails.join(','),
      subject: subject,
      template: template,
      context: {
        name: name,
        email: email,
        body: body,
        info: info,
      },
    });
  }
}
