import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../authentication/jwt.auth.guard';
import { GeneralNoticeService } from './general-notice.service';
import { GeneralNotice } from 'src/core/entities/general-notice/general-notice.entity';
import {
  GeneralNoticeListingDto,
  NewGeneralNoticeDto,
} from 'src/core/entities/general-notice/general-notice.dto';

@ApiTags('General Notice')
@Controller('general-notice')
export class GeneralNoticeController {
  constructor(private service: GeneralNoticeService) {}

  @ApiOkResponse({
    description: '',
    type: GeneralNotice,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() value: NewGeneralNoticeDto) {
    return this.service.create(value);
  }

  @ApiOkResponse({
    description: '',
    type: GeneralNotice,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('list')
  async list(@Body() value: GeneralNoticeListingDto) {
    return this.service.list(value);
  }
}