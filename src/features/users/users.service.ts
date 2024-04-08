import { HttpService } from '@nestjs/axios';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  codeGenerator,
  generateDefaultPassword,
} from 'src/config/code-generator';
import { Result, fail, succeed } from 'src/config/http-response';
import {
  NewUserRegisteringDto,
  UserLoginDto,
} from 'src/core/entities/users/user.dto';
import { User } from 'src/core/entities/users/user.entity';
import { IGenericDataServices } from 'src/core/generics/generic-data.services';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private dataServices: IGenericDataServices,
    private httpService: HttpService,
    private jwtService: JwtService
  ) {}

  async register(data: NewUserRegisteringDto): Promise<Result> {
    try {
      const operationDate = new Date();
      const salt = await bcrypt.genSalt();
      const password = data.password || generateDefaultPassword();
      const newUser: User = {
        code: codeGenerator('USR'),
        ...data,
        createdAt: operationDate,
        lastUpdatedAt: operationDate,
        password: await bcrypt.hash(password, salt),
      };
      await this.dataServices.users.create(newUser);
      return succeed({
        code: HttpStatus.CREATED,
        message: 'New user successfully created',
        data: newUser,
      });
    } catch (error) {
      if (error?.code === 11000) {
        return fail({
          code: 400,
          message: 'An user with the same email already exists .',
          error: 'Already exist',
        });
      } else {
        throw new HttpException(
          `Error while creating new user. Try again.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async login(data: UserLoginDto): Promise<Result> {
    try {
      const user = await this.dataServices.users.findByEmail(data.email);
      if (!user) {
        return fail({
          error: 'User not found!',
          code: HttpStatus.NOT_FOUND,
          message: "Aucun compte n'est associé à cet email!"
        });
      }
      const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return fail({
        error: 'Incorrect password!',
        code: HttpStatus.BAD_REQUEST,
        message: 'Mot de passe incorrect'
      })
    }
    return succeed({
      code: HttpStatus.OK,
      data: {
        code: user.code,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        ...(user.isAdmin && {
          isAdmin: user.isAdmin
        }),
        access_token: this.jwtService.sign({
          userId: user['_id'],
          code: user.code,
        }),
      }
    });
    } catch (error) {
      throw new HttpException(
        `Error while login user. Try again.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
