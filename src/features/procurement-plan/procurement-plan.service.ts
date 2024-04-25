import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { codeGenerator } from 'src/config/code-generator';
import { Result, succeed } from 'src/config/http-response';
import { NewProcurementPlanDto, ProcurementPlanListingDto, UpdateProcurementPlanDto } from 'src/core/entities/procurement-plan/procurement-plan.dto';
import { ProcurementPlan } from 'src/core/entities/procurement-plan/procurement-plan.entity';
import { IGenericDataServices } from 'src/core/generics/generic-data.services';
import { stringToDate, stringToFullDate } from 'src/utils';

@Injectable()
export class ProcurementPlanService {
  constructor(private dataServices: IGenericDataServices) {}

  async create(data: NewProcurementPlanDto): Promise<Result> {
    try {
      const operationDate = new Date();
      const newProcurement: ProcurementPlan = {
        code: codeGenerator('PPL'),
        authority: data.authority,
        ref: data.ref,
        method: data.method,
        realization: data.realization,
        type: data.type,
        createdAt: operationDate,
        lastUpdatedAt: operationDate,
        grantDate: stringToFullDate(`${data.grantDate} 23:59:59`),
        launchDate: stringToFullDate(`${data.launchDate} 00:00:00`),
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

      const launchStartDate = filter.launchStartDate ? stringToDate(filter.launchStartDate) : null;
      const launchEndDate = filter.launchEndDate ? stringToDate(filter.launchEndDate) : null;

      const grantStartDate = filter.grantStartDate ? stringToDate(filter.grantStartDate) : null;
      const grantEndDate = filter.grantEndDate ? stringToDate(filter.grantEndDate) : null;

      const result = await this.dataServices.procurement_plans.list({
        limit: filter.limit,
        skip,
        searchTerm: filter.searchTerm,
        launchStartDate,
        launchEndDate,
        grantStartDate,
        grantEndDate,
        types: filter.types,
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

  async update(code: string, data: UpdateProcurementPlanDto): Promise<Result> {
    try {
      const procurement = await this.dataServices.procurement_plans.findOne(code, '-__v');
      if (!procurement) {
        return fail({
          code: HttpStatus.NOT_FOUND,
          error: 'Not found'
        })
      }
      const operationDate = new Date();
      const updateValue = {
        authority: data.authority || procurement.authority,
        method: data.method || procurement.method,
        realization: data.realization || procurement.realization,
        type: data.type || procurement.type,
        ref: data.ref || procurement.ref,
        grantDate: data.grantDate ? stringToFullDate(`${data.grantDate} 23:59:59`): procurement.grantDate,
        launchDate: data.launchDate ? stringToFullDate(`${data.launchDate} 00:00:00`) : procurement.launchDate,
        ...(data.isDeleted !== null && data.isDeleted !== undefined && {
          isDeleted: data.isDeleted,
        }),
        lastUpdatedAt: operationDate,
      }
      await this.dataServices.procurement_plans.update(code, updateValue);
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
