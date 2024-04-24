import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { UserCodeValidator } from 'src/features/users/users.helper';
import { PaginationDto } from '../shared/shared.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ENoticeAwardType } from 'src/features/provisional-notice-award/provisional-notice-award.helper';
import { IsValidDate } from 'src/utils/shared.helper';


export class LotDto {
  @Type(() => Number)
  @IsNumber()
  number: string;

  @IsNotEmpty({ message: 'Title of notice award is required.' })
  @IsString()
  title: string;

  @IsNotEmpty({
    message: 'name of Assignee of notice award is required.',
  })
  @IsString()
  nameOfAssignee: string;

  @IsNotEmpty({
    message: 'address of Assignee of notice award is required.',
  })
  @IsString()
  addressOfAssignee: string;

  @Type(() => Number)
  @IsNumber()
  offerAmount: number;

  @IsNotEmpty({
    message: 'offer amount in letter of notice award is required.',
  })
  @IsString()
  offerAmountInLetter: string;

  @IsNotEmpty({
    message: 'currency of notice award is required.',
  })
  @IsString()
  currency: string;
}

export class NewProvisionalNoticeAwardDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @IsNotEmpty({ message: 'Ref of notice award is required.' })
  @IsString()
  ref: string;

  @IsNotEmpty({ message: 'Authority of notice award is required.' })
  @IsString()
  authority: string;

  @IsNotEmpty({ message: 'Name of notice award is required.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Type of notice award cannot be empty.' })
  @IsEnum(ENoticeAwardType, {
    message: 'Type of notice award cannot be empty!',
  })
  type: ENoticeAwardType;

  @IsNotEmpty({
    message: 'publication date of notice award is required.',
  })
  @IsString()
  publicationDate: string;

  @IsNotEmpty({
    message: 'publication location of notice award is required.',
  })
  @IsString()
  publicationLocation: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  detail: string;

  @Type(() => Number)
  @IsNumber()
  delay: number;

  @IsNotEmpty({ message: 'Method of aware notice is required.' })
  @IsString()
  method: string;

  @Type(() => Number)
  @IsNumber()
  receivedOffers: number;

  @IsArray({
    message: 'Lots must be a valid array of LotDto.',
  })
  @ValidateNested({ each: true })
  @Type(() => LotDto)
  lots: LotDto[];
}

export class ProvisionalNoticeAwardListingDto extends PaginationDto {
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
  @IsArray()
  @IsEnum(ENoticeAwardType, { each: true })
  types: ENoticeAwardType[];
}
