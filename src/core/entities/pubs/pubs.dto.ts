import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { UserCodeValidator } from 'src/features/users/users.helper';
import { PaginationDto } from '../shared/shared.dto';
import { PubCodeValidator } from 'src/features/pubs/pubs.helper';

export class NewPubDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @IsNotEmpty({ message: 'Pub name is required.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Pub image is required.' })
  @IsString()
  image: string;

  @IsNotEmpty({ message: 'Pub url is required.' })
  @IsString()
  url: string;
}

export class PubsListingDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;


  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isOnNewsletter?: boolean;
}

export class UpdatePubDto {
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

export class AddRemovePubOnNewsLetter {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @IsNotEmpty({ message: 'Pub is required' })
  @Validate(PubCodeValidator)
  pub: string;

  @IsBoolean()
  isOnNewsletter: boolean;
}

export class RemovePubOnNewsLetter {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @IsNotEmpty({ message: 'Pub is required' })
  @Validate(PubCodeValidator)
  pub: string;
}