import { IGeneralNoticeFilter } from 'src/features/general-notice/general-notice.helper';
import { MongoGenericRepository } from '../abstracts/abstract-repository';
import { IGeneralNoticeRepository } from '../generics';
import { formatIntervalDate } from 'src/utils';

export class GeneralNoticeRepository<T>
  extends MongoGenericRepository<T>
  implements IGeneralNoticeRepository<T>
{
  list({
    skip,
    limit,
    searchTerm,
    publicationEndDate,
    publicationStartDate,
    limitStartDate,
    limitEndDate,
    types,
  }: IGeneralNoticeFilter): Promise<any[]> {
    const {
      formatedEndDate: formatedPublicationEndDate,
      formatedOneDateFilter: formatedOneDatePublicationFilter,
    } = formatIntervalDate(publicationStartDate, publicationEndDate);

    const {
      formatedEndDate: formatedLimitEndDate,
      formatedOneDateFilter: formatedOneDateLimitFilter,
    } = formatIntervalDate(limitStartDate, limitEndDate);

    let hasAppliedFilter = false;
    if (
      types?.length ||
      searchTerm?.length ||
      publicationEndDate ||
      publicationStartDate ||
      limitStartDate ||
      limitEndDate
    ) {
      hasAppliedFilter = true;
    }
    return this._repository
      .aggregate([
        {
          $match: {
            ...(hasAppliedFilter && {
              limitDate: { $gte: new Date()},
            }),
            ...(publicationStartDate &&
              publicationEndDate && {
                publicationDate: {
                  $gte: publicationStartDate,
                  $lte: formatedPublicationEndDate,
                },
              }),
            ...(publicationStartDate &&
              !publicationEndDate && {
                publicationDate: {
                  $gte: formatedOneDatePublicationFilter.startDate,
                  $lte: formatedOneDatePublicationFilter.endDate,
                },
              }),

            ...(limitStartDate &&
              limitEndDate && {
                limitDate: {
                  $gte: limitStartDate,
                  $lte: formatedLimitEndDate,
                },
              }),
            ...(limitStartDate &&
              !limitEndDate && {
                limitDate: {
                  $gte: formatedOneDateLimitFilter.startDate,
                  $lte: formatedOneDateLimitFilter.endDate,
                },
              }),
            $or: [
              {
                ref: {
                  $regex: new RegExp(searchTerm, 'i'),
                },
              },
              {
                description: {
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
            publicationDate: '$data.publicationDate',
            publicationRef: '$data.publicationRef',
            publicationNumber: '$data.publicationNumber',
            createdAt: '$data.createdAt',
            isDeleted: '$data.isDeleted',
            lastUpdatedAt: '$data.lastUpdatedAt',
            duration: '$data.duration',
            limitDate: '$data.limitDate',
            referralDate: '$data.referralDate',
            isDeferralNotice: '$data.isDeferralNotice',
            financialCapacity: '$data.financialCapacity',
            technicalCapacity: '$data.technicalCapacity',
            experience: '$data.experience',
            description: '$data.description',
            lots: '$data.lots',
            warrantySubmission: '$data.warrantySubmission',
            warrantyGoodExecution: '$data.warrantyGoodExecution',
            warrantyDecennial: '$data.warrantyDecennial',
          },
        },
      ])
      .exec();
  }
}
