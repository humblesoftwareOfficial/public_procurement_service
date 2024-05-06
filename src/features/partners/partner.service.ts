import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { codeGenerator } from 'src/config/code-generator';
import { Result, fail, succeed } from 'src/config/http-response';
import { NewPartnerDto, PartnersListingDto, UpdatePartnerDto } from 'src/core/entities/partners/partner.dto';
import { Partner } from 'src/core/entities/partners/partner.entity';
import { IGenericDataServices } from 'src/core/generics/generic-data.services';

@Injectable()
export class PartnerService {
  constructor(private dataServices: IGenericDataServices) {}

  async create(data: NewPartnerDto): Promise<Result> {
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
      const newPartner: Partner = {
        code: codeGenerator('PAR'),
        name: data.name,
        url: data.url,
        image: data.image,
      };
      await this.dataServices.partners.create(newPartner);
      return succeed({
        code: HttpStatus.CREATED,
        data: {
          ...newPartner,
        },
      });
    } catch (error) {
        console.log({ error })
      throw new HttpException(
        `Error while creating new Partner. Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async list(filter: PartnersListingDto): Promise<Result> {
    try {
      const skip = (filter.page - 1) * filter.limit;
      const result = await this.dataServices.partners.list({
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
            partners: [],
          },
        });
      }
      const total = result[0].total;
      const partners = result.flatMap(i => ({
        ...i,
        total: undefined,
      }));

      return succeed({
        code: HttpStatus.OK,
        message: '',
        data: { total, partners },
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while getting partners list. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(code: string, data: UpdatePartnerDto): Promise<Result> {
    try {
      const partner = await this.dataServices.partners.findOne(code, '-__v');
      if (!partner) {
        return fail({
          code: HttpStatus.NOT_FOUND,
          error: 'Not found'
        });
      }
      const updateValue = {
        name: data.name || partner.name,
        image: data.image || partner.image,
        url: data.url || partner.url,
        ...(data.isDeleted !== null && data.isDeleted !== undefined && {
          isDeleted: data.isDeleted,
        })
      }
      await this.dataServices.partners.update(code, updateValue);
      return succeed({
        code: HttpStatus.OK,
        data: {
          ...updateValue,
          code,
        }
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while updating partner. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
