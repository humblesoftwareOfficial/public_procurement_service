import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/core/abstracts/abstract.data-services.module';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService],
  imports: [DataServicesModule, MailModule],
})
export class NewsletterModule {}
