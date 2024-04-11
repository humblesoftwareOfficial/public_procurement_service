import { Event } from '../entities/event/event.entity';
import { ProcurementPlan } from '../entities/procurement-plan/procurement-plan.entity';
import { ProvisionalNoticeAward } from '../entities/provisional-notice-award/provisional-notice-award.entity';
import { User } from '../entities/users/user.entity';
import { EventRepository } from '../repositories/event.repository';
import { ProcurementPlanRepository } from '../repositories/procurement-plan.repository';
import { ProvisionalNoticeAwardRepository } from '../repositories/provisional-notice-award.repository';
import { UserRepository } from '../repositories/user.repository';

export abstract class IGenericDataServices {
  abstract users: UserRepository<User>;
  abstract events: EventRepository<Event>;
  abstract procurement_plans: ProcurementPlanRepository<ProcurementPlan>;
  abstract provisional_notice_award: ProvisionalNoticeAwardRepository<ProvisionalNoticeAward>;
}
