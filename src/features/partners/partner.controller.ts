import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt.auth.guard';
import { InvalidCodeException } from 'src/core/exceptions/invalid-code.exception';
import { Partner } from 'src/core/entities/partners/partner.entity';
import { isValidPartnerCode } from './partner.helper';
import { NewPartnerDto, PartnersListingDto, UpdatePartnerDto } from 'src/core/entities/partners/partner.dto';
import { PartnerService } from './partner.service';

@ApiTags('Partners')
@Controller('partners')
export class PartnerController {
  constructor(private service: PartnerService) {}

  @ApiOkResponse({
    description: '',
    type: Partner,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() value: NewPartnerDto) {
    return this.service.create(value);
  }

  @ApiOkResponse({
    description: '',
    type: Partner,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('list')
  async list(@Body() value: PartnersListingDto) {
    return this.service.list(value);
  }

  @ApiOkResponse({
    description: '',
    type: Partner,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':code')
  async update(@Param('code') code: string, @Body() value: UpdatePartnerDto) {
    if (!isValidPartnerCode(code)) {
      throw new InvalidCodeException('Partner code is incorrect!');
    }
    return this.service.update(code, value);
  }
}
