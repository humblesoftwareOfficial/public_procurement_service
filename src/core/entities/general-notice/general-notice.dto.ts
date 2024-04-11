import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { EProcurementType } from 'src/features/procurement-plan/procurement-plan.helper';
import { UserCodeValidator } from 'src/features/users/users.helper';
import { PaginationDto } from '../shared/shared.dto';
import { ApiProperty } from '@nestjs/swagger';

export class NewGeneralNoticeDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @IsNotEmpty({ message: 'Authority of general notice is required.' })
  @IsString()
  authority: string;

  @IsNotEmpty({ message: 'Ref of general notice is required.' })
  @IsString()
  ref: string;

  @IsNotEmpty({ message: 'Method of general notice is required.' })
  @IsString()
  method: string;

  @IsNotEmpty({ message: 'Realization of general notice is required.' })
  @IsString()
  realization: string;

  @IsNotEmpty({ message: 'Type of general notice cannot be empty.' })
  @IsEnum(EProcurementType, {
    message: 'Type of general notice cannot be empty!',
  })
  type: EProcurementType;

  @IsNotEmpty({ message: 'launch date of general notice is required.' })
  @IsString()
  launchDate: string;

  @IsNotEmpty({ message: 'grant date of general notice is required.' })
  @IsString()
  grantDate: string;

  @IsNotEmpty({ message: 'publication date of general notice is required.' })
  @IsString()
  publicationDate: string;

  @IsNotEmpty({ message: 'publication ref of general notice is required.' })
  @IsString()
  publicationRef: string;

  @IsNotEmpty({ message: 'publication number of general notice is required.' })
  @IsString()
  publicationNumber: string;
}

export class GeneralNoticeListingDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;
}
