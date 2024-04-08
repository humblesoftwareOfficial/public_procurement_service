import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IUserRepository } from '../generics';

export class UserRepository<T>
  extends MongoGenericRepository<T>
  implements IUserRepository<T> {
  findByEmail(email: string): Promise<T> {
    return this._repository.findOne({ email: email }).exec()
  }
    
  }
