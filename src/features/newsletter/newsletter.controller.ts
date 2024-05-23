import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NewsletterGeneralNoticeDto } from 'src/core/entities/shared/shared.dto';
import { JwtAuthGuard } from '../authentication/jwt.auth.guard';

@ApiTags('Newsletter')
@Controller('newsletters')
@UseGuards(JwtAuthGuard)
export class NewsletterController {
  constructor(private service: NewsletterService) {}

  @ApiOkResponse({
    description: 'Newsletter sent',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('general-notices')
  async list(@Body() value: NewsletterGeneralNoticeDto) {
    return this.service.generalNotice(value);
  }
}
