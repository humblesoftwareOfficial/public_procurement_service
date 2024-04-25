import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { EProcurementType } from 'src/features/procurement-plan/procurement-plan.helper';
import { UserCodeValidator } from 'src/features/users/users.helper';
import { PaginationDto } from '../shared/shared.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsValidDate } from 'src/utils/shared.helper';

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

  @ApiProperty({ required: false })
  @IsOptional({ })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Type of general notice cannot be empty.' })
  @IsEnum(EProcurementType, {
    message: 'Type of general notice cannot be empty!',
  })
  type: EProcurementType;

  @IsNotEmpty({ message: 'publication date of general notice is required.' })
  @IsString()
  publicationDate: string;

  @IsNotEmpty({ message: 'publication ref of general notice is required.' })
  @IsString()
  publicationRef: string;

  @IsNotEmpty({ message: 'publication number of general notice is required.' })
  @IsString()
  publicationNumber: string;

  @Type(() => Number)
  @IsNumber()
  duration: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Method of general notice is required.' })
  @IsString()
  financialCapacity: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Method of general notice is required.' })
  @IsString()
  technicalCapacity: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Method of general notice is required.' })
  @IsString()
  experience: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDeferralNotice: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @Validate(IsValidDate)
  referralDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Validate(IsValidDate)
  limitDate: string;
}

export class GeneralNoticeListingDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Validate(IsValidDate)
  publicationStartDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Validate(IsValidDate)
  publicationEndDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Validate(IsValidDate)
  limitStartDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Validate(IsValidDate)
  limitEndDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsEnum(EProcurementType, { each: true })
  types: EProcurementType[];
}
