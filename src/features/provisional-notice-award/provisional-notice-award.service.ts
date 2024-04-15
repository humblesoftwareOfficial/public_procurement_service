import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { codeGenerator } from 'src/config/code-generator';
import { Result, succeed } from 'src/config/http-response';
import { NewProvisionalNoticeAwardDto, ProvisionalNoticeAwardListingDto } from 'src/core/entities/provisional-notice-award/provisional-notice-award.dto';
import { ProvisionalNoticeAward } from 'src/core/entities/provisional-notice-award/provisional-notice-award.entity';
import { IGenericDataServices } from 'src/core/generics/generic-data.services';
import { stringToDate, stringToFullDate } from 'src/utils';

@Injectable()
export class ProvisionalNoticeAwardService {
  constructor(private dataServices: IGenericDataServices) {}

  async create(data: NewProvisionalNoticeAwardDto): Promise<Result> {
    try {
      const operationDate = new Date();
      const newProvisionalNoticeAward: ProvisionalNoticeAward = {
        code: codeGenerator('PNA'),
        ref: data.ref,
        authority: data.authority,
        name: data.name,
        type: data.type,
        publicationLocation: data.publicationLocation,
        receivedOffers: data.receivedOffers,
        nameOfAssignee: data.nameOfAssignee,
        addressOfAssignee: data.addressOfAssignee,
        offerAmount: data.offerAmount,
        offerAmountInLetter: data.offerAmountInLetter,
        detail: data.detail,
        createdAt: operationDate,
        lastUpdatedAt: operationDate,
        publicationDate: stringToFullDate(`${data.publicationDate} 00:00:00`),
      };
      await this.dataServices.provisional_notice_award.create(newProvisionalNoticeAward);
      return succeed({
        code: HttpStatus.CREATED,
        data: newProvisionalNoticeAward,
      })
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        `Error while creating new procurement plan.Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async list(filter: ProvisionalNoticeAwardListingDto): Promise<Result> {
    try {
      const skip = (filter.page - 1) * filter.limit;
      const publicationStartDate = filter.publicationStartDate ? stringToDate(filter.publicationStartDate) : null;
      const publicationEndDate = filter.publicationEndDate ? stringToDate(filter.publicationEndDate) : null;

      const result = await this.dataServices.provisional_notice_award.list({
        limit: filter.limit,
        skip,
        searchTerm: filter.searchTerm,
        publicationEndDate,
        publicationStartDate,
        types: filter.types
      });
      if (!result?.length) {
        return succeed({
          code: HttpStatus.OK,
          message: '',
          data: {
            total: 0,
            aware_notices: [],
          },
        });
      }
      const total = result[0].total;
      const aware_notices = result.flatMap(i => ({
        ...i,
        total: undefined,
      }));

      return succeed({
        code: HttpStatus.OK,
        message: '',
        data: { total, aware_notices },
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while getting procurements plans list. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
