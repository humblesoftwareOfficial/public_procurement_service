import { HttpStatus, Injectable } from '@nestjs/common';
import { Result, succeed } from 'src/config/http-response';
import { NewsletterGeneralNoticeDto } from 'src/core/entities/shared/shared.dto';
import { IGenericDataServices } from 'src/core/generics/generic-data.services';
import { MailService } from '../mail/mail.service';
import { ISendNewsletter } from './newsletter.helper';

@Injectable()
export class NewsletterService {
  constructor(
    private dataServices: IGenericDataServices,
    private mailerService: MailService,
  ) {}

  async generalNotice(value: NewsletterGeneralNoticeDto): Promise<Result> {
    try {
      const [users, generalNotices] = await Promise.all([
        this.dataServices.users.findAll('email'),
        this.dataServices.general_notice.findAllByCodes(
          value.data,
          '-_id authority realization ref type',
        ),
      ]);
      if (users?.length && generalNotices.length) {
        const testusers = [
          {
            email: 'mamadou001thiam@gmail.com',
          }
        //   {
        //     email: 'lamine.thiam@ldb.sn',
        //   },
        ];
        const subject = value.title;
        const template = './generalnotice';
        const info = value.title;
        const body = {
            data: generalNotices.reverse()
        };
        const description = value.description
        for (const user of users) {
          this.sendMail({
            subject,
            template,
            info,
            body,
            email: user.email,
            description,
          });
        }
      }
      return succeed({
        code: HttpStatus.OK,
        message: 'Newsletter sent!',
        data: {},
      });
    } catch (error) {
      console.log({ error });
    }
  }

  sendMail({ subject, template, email, info, body, description }: ISendNewsletter) {
    const data = {
      subject,
      template,
      email,
      info,
      body,
      description
    };
    this.mailerService
      .sendMail(data)
      .then(() => {
        console.log('Mail sent!!');
      })
      .catch((error) => {
        console.log({ error });
      });
  }
}
