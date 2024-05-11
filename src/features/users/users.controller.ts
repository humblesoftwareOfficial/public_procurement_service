import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt.auth.guard';
import { User } from 'src/core/entities/users/user.entity';
import {
  NewUserRegisteringDto,
  UpdateUserDto,
  UserLoginDto,
  UsersListingDto,
} from 'src/core/entities/users/user.dto';
import { isValidUserCode } from './users.helper';
import { InvalidCodeException } from 'src/core/exceptions/invalid-code.exception';

@ApiTags('Users')
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @ApiOkResponse({
    description: '',
    type: User,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('register')
  async register(@Body() value: NewUserRegisteringDto) {
    return this.service.register(value);
  }

  @ApiOkResponse({
    description: '',
    type: User,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('login')
  async login(@Body() value: UserLoginDto) {
    return this.service.login(value);
  }

  @ApiOkResponse({
    description: '',
    type: User,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @Post('list')
  async list(@Body() value: UsersListingDto) {
    return this.service.list(value);
  }

  @ApiOkResponse({
    description: '',
    type: User,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':code')
  async update(@Param('code') code: string, @Body() value: UpdateUserDto) {
    if (!isValidUserCode(code)) {
      throw new InvalidCodeException('User code is incorrect!');
    }
    return this.service.update(code, value);
  }
}
