import { IGeneralNoticeFilter } from 'src/features/general-notice/general-notice.helper';
import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IGeneralNoticeRepository } from '../generics';

export class GeneralNoticeRepository<T>
  extends MongoGenericRepository<T>
  implements IGeneralNoticeRepository<T>
{
  list({ skip, limit, searchTerm }: IGeneralNoticeFilter): Promise<any[]> {
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
            ref: '$data.ref',
            authority: '$data.authority',
            realization: '$data.realization',
            method: '$data.method',
            code: '$data.code',
            type: '$data.type',
            launchDate: '$data.launchDate',
            grantDate: '$data.grantDate',
            publicationDate: '$data.publicationDate',
            publicationRef: '$data.publicationRef',
            publicationNumber: '$data.publicationNumber',
            createdAt: '$data.createdAt',
            isDeleted: '$data.isDeleted',
            lastUpdatedAt: '$data.lastUpdatedAt',
            duration: '$data.duration',
          },
        },
      ])
      .exec();
  }
}
