import { Event } from '../entities/event/event.entity';
import { User } from '../entities/users/user.entity';
import { EventRepository } from '../repositories/event.repository';
import { UserRepository } from '../repositories/user.repository';

export abstract class IGenericDataServices {
  abstract users: UserRepository<User>;
  abstract events: EventRepository<Event>;
}
