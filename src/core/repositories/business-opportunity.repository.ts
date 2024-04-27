import { IOpportunitiesListFilter } from 'src/features/business-opportunity/business-opportunity.helper';
import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IBusinessOpportunityRepository } from '../generics';

export class BusinessOpportunityRepository<T>
  extends MongoGenericRepository<T>
  implements IBusinessOpportunityRepository<T> {
    list({ skip, limit, searchTerm}: IOpportunitiesListFilter): Promise<any[]> {
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
            text: '$data.text',
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
