import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IGenericDataServices } from '../generics/generic-data.services';
import { User } from '../entities/users/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { Model } from 'mongoose';
import { EventRepository } from '../repositories/event.repository';
import { Event } from '../entities/event/event.entity';

@Injectable()
export class MongoDataServices
  implements IGenericDataServices, OnApplicationBootstrap
{
  users: UserRepository<User>;
  events: EventRepository<Event>;
  constructor(
    @InjectModel(User.name)
    private userRepository: Model<User>,
    @InjectModel(Event.name)
    private eventRepository: Model<Event>,
  ) {}
  onApplicationBootstrap() {
    this.users = new UserRepository<User>(this.userRepository);
    this.events = new EventRepository<Event>(this.eventRepository);
  }
}
