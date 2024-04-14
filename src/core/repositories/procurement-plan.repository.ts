import { IProcurementPlanListFilter } from 'src/features/procurement-plan/procurement-plan.helper';
import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IProcurementPlanRepository } from '../generics';
import { formatIntervalDate } from 'src/utils';

export class ProcurementPlanRepository<T>
  extends MongoGenericRepository<T>
  implements IProcurementPlanRepository<T>
{
  list({
    skip,
    limit,
    searchTerm,
    grantEndDate,
    grantStartDate,
    launchEndDate,
    launchStartDate,
    types,
  }: IProcurementPlanListFilter): Promise<any[]> {
    const {
      formatedEndDate: formatedLaunchEndDate,
      formatedOneDateFilter: formatedOneDateLaunchFilter,
    } = formatIntervalDate(launchStartDate, launchEndDate);

    const {
      formatedEndDate: formatedGrantEndDate,
      formatedOneDateFilter: formatedOneDateGrantFilter,
    } = formatIntervalDate(grantStartDate, grantEndDate);

    return this._repository
      .aggregate([
        {
          $match: {
            ...(launchStartDate &&
              launchEndDate && {
                launchDate: {
                  $gte: launchStartDate,
                  $lte: formatedLaunchEndDate,
                },
              }),
            ...(launchStartDate &&
              !launchEndDate && {
                launchDate: {
                  $gte: formatedOneDateLaunchFilter.startDate,
                  $lte: formatedOneDateLaunchFilter.endDate,
                },
              }),
            ...(grantStartDate &&
              grantEndDate && {
                grantDate: {
                  $gte: grantStartDate,
                  $lte: formatedGrantEndDate,
                },
              }),
            ...(grantStartDate &&
              !grantEndDate && {
                grantDate: {
                  $gte: formatedOneDateGrantFilter.startDate,
                  $lte: formatedOneDateGrantFilter.endDate,
                },
              }),
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
            ...(types?.length && {
              type: {
                $in: types,
              },
            }),
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
            createdAt: '$data.createdAt',
            isDeleted: '$data.isDeleted',
            lastUpdatedAt: '$data.lastUpdatedAt',
          },
        },
      ])
      .exec();
  }
}
