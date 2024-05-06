import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IGenericDataServices } from '../generics/generic-data.services';
import { User } from '../entities/users/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { Model } from 'mongoose';
import { EventRepository } from '../repositories/event.repository';
import { Event } from '../entities/event/event.entity';
import { ProcurementPlan } from '../entities/procurement-plan/procurement-plan.entity';
import { ProcurementPlanRepository } from '../repositories/procurement-plan.repository';
import { ProvisionalNoticeAward } from '../entities/provisional-notice-award/provisional-notice-award.entity';
import { ProvisionalNoticeAwardRepository } from '../repositories/provisional-notice-award.repository';
import { GeneralNotice } from '../entities/general-notice/general-notice.entity';
import { GeneralNoticeRepository } from '../repositories/general-notice.repository';
import { BusinessOpportunity } from '../entities/business-opportunities/business-opportunities.entity';
import { BusinessOpportunityRepository } from '../repositories/business-opportunity.repository';
import { Partner } from '../entities/partners/partner.entity';
import { PartnerRepository } from '../repositories/partner.repository';

@Injectable()
export class MongoDataServices
  implements IGenericDataServices, OnApplicationBootstrap
{
  users: UserRepository<User>;
  events: EventRepository<Event>;
  procurement_plans: ProcurementPlanRepository<ProcurementPlan>;
  provisional_notice_award: ProvisionalNoticeAwardRepository<ProvisionalNoticeAward>;
  general_notice: GeneralNoticeRepository<GeneralNotice>;
  business_opportunities: BusinessOpportunityRepository<BusinessOpportunity>;
  partners: PartnerRepository<Partner>;

  constructor(
    @InjectModel(User.name)
    private userRepository: Model<User>,
    @InjectModel(Event.name)
    private eventRepository: Model<Event>,
    @InjectModel(ProcurementPlan.name)
    private procurementPlanRepository: Model<ProcurementPlan>,
    @InjectModel(ProvisionalNoticeAward.name)
    private provisionalNoticeAwardRepository: Model<ProvisionalNoticeAward>,
    @InjectModel(GeneralNotice.name)
    private generalNoticeRepository: Model<GeneralNotice>,
    @InjectModel(BusinessOpportunity.name)
    private businessOpportunityRepository: Model<BusinessOpportunity>,
    @InjectModel(Partner.name)
    private partnerRepository: Model<Partner>,
  ) {}

  onApplicationBootstrap() {
    this.users = new UserRepository<User>(this.userRepository);
    this.events = new EventRepository<Event>(this.eventRepository);
    this.procurement_plans = new ProcurementPlanRepository<ProcurementPlan>(
      this.procurementPlanRepository,
    );
    this.provisional_notice_award =
      new ProvisionalNoticeAwardRepository<ProvisionalNoticeAward>(
        this.provisionalNoticeAwardRepository,
      );

    this.general_notice = new GeneralNoticeRepository<GeneralNotice>(
      this.generalNoticeRepository,
    );
    this.business_opportunities = new BusinessOpportunityRepository<BusinessOpportunity>(
      this.businessOpportunityRepository,
    );
    this.partners = new PartnerRepository<Partner>(this.partnerRepository);
  }
}
