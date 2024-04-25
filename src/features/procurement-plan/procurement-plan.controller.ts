import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProcurementPlanService } from './procurement-plan.service';
import { ProcurementPlan } from 'src/core/entities/procurement-plan/procurement-plan.entity';
import { JwtAuthGuard } from '../authentication/jwt.auth.guard';
import {
  NewProcurementPlanDto,
  ProcurementPlanListingDto,
  UpdateProcurementPlanDto,
} from 'src/core/entities/procurement-plan/procurement-plan.dto';
import { isValidProcurementPlanCode } from './procurement-plan.helper';
import { InvalidCodeException } from 'src/core/exceptions/invalid-code.exception';

@ApiTags('Procurement Plan')
@Controller('procurement-plan')
export class ProcurementPlanController {
  constructor(private service: ProcurementPlanService) {}

  @ApiOkResponse({
    description: '',
    type: ProcurementPlan,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() value: NewProcurementPlanDto) {
    return this.service.create(value);
  }

  @ApiOkResponse({
    description: '',
    type: ProcurementPlan,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('list')
  async list(@Body() value: ProcurementPlanListingDto) {
    return this.service.list(value);
  }

  @ApiOkResponse({
    description: '',
    type: ProcurementPlan,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':code')
  async update(
    @Param('code') code: string,
    @Body() value: UpdateProcurementPlanDto,
  ) {
    if (!isValidProcurementPlanCode(code)) {
      throw new InvalidCodeException('Procurement Plan code is incorrect!');
    }
    return this.service.update(code, value);
  }
}
