import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../authentication/jwt.auth.guard";
import { User } from "src/core/entities/users/user.entity";
import { NewUserRegisteringDto, UserLoginDto } from "src/core/entities/users/user.dto";

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
}