import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { codeGenerator } from 'src/config/code-generator';
import { Result, succeed } from 'src/config/http-response';
import {
  GeneralNoticeListingDto,
  NewGeneralNoticeDto,
} from 'src/core/entities/general-notice/general-notice.dto';
import { GeneralNotice } from 'src/core/entities/general-notice/general-notice.entity';

import { IGenericDataServices } from 'src/core/generics/generic-data.services';
import { stringToFullDate } from 'src/utils';

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
        type: data.type,
        publicationDate: stringToFullDate(`${data.publicationDate} 00:00:00`),
        publicationNumber: data.publicationNumber,
        publicationRef: data.publicationRef,
        createdAt: operationDate,
        lastUpdatedAt: operationDate,
        duration: data.duration,
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
      const result = await this.dataServices.general_notice.list({
        limit: filter.limit,
        skip,
        searchTerm: filter.searchTerm,
      });
      if (!result?.length) {
        return succeed({
          code: HttpStatus.OK,
          message: '',
          data: {
            total: 0,
            procurements_plans: [],
          },
        });
      }
      const total = result[0].total;
      const procurements_plans = result.flatMap((i) => ({
        ...i,
        total: undefined,
      }));
      return succeed({
        code: HttpStatus.OK,
        message: '',
        data: { total, procurements_plans },
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        `Error while getting procurements plans list. Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
