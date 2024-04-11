import { IProcurementPlanListFilter } from 'src/features/procurement-plan/procurement-plan.helper';
import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IProcurementPlanRepository } from '../generics';

export class ProcurementPlanRepository<T>
  extends MongoGenericRepository<T>
  implements IProcurementPlanRepository<T> {

  list({ skip, limit, searchTerm }: IProcurementPlanListFilter): Promise<any[]> {
    return this._repository
    .aggregate([
      {
        $match: {
          $or: [
            {
              ref: {
                $regex: new RegExp(searchTerm, 'i'),
              },
            },
            {
              method: {
                $regex: new RegExp(searchTerm, 'i'),
              },
            },
            {
              realization: {
                $regex: new RegExp(searchTerm, 'i'),
              },
            },
            {
              authority: {
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
          ref: '$data.ref',
          authority: '$data.authority',
          realization: '$data.realization',
          method: '$data.method',
          code: '$data.code',
          type: '$data.type',
          launchDate: '$data.launchDate',
          grantDate: '$data.grantDate',
          createdAt: '$data.createdAt',
          isDeleted: '$data.isDeleted',
          lastUpdatedAt: '$data.lastUpdatedAt',
        },
      },
    ])
    .exec();
  }
}
