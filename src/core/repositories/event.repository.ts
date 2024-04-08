import { IEventListFilter } from 'src/features/events/events.helper';
import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IEventRepository } from '../generics';

export class EventRepository<T>
  extends MongoGenericRepository<T>
  implements IEventRepository<T>
{
  list({ skip, limit, searchTerm}: IEventListFilter): Promise<any[]> {
    return this._repository
    .aggregate([
      {
        $match: {
          $or: [
            {
              title: {
                $regex: new RegExp(searchTerm, 'i'),
              },
            },
            {
              description: {
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
        }
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
          title: '$data.title',
          description: '$data.description',
          code: '$data.code',
          image: '$data.image',
          createdAt: '$data.createdAt',
          isDeleted: '$data.isDeleted',
          lastUpdatedAt: '$data.lastUpdatedAt',
        },
      },
    ])
    .exec();
  }
}
