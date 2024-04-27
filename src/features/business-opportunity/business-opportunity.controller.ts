import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt.auth.guard';
import { InvalidCodeException } from 'src/core/exceptions/invalid-code.exception';
import { BusinessOpportunityService } from './business-opportunity.service';
import { BusinessOpportunity } from 'src/core/entities/business-opportunities/business-opportunities.entity';
import { BusinessOpportunitiesListingDto, NewBusinessOpportunityDto, UpdateBusinessOpportunityDto } from 'src/core/entities/business-opportunities/business-opportunities.dto';
import { isValidBusinessOpportunityCode } from './business-opportunity.helper';

@ApiTags('Opportunities')
@Controller('opportunities')
export class BusinessOpportunityController {
  constructor(private service: BusinessOpportunityService) {}

  @ApiOkResponse({
    description: '',
    type: BusinessOpportunity,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() value: NewBusinessOpportunityDto) {
    return this.service.create(value);
  }

  @ApiOkResponse({
    description: '',
    type: BusinessOpportunity,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('list')
  async list(@Body() value: BusinessOpportunitiesListingDto) {
    return this.service.list(value);
  }

  @ApiOkResponse({
    description: '',
    type: BusinessOpportunity,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':code')
  async update(@Param('code') code: string, @Body() value: UpdateBusinessOpportunityDto) {
    if (!isValidBusinessOpportunityCode(code)) {
      throw new InvalidCodeException('Opportunity code is incorrect!');
    }
    return this.service.update(code, value);
  }
}
