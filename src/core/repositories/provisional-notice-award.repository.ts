import { IProvisionalNoticeAwardFilter } from "src/features/provisional-notice-award/provisional-notice-award.helper";
import { MongoGenericRepository } from "../abstracts/abstract-repository";
import { IProvisionalNoticeAwardRepository } from "../generics";
import { formatIntervalDate } from "src/utils";

export class ProvisionalNoticeAwardRepository<T>
  extends MongoGenericRepository<T>
  implements IProvisionalNoticeAwardRepository<T> {
    list({ skip, limit, searchTerm, publicationStartDate, publicationEndDate, types }: IProvisionalNoticeAwardFilter): Promise<any[]> {

      const {
        formatedEndDate: formatedPublicationEndDate,
        formatedOneDateFilter: formatedOneDatePublicationFilter,
      } = formatIntervalDate(publicationStartDate, publicationEndDate);

      return this._repository
    .aggregate([
      {
        $match: {
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

          $or: [
            {
              name: {
                $regex: new RegExp(searchTerm, 'i'),
              },
            },
            {
              nameOfAssignee: {
                $regex: new RegExp(searchTerm, 'i'),
              },
            },
            {
              authority: {
                $regex: new RegExp(searchTerm, 'i'),
              },
            },
            {
              ref: {
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
          name: '$data.name',
          ref: '$data.ref',
          authority: '$data.authority',
          type: '$data.type',
          publicationDate: '$data.publicationDate',
          publicationLocation: '$data.publicationLocation',
          receivedOffers: '$data.receivedOffers',
          nameOfAssignee: '$data.nameOfAssignee',
          addressOfAssignee: '$data.addressOfAssignee',
          offerAmount: '$data.offerAmount',
          offerAmountInLetter: '$data.offerAmountInLetter',
          detail: '$data.detail',
          method: '$data.method',
          delay: '$data.delay',
          limitDate: '$data.limitDate',
          createdAt: '$data.createdAt',
          isDeleted: '$data.isDeleted',
          lastUpdatedAt: '$data.lastUpdatedAt',
        },
      },
    ])
    .exec();
    }

  }