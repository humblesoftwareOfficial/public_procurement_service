import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IUserRepository } from '../generics';

export class UserRepository<T>
  extends MongoGenericRepository<T>
  implements IUserRepository<T> {
  findByEmail(email: string): Promise<any> {
    return this._repository.findOne({ email }, '-__v').lean().exec()
  }
    
  }
