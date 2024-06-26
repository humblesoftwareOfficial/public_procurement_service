import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { EProcurementType } from 'src/features/procurement-plan/procurement-plan.helper';
import { UserCodeValidator } from 'src/features/users/users.helper';
import { PaginationDto } from '../shared/shared.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsValidDate } from 'src/utils/shared.helper';
import { GeneralLotDto } from '../provisional-notice-award/provisional-notice-award.dto';

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray({
    message: 'Lots must be a valid array of GeneralLotDto.',
  })
  @ValidateNested({ each: true })
  @Type(() => GeneralLotDto)
  lots: GeneralLotDto[];

  @ApiProperty({ required: false })
  @IsOptional({ })
  @IsString()
  warrantySubmission: string;

  @ApiProperty({ required: false })
  @IsOptional({ })
  @IsString()
  warrantyGoodExecution: string;

  @ApiProperty({ required: false })
  @IsOptional({ })
  @IsString()
  warrantyDecennial: string;
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

export class UpdateGeneralNoticeDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Authority of general notice is required.' })
  @IsString()
  authority: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Ref of general notice is required.' })
  @IsString()
  ref: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Method of general notice is required.' })
  @IsString()
  method: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Realization of general notice is required.' })
  @IsString()
  realization: string;

  @ApiProperty({ required: false })
  @IsOptional({ })
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Type of general notice cannot be empty.' })
  @IsEnum(EProcurementType, {
    message: 'Type of general notice cannot be empty!',
  })
  type: EProcurementType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'publication date of general notice is required.' })
  @IsString()
  publicationDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'publication ref of general notice is required.' })
  @IsString()
  publicationRef: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'publication number of general notice is required.' })
  @IsString()
  publicationNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray({
    message: 'Lots must be a valid array of LotDto.',
  })
  @ValidateNested({ each: true })
  @Type(() => GeneralLotDto)
  lots: GeneralLotDto[];

  @ApiProperty({ required: false })
  @IsOptional({ })
  @IsString()
  warrantySubmission: string;

  @ApiProperty({ required: false })
  @IsOptional({ })
  @IsString()
  warrantyGoodExecution: string;

  @ApiProperty({ required: false })
  @IsOptional({ })
  @IsString()
  warrantyDecennial: string;
}