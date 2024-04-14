import {
  IsArray,
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
import { IsValidDate } from 'src/utils/shared.helper';

export class NewProcurementPlanDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @IsNotEmpty({ message: 'Authority of procurement is required.' })
  @IsString()
  authority: string;

  @IsNotEmpty({ message: 'Ref of procurement is required.' })
  @IsString()
  ref: string;

  @IsNotEmpty({ message: 'Method of procurement is required.' })
  @IsString()
  method: string;

  @IsNotEmpty({ message: 'Realization of procurement is required.' })
  @IsString()
  realization: string;

  @IsNotEmpty({ message: 'Type of procurement cannot be empty.' })
  @IsEnum(EProcurementType, {
    message: 'Type of procurement cannot be empty!',
  })
  type: EProcurementType;

  @IsNotEmpty({ message: 'launch date of procurement is required.' })
  @IsString()
  launchDate: string;

  @IsNotEmpty({ message: 'grant date of procurement is required.' })
  @IsString()
  grantDate: string;
}

export class ProcurementPlanListingDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Validate(IsValidDate)
  launchStartDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Validate(IsValidDate)
  launchEndDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Validate(IsValidDate)
  grantStartDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Validate(IsValidDate)
  grantEndDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsEnum(EProcurementType, { each: true })
  types: EProcurementType[];
}
