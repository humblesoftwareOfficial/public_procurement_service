import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { codeGenerator } from 'src/config/code-generator';
import { Result, succeed } from 'src/config/http-response';
import { NewProcurementPlanDto, ProcurementPlanListingDto } from 'src/core/entities/procurement-plan/procurement-plan.dto';
import { ProcurementPlan } from 'src/core/entities/procurement-plan/procurement-plan.entity';
import { IGenericDataServices } from 'src/core/generics/generic-data.services';
import { stringToFullDate } from 'src/utils';

@Injectable()
export class ProcurementPlanService {
  constructor(private dataServices: IGenericDataServices) {}

  async create(data: NewProcurementPlanDto): Promise<Result> {
    try {
      const operationDate = new Date();
      const newProcurement: ProcurementPlan = {
        code: codeGenerator('PPL'),
        ref: data.ref,
        method: data.method,
        realization: data.realization,
        type: data.type,
        createdAt: operationDate,
        lastUpdatedAt: operationDate,
        grantDate: stringToFullDate(`${data.grantDate} 23:59:59`),
        launchDate: stringToFullDate(`${data.grantDate} 00:00:00`),
      };
      await this.dataServices.procurement_plans.create(newProcurement);
      return succeed({
        code: HttpStatus.CREATED,
        data: newProcurement,
      })
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        `Error while creating new procurement plan.Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async list(filter: ProcurementPlanListingDto): Promise<Result> {
    try {
      const skip = (filter.page - 1) * filter.limit;
      const result = await this.dataServices.procurement_plans.list({
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
      const procurements_plans = result.flatMap(i => ({
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
      throw new HttpException(`Error while getting procurements plans list. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
