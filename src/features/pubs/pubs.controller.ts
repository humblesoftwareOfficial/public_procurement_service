import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt.auth.guard';
import { InvalidCodeException } from 'src/core/exceptions/invalid-code.exception';
import { PubsService } from './pubs.service';
import { Pubs } from 'src/core/entities/pubs/pubs.entity';
import { AddPubOnNewsLetter, NewPubDto, PubsListingDto, UpdatePubDto } from 'src/core/entities/pubs/pubs.dto';
import { isValidPubCode } from './pubs.helper';

@ApiTags('Pubs')
@Controller('pubs')
export class PubsController {
  constructor(private service: PubsService) {}

  @ApiOkResponse({
    description: '',
    type: Pubs,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() value: NewPubDto) {
    return this.service.create(value);
  }

  @ApiOkResponse({
    description: '',
    type: Pubs,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('list')
  async list(@Body() value: PubsListingDto) {
    return this.service.list(value);
  }

  @ApiOkResponse({
    description: '',
    type: Pubs,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':code')
  async update(@Param('code') code: string, @Body() value: UpdatePubDto) {
    if (!isValidPubCode(code)) {
      throw new InvalidCodeException('Pub code is incorrect!');
    }
    return this.service.update(code, value);
  }

  @ApiOkResponse({
    description: '',
    type: Pubs,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('add-on-newsletter')
  async addOnNewsletter(@Body() value: AddPubOnNewsLetter) {
    return this.service.addOnNewsletter(value);
  }
}
