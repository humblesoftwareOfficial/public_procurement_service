import { FilterQuery } from 'mongoose';
import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IUserRepository } from '../generics';

export class UserRepository<T>
  extends MongoGenericRepository<T>
  implements IUserRepository<T> {
  findByEmail(email: string): Promise<any> {
    const query: FilterQuery<any> = { email };
    return this._repository.findOne(query, '-__v').lean().exec()
  }
    
  }
