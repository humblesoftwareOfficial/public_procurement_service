import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { codeGenerator } from 'src/config/code-generator';
import { Result, succeed } from 'src/config/http-response';
import {
  GeneralNoticeListingDto,
  NewGeneralNoticeDto,
  UpdateGeneralNoticeDto,
} from 'src/core/entities/general-notice/general-notice.dto';
import { GeneralNotice } from 'src/core/entities/general-notice/general-notice.entity';

import { IGenericDataServices } from 'src/core/generics/generic-data.services';
import { stringToDate, stringToFullDate } from 'src/utils';
import { getLimitDateOfProcurement } from './general-notice.helper';

@Injectable()
export class GeneralNoticeService {
  constructor(private dataServices: IGenericDataServices) {}

  async create(data: NewGeneralNoticeDto): Promise<Result> {
    try {
      const operationDate = new Date();
      const newGeneralNotice: GeneralNotice = {
        code: codeGenerator('GNT'),
        authority: data.authority,
        ref: data.ref,
        method: data.method,
        realization: data.realization,
        description: data.description || "",
        type: data.type,
        publicationDate: stringToFullDate(`${data.publicationDate} 00:00:00`),
        publicationNumber: data.publicationNumber,
        publicationRef: data.publicationRef,
        createdAt: operationDate,
        lastUpdatedAt: operationDate,
        duration: data.duration,
        technicalCapacity: data.technicalCapacity,
        financialCapacity: data.financialCapacity,
        experience: data.experience,
        isDeferralNotice: data.isDeferralNotice,
        referralDate: data.referralDate ? stringToFullDate(`${data.referralDate} 00:00:00`): null,
        limitDate: data.limitDate ? stringToFullDate(`${data.limitDate} 00:00:00`) : null,
      };

      await this.dataServices.general_notice.create(newGeneralNotice);
      return succeed({
        code: HttpStatus.CREATED,
        data: newGeneralNotice,
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        `Error while creating new procurement plan.Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async list(filter: GeneralNoticeListingDto): Promise<Result> {
    try {
      const skip = (filter.page - 1) * filter.limit;
      const publicationStartDate = filter.publicationStartDate ? stringToDate(filter.publicationStartDate) : null;
      const publicationEndDate = filter.publicationEndDate ? stringToDate(filter.publicationEndDate) : null;

      const limitStartDate = filter.limitStartDate ? stringToDate(filter.limitStartDate) : null;
      const limitEndDate = filter.limitEndDate ? stringToDate(filter.limitEndDate) : null;

      const result = await this.dataServices.general_notice.list({
        limit: filter.limit,
        skip,
        searchTerm: filter.searchTerm,
        publicationStartDate,
        publicationEndDate,
        limitStartDate,
        limitEndDate,
        types: filter.types,
      });
      if (!result?.length) {
        return succeed({
          code: HttpStatus.OK,
          message: '',
          data: {
            total: 0,
            general_notices: [],
          },
        });
      }
      const total = result[0].total;
      const general_notices = result.flatMap((i) => ({
        ...i,
        total: undefined,
      }));
      return succeed({
        code: HttpStatus.OK,
        message: '',
        data: { total, general_notices },
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        `Error while getting procurements plans list. Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(code: string, data: UpdateGeneralNoticeDto): Promise<Result> {
    try {
      const general_notice = await this.dataServices.general_notice.findOne(code, '-__v');
      if (!general_notice) {
        return fail({
          code: HttpStatus.NOT_FOUND,
          error: 'Not found'
        })
      }
      const operationDate = new Date();
      const updateValue = {
        authority: data.authority || general_notice.authority,
        ref: data.ref || general_notice.ref,
        method: data.method || general_notice.method,
        realization: data.realization || general_notice.realization,
        description: data.description || general_notice.description,
        type: data.type || general_notice.type,

        publicationDate: data.publicationDate ? (
          stringToFullDate(`${data.publicationDate} 00:00:00`)
        ): general_notice.publicationDate,

        publicationNumber: data.publicationNumber || general_notice.publicationNumber,
        publicationRef: data.publicationRef || general_notice.publicationRef,
        lastUpdatedAt: operationDate,
        duration: data.duration || general_notice.duration,
        technicalCapacity: data.technicalCapacity || general_notice.technicalCapacity,
        financialCapacity: data.financialCapacity || general_notice.financialCapacity,
        experience: data.experience || general_notice.experience,
        limitDate: data.limitDate ? stringToFullDate(`${data.limitDate} 00:00:00`) : general_notice.limitDate,

        ...(data.isDeleted !== null && data.isDeleted !== undefined && {
          isDeleted: data.isDeleted,
        }),
        ...(data.isDeferralNotice !== null && data.isDeferralNotice !== undefined && {
          isDeferralNotice: data.isDeferralNotice,
          referralDate: !data.isDeferralNotice ? null : (
            data.referralDate ? stringToFullDate(`${data.referralDate} 00:00:00`): general_notice.referralDate
          ),
        }),
      };
      await this.dataServices.general_notice.update(code, updateValue);
      return succeed({
        code: HttpStatus.OK,
        data: {
          ...updateValue,
          code,
        }
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while updating procurement plan. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
