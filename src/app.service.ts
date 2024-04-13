import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Result, succeed } from './config/http-response';
import { IGenericDataServices } from './core/generics/generic-data.services';
import { ENoticeAwardType } from './features/provisional-notice-award/provisional-notice-award.helper';
import { EProcurementType } from './features/procurement-plan/procurement-plan.helper';

@Injectable()
export class AppService {
  constructor(private dataServices: IGenericDataServices) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getRecapData(): Promise<Result> {
    try {
      const [
        procurement_plans,
        provisional_notice_awards,
        definitive_notice_awards,
        general_notices,
        procurement_plans_fournitures,
        procurement_plans_travaux,
        procurement_plans_prestations,
        procurement_plans_services,
      ] = await Promise.all([
        this.dataServices.procurement_plans.count({ isDeleted: false }),
        this.dataServices.provisional_notice_award.count({
          isDeleted: false,
          type: ENoticeAwardType.PROVISIONAL,
        }),
        this.dataServices.provisional_notice_award.count({
          isDeleted: false,
          type: ENoticeAwardType.DEFINITIVE,
        }),
        this.dataServices.general_notice.count({ isDeleted: false }),
        this.dataServices.procurement_plans.count({
          isDeleted: false,
          type: EProcurementType.FOURNITURES,
        }),
        this.dataServices.procurement_plans.count({
          isDeleted: false,
          type: EProcurementType.TRAVAUX,
        }),
        this.dataServices.procurement_plans.count({
          isDeleted: false,
          type: EProcurementType.PRESTATIONS_INTELLECTUELLES,
        }),
        this.dataServices.procurement_plans.count({
          isDeleted: false,
          type: EProcurementType.SERVICES_COURANTS,
        }),
      ]);
      return succeed({
        code: HttpStatus.OK,
        data: {
          procurement_plans,
          provisional_notice_awards,
          definitive_notice_awards,
          general_notices,
          procurement_plans_fournitures,
          procurement_plans_travaux,
          procurement_plans_prestations,
          procurement_plans_services,
        },
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        `Error while getting recap data. Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
