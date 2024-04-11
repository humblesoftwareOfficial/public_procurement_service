import { IProvisionalNoticeAwardFilter } from "src/features/provisional-notice-award/provisional-notice-award.helper";
import { MongoGenericRepository } from "../abstracts/abstract-repository";
import { IProvisionalNoticeAwardRepository } from "../generics";

export class ProvisionalNoticeAwardRepository<T>
  extends MongoGenericRepository<T>
  implements IProvisionalNoticeAwardRepository<T> {
    list({ skip, limit, searchTerm }: IProvisionalNoticeAwardFilter): Promise<any[]> {
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
              type: {
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
          name: '$data.name',
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
          createdAt: '$data.createdAt',
          isDeleted: '$data.isDeleted',
          lastUpdatedAt: '$data.lastUpdatedAt',
        },
      },
    ])
    .exec();
    }

  }