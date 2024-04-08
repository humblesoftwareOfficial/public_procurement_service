import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NewUserRegisteringDto {
  @IsNotEmpty({ message: 'User first name is required.' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'User last name is required.' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'User email is required. ' })
  @IsEmail({}, { message: 'Invalid User email.' })
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone: string;

  @IsNotEmpty({ message: 'User password is required.' })
  @IsString()
  password: string;
}

export class UserLoginDto {
  @IsNotEmpty({ message: 'User email is required. ' })
  @IsEmail({}, { message: 'Invalid User email.' })
  email: string;

  @IsNotEmpty({ message: 'User password is required.' })
  @IsString()
  password: string;
}
