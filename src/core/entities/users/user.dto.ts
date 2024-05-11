import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { PaginationDto } from '../shared/shared.dto';
import { UserCodeValidator } from 'src/features/users/users.helper';

export class NewUserRegisteringDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'User first name is required.' })
  @IsString()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'User password is required.' })
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isForNewsLetter: boolean;
}

export class UserLoginDto {
  @IsNotEmpty({ message: 'User email is required. ' })
  @IsEmail({}, { message: 'Invalid User email.' })
  email: string;

  @IsNotEmpty({ message: 'User password is required.' })
  @IsString()
  password: string;
}

export class UsersListingDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;
}

export class UpdateUserDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}