import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { codeGenerator } from 'src/config/code-generator';
import { Result, fail, succeed } from 'src/config/http-response';
import { BusinessOpportunitiesListingDto, NewBusinessOpportunityDto, UpdateBusinessOpportunityDto } from 'src/core/entities/business-opportunities/business-opportunities.dto';
import { BusinessOpportunity } from 'src/core/entities/business-opportunities/business-opportunities.entity';
import { IGenericDataServices } from 'src/core/generics/generic-data.services';

@Injectable()
export class BusinessOpportunityService {
  constructor(private dataServices: IGenericDataServices) {}

  async create(data: NewBusinessOpportunityDto): Promise<Result> {
    try {
      const user = await this.dataServices.users.findOne(data.user, '-__v');
      if (!user) {
        return fail({
          error: 'User not found!',
          code: HttpStatus.NOT_FOUND,
          message: 'User not found!',
        });
      }
      if (!user.isAdmin) {
        console.log({ user });
        return fail({
          error: 'Access denied!',
          code: HttpStatus.UNAUTHORIZED,
          message: 'You cannot do this action!',
        });
      }
      const operationDate = new Date();
      const newOpportunity: BusinessOpportunity = {
        code: codeGenerator('BOP'),
        title: data.title,
        description: data.description,
        image: data.image,
        text: data.text,
        createdAt: operationDate,
        lastUpdatedAt: operationDate
      };
      await this.dataServices.business_opportunities.create(newOpportunity);
      return succeed({
        code: HttpStatus.CREATED,
        data: {
          ...newOpportunity,
        },
      });
    } catch (error) {
        console.log({ error })
      throw new HttpException(
        `Error while creating new opportunity. Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async list(filter: BusinessOpportunitiesListingDto): Promise<Result> {
    try {
      const skip = (filter.page - 1) * filter.limit;
      const result = await this.dataServices.business_opportunities.list({
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
            opportunities: [],
          },
        });
      }
      const total = result[0].total;
      const opportunities = result.flatMap(i => ({
        ...i,
        total: undefined,
      }));

      return succeed({
        code: HttpStatus.OK,
        message: '',
        data: { total, opportunities },
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while getting opportunities list. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(code: string, data: UpdateBusinessOpportunityDto): Promise<Result> {
    try {
      const opportunity = await this.dataServices.business_opportunities.findOne(code, '-__v');
      if (!opportunity) {
        return fail({
          code: HttpStatus.NOT_FOUND,
          error: 'Not found'
        })
      }
      const updateValue = {
        title: data.title || opportunity.title,
        // title: data.title || opportunity.ima,
        description: data.description || opportunity.description,
        text: data.text || opportunity.text,
        ...(data.isDeleted !== null && data.isDeleted !== undefined && {
          isDeleted: data.isDeleted,
        })
      }
      await this.dataServices.business_opportunities.update(code, updateValue);
      return succeed({
        code: HttpStatus.OK,
        data: {
          ...updateValue,
          code,
        }
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while updating opportunity. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
