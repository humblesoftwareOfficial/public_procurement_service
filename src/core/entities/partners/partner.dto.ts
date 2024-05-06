import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { UserCodeValidator } from 'src/features/users/users.helper';
import { PaginationDto } from '../shared/shared.dto';

export class NewPartnerDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @IsNotEmpty({ message: 'Partner name is required.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Partner image is required.' })
  @IsString()
  image: string;

  @IsNotEmpty({ message: 'Partner url is required.' })
  @IsString()
  url: string;
}

export class PartnersListingDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;

}

export class UpdatePartnerDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  // @IsNotEmpty({ message: 'Event is required' })
  // @Validate(EventCodeValidator)
  // event: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Event title is required.' })
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Date is required' })
  image: string;

  @ApiProperty({ required: false })
  @IsOptional()
  url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}