import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { codeGenerator } from 'src/config/code-generator';
import { Result, fail, succeed } from 'src/config/http-response';
import { EventsListingDto, NewEventDto, UpdateEventDto } from 'src/core/entities/event/event.dto';
import { Event } from 'src/core/entities/event/event.entity';
import { IGenericDataServices } from 'src/core/generics/generic-data.services';

@Injectable()
export class EventsService {
  constructor(private dataServices: IGenericDataServices) {}

  async create(data: NewEventDto): Promise<Result> {
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
      const newEvent: Event = {
        code: codeGenerator('EVE'),
        title: data.title,
        description: data.description,
        image: data.image,
        date: data.date,
      };
      await this.dataServices.events.create(newEvent);
      return succeed({
        code: HttpStatus.CREATED,
        data: {
          ...newEvent,
        },
      });
    } catch (error) {
        console.log({ error })
      throw new HttpException(
        `Error while creating new event. Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async list(filter: EventsListingDto): Promise<Result> {
    try {
      const skip = (filter.page - 1) * filter.limit;
      const result = await this.dataServices.events.list({
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
            events: [],
          },
        });
      }
      const total = result[0].total;
      const events = result.flatMap(i => ({
        ...i,
        total: undefined,
      }));

      return succeed({
        code: HttpStatus.OK,
        message: '',
        data: { total, events },
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while getting events list. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(code: string, data: UpdateEventDto): Promise<Result> {
    try {
      const event = await this.dataServices.events.findOne(code, '-__v');
      if (!event) {
        return fail({
          code: HttpStatus.NOT_FOUND,
          error: 'Not found'
        })
      }
      const updateValue = {
        title: data.title || event.title,
        description: data.description || event.description,
        date: data.date || event.date,
        ...(data.isDeleted !== null && data.isDeleted !== undefined && {
          isDeleted: data.isDeleted,
        })
      }
      await this.dataServices.events.update(code, updateValue);
      return succeed({
        code: HttpStatus.OK,
        data: {
          ...updateValue,
          code,
        }
      });
    } catch (error) {
      console.log({ error });
      throw new HttpException(`Error while updating event. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(code: string): Promise<Result> {
    try {
      const event = await this.dataServices.events.findOne(code, '-_id');
      if (!event) {
        return fail({
          code: HttpStatus.NOT_FOUND,
          message: 'Not found',
          error: 'Not found!',
        });
      }
      return succeed({
        code: HttpStatus.OK,
        data: event,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Error while getting event infos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
