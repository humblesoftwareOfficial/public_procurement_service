import { FilterQuery } from 'mongoose';
import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IUserRepository } from '../generics';
import { IUserListFilter } from 'src/features/users/users.helper';

export class UserRepository<T>
  extends MongoGenericRepository<T>
  implements IUserRepository<T> {
  list({ limit, skip, searchTerm}: IUserListFilter): Promise<any[]> {
    return this._repository
      .aggregate([
        {
          $match: {
            $or: [
              {
                email: {
                  $regex: new RegExp(searchTerm, 'i'),
                },
              },
            ],
            isDeleted: false,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $facet: {
            count: [
              {
                $group: {
                  _id: null,
                  value: {
                    $sum: 1,
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                },
              },
            ],
            data: [
              {
                $project: {
                  _id: 0,
                },
              },
              {
                $skip: skip,
              },
              {
                $limit: limit,
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$count',
          },
        },
        {
          $unwind: {
            path: '$data',
          },
        },
        {
          $project: {
            _id: 0,
            total: '$count.value',
            firstName: '$data.firstName',
            lastName: '$data.lastName',
            code: '$data.code',
            email: '$data.email',
            createdAt: '$data.createdAt',
            isDeleted: '$data.isDeleted',
            lastUpdatedAt: '$data.lastUpdatedAt',
          },
        },
      ])
      .exec();
  }
  findByEmail(email: string): Promise<any> {
    const query: FilterQuery<any> = { email };
    return this._repository.findOne(query, '-__v').lean().exec()
  }
    
  }
