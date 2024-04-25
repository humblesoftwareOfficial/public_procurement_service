import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt.auth.guard';
import { User } from 'src/core/entities/users/user.entity';
import { EventsListingDto, NewEventDto, UpdateEventDto } from 'src/core/entities/event/event.dto';
import { isValidEventCode } from './events.helper';
import { InvalidCodeException } from 'src/core/exceptions/invalid-code.exception';
import { Event } from 'src/core/entities/event/event.entity';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private service: EventsService) {}

  @ApiOkResponse({
    description: '',
    type: Event,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() value: NewEventDto) {
    return this.service.create(value);
  }

  @ApiOkResponse({
    description: '',
    type: Event,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('list')
  async list(@Body() value: EventsListingDto) {
    return this.service.list(value);
  }

  @ApiOkResponse({
    description: '',
    type: Event,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':code')
  async update(@Param('code') code: string, @Body() value: UpdateEventDto) {
    if (!isValidEventCode(code)) {
      throw new InvalidCodeException('Event code is incorrect!');
    }
    return this.service.update(code, value);
  }
}
