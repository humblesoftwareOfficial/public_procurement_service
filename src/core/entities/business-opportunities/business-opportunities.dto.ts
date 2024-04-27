import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { UserCodeValidator } from 'src/features/users/users.helper';
import { PaginationDto } from '../shared/shared.dto';

export class NewBusinessOpportunityDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @IsNotEmpty({ message: 'Business Opportunity title is required.' })
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description: any;

  @ApiProperty({ required: false })
  @IsOptional()
  text: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;
}

export class BusinessOpportunitiesListingDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;

}

export class UpdateBusinessOpportunityDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Business  Opportunity title is required.' })
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  text: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}