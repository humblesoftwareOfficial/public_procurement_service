import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Result, succeed } from './config/http-response';
import { IGenericDataServices } from './core/generics/generic-data.services';

@Injectable()
export class AppService {
  constructor(private dataServices: IGenericDataServices) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getRecapData(): Promise<Result> {
    try {
      const [procurement_plans, provisional_notice_awards] = await Promise.all([
        this.dataServices.procurement_plans.count({ isDeleted: false }),
        this.dataServices.provisional_notice_award.count({ isDeleted: false }),
      ]);
      return succeed({
        code: HttpStatus.OK,
        data: {
          procurement_plans,
          provisional_notice_awards,
        }
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while getting recap data. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
