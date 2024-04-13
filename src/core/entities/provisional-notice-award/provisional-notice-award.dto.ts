import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UserCodeValidator } from 'src/features/users/users.helper';
import { PaginationDto } from '../shared/shared.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ENoticeAwardType } from 'src/features/provisional-notice-award/provisional-notice-award.helper';

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
  receivedOffers: number;

  @Type(() => Number)
  @IsNumber()
  offerAmount: number;

  @IsNotEmpty({
    message: 'offer amount in letter of notice award is required.',
  })
  @IsString()
  offerAmountInLetter: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  detail: string;
}

export class ProvisionalNoticeAwardListingDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;
}
