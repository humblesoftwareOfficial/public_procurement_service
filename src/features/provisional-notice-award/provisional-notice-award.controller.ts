import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt.auth.guard';
import { ProvisionalNoticeAwardService } from './provisional-notice-award.service';
import { NewProvisionalNoticeAwardDto, ProvisionalNoticeAwardListingDto, UpdateAwareNoticeDto } from 'src/core/entities/provisional-notice-award/provisional-notice-award.dto';
import { ProvisionalNoticeAward } from 'src/core/entities/provisional-notice-award/provisional-notice-award.entity';
import { isValidAwareNoticeCode } from './provisional-notice-award.helper';
import { InvalidCodeException } from 'src/core/exceptions/invalid-code.exception';

@ApiTags('Provisional Notice Award')
@Controller('provisional-notice-award')
export class ProvisionalNoticeAwardController {
  constructor(private service: ProvisionalNoticeAwardService) {}

  @ApiOkResponse({
    description: '',
    type: ProvisionalNoticeAward,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() value: NewProvisionalNoticeAwardDto) {
    return this.service.create(value);
  }

  @ApiOkResponse({
    description: '',
    type: ProvisionalNoticeAward,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('list')
  async list(@Body() value: ProvisionalNoticeAwardListingDto) {
    return this.service.list(value);
  }

  @ApiOkResponse({
    description: '',
    type: ProvisionalNoticeAward,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':code')
  async update(
    @Param('code') code: string,
    @Body() value: UpdateAwareNoticeDto,
  ) {
    if (!isValidAwareNoticeCode(code)) {
      throw new InvalidCodeException('Aware notice code is incorrect!');
    }
    return this.service.update(code, value);
  }
}
