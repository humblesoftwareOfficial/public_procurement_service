import { IPartnerListFilter } from 'src/features/partners/partner.helper';
import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IPartnerRepository } from '../generics';

export class PartnerRepository<T>
  extends MongoGenericRepository<T>
  implements IPartnerRepository<T>
{
  list({ skip, limit, searchTerm }: IPartnerListFilter): Promise<any[]> {
    return this._repository
      .aggregate([
        {
          $match: {
            $or: [
              {
                name: {
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
            name: '$data.name',
            image: '$data.image',
            code: '$data.code',
            url: '$data.url',
            createdAt: '$data.createdAt',
            isDeleted: '$data.isDeleted',
            lastUpdatedAt: '$data.lastUpdatedAt',
          },
        },
      ])
      .exec();
  }
}
