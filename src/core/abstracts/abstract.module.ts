import { Module } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "../entities/users/user.entity";
import { IGenericDataServices } from "../generics/generic-data.services";
import { MongoDataServices } from "./abstract.service";
import { Event, EventSchema } from '../entities/event/event.entity';
import { ProcurementPlan, ProcurementPlanSchema } from '../entities/procurement-plan/procurement-plan.entity';
import { ProvisionalNoticeAward, ProvisionalNoticeAwardSchema } from '../entities/provisional-notice-award/provisional-notice-award.entity';
import { GeneralNotice, GeneralNoticeSchema } from '../entities/general-notice/general-notice.entity';
import { BusinessOpportunity, BusinessOpportunitySchema } from '../entities/business-opportunities/business-opportunities.entity';
import { Partner, PartnerSchema } from '../entities/partners/partner.entity';
import { Pubs, PubsSchema } from '../entities/pubs/pubs.entity';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Event.name, schema: EventSchema },
      { name: ProcurementPlan.name, schema: ProcurementPlanSchema },
      { name: ProvisionalNoticeAward.name, schema: ProvisionalNoticeAwardSchema },
      { name: GeneralNotice.name, schema: GeneralNoticeSchema },
      { name: BusinessOpportunity.name, schema: BusinessOpportunitySchema },
      { name: Partner.name, schema: PartnerSchema },
      { name: Pubs.name, schema: PubsSchema },
    ]),
  ],
  providers: [
    {
      provide: IGenericDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IGenericDataServices],
})
export class AbstractMongoModule {}
