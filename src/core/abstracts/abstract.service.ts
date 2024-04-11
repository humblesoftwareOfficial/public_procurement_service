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

@Injectable()
export class MongoDataServices
  implements IGenericDataServices, OnApplicationBootstrap
{
  users: UserRepository<User>;
  events: EventRepository<Event>;
  procurement_plans: ProcurementPlanRepository<ProcurementPlan>;
  constructor(
    @InjectModel(User.name)
    private userRepository: Model<User>,
    @InjectModel(Event.name)
    private eventRepository: Model<Event>,
    @InjectModel(ProcurementPlan.name)
    private procurementPlanRepository: Model<ProcurementPlan>,
  ) {}
 
  onApplicationBootstrap() {
    this.users = new UserRepository<User>(this.userRepository);
    this.events = new EventRepository<Event>(this.eventRepository);
    this.procurement_plans = new ProcurementPlanRepository<ProcurementPlan>(this.procurementPlanRepository);
  }
}
