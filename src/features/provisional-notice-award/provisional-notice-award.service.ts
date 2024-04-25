import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { codeGenerator } from 'src/config/code-generator';
import { Result, succeed } from 'src/config/http-response';
import {
  NewProvisionalNoticeAwardDto,
  ProvisionalNoticeAwardListingDto,
  UpdateAwareNoticeDto,
} from 'src/core/entities/provisional-notice-award/provisional-notice-award.dto';
import { ProvisionalNoticeAward } from 'src/core/entities/provisional-notice-award/provisional-notice-award.entity';
import { IGenericDataServices } from 'src/core/generics/generic-data.services';
import { stringToDate, stringToFullDate } from 'src/utils';
import { getLimitDateOfProcurement } from '../general-notice/general-notice.helper';

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
        // nameOfAssignee: data.nameOfAssignee,
        // addressOfAssignee: data.addressOfAssignee,
        // offerAmount: data.offerAmount,
        // offerAmountInLetter: data.offerAmountInLetter,
        // currency: data.currency,
        lots: data.lots,
        detail: data.detail,
        createdAt: operationDate,
        lastUpdatedAt: operationDate,
        publicationDate: stringToFullDate(`${data.publicationDate} 00:00:00`),
        method: data.method,
        delay: data.delay,
        limitDate: getLimitDateOfProcurement(data.publicationDate, data.delay),
      };
      await this.dataServices.provisional_notice_award.create(
        newProvisionalNoticeAward,
      );
      return succeed({
        code: HttpStatus.CREATED,
        data: newProvisionalNoticeAward,
      });
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
      const publicationStartDate = filter.publicationStartDate
        ? stringToDate(filter.publicationStartDate)
        : null;
      const publicationEndDate = filter.publicationEndDate
        ? stringToDate(filter.publicationEndDate)
        : null;

      const result = await this.dataServices.provisional_notice_award.list({
        limit: filter.limit,
        skip,
        searchTerm: filter.searchTerm,
        publicationEndDate,
        publicationStartDate,
        types: filter.types,
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
      const aware_notices = result.flatMap((i) => ({
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
      throw new HttpException(
        `Error while getting procurements plans list. Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(code: string, data: UpdateAwareNoticeDto): Promise<Result> {
    try {
      const aware_notice =
        await this.dataServices.provisional_notice_award.findOne(code, '-__v');
      if (!aware_notice) {
        return fail({
          code: HttpStatus.NOT_FOUND,
          error: 'Not found',
        });
      }
      const operationDate = new Date();
      const updateValue = {
        ref: data.ref || aware_notice.ref,
        authority: data.authority || aware_notice.authority,
        name: data.name || aware_notice.name,
        type: data.type || aware_notice.type,
        publicationLocation:
          data.publicationLocation || aware_notice.publicationLocation,
        receivedOffers: data.receivedOffers || aware_notice.receivedOffers,
        lots: data.lots || aware_notice.lots,
        detail: data.detail || aware_notice.detail,
        lastUpdatedAt: operationDate,
        publicationDate: data.publicationDate
          ? stringToFullDate(`${data.publicationDate} 00:00:00`)
          : aware_notice.publicationDate,
        method: data.method || aware_notice.method,
        delay: data.delay || aware_notice.delay,
        limitDate:
          data.publicationDate && data.delay
            ? getLimitDateOfProcurement(data.publicationDate, data.delay)
            : aware_notice.limitDate,
        ...(data.isDeleted !== null &&
          data.isDeleted !== undefined && {
            isDeleted: data.isDeleted,
          }),
      };

      await this.dataServices.provisional_notice_award.update(
        code,
        updateValue,
      );
      return succeed({
        code: HttpStatus.OK,
        data: {
          ...updateValue,
          code,
        },
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        `Error while updating aware notice. Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
