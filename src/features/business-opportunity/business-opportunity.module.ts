import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/core/abstracts/abstract.data-services.module';
import { BusinessOpportunityController } from './business-opportunity.controller';
import { BusinessOpportunityService } from './business-opportunity.service';

@Module({
  controllers: [BusinessOpportunityController],
  providers: [BusinessOpportunityService],
  imports: [DataServicesModule],
})
export class BusinessOpportunityModule {}
