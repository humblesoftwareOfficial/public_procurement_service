import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { codeGenerator } from 'src/config/code-generator';
import { Result, fail, succeed } from 'src/config/http-response';
import { NewPubDto, PubsListingDto, UpdatePubDto } from 'src/core/entities/pubs/pubs.dto';
import { Pubs } from 'src/core/entities/pubs/pubs.entity';
import { IGenericDataServices } from 'src/core/generics/generic-data.services';

@Injectable()
export class PubsService {
  constructor(private dataServices: IGenericDataServices) {}

  async create(data: NewPubDto): Promise<Result> {
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
      const newPub: Pubs = {
        code: codeGenerator('PUB'),
        name: data.name,
        url: data.url,
        image: data.image,
      };
      await this.dataServices.pubs.create(newPub);
      return succeed({
        code: HttpStatus.CREATED,
        data: {
          ...newPub,
        },
      });
    } catch (error) {
        console.log({ error })
      throw new HttpException(
        `Error while creating new pub. Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async list(filter: PubsListingDto): Promise<Result> {
    try {
      const skip = (filter.page - 1) * filter.limit;
      const result = await this.dataServices.pubs.list({
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
            pubs: [],
          },
        });
      }
      const total = result[0].total;
      const pubs = result.flatMap(i => ({
        ...i,
        total: undefined,
      }));

      return succeed({
        code: HttpStatus.OK,
        message: '',
        data: { total, pubs },
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while getting pubs list. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(code: string, data: UpdatePubDto): Promise<Result> {
    try {
      const pub = await this.dataServices.pubs.findOne(code, '-__v');
      if (!pub) {
        return fail({
          code: HttpStatus.NOT_FOUND,
          error: 'Not found'
        });
      }
      const updateValue = {
        name: data.name || pub.name,
        image: data.image || pub.image,
        url: data.url || pub.url,
        ...(data.isDeleted !== null && data.isDeleted !== undefined && {
          isDeleted: data.isDeleted,
        })
      }
      await this.dataServices.pubs.update(code, updateValue);
      return succeed({
        code: HttpStatus.OK,
        data: {
          ...updateValue,
          code,
        }
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while updating pub. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
