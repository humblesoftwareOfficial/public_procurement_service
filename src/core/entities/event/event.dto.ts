import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { UserCodeValidator } from 'src/features/users/users.helper';
import { PaginationDto } from '../shared/shared.dto';
import { EventCodeValidator } from 'src/features/events/events.helper';

export class NewEventDto {
  @IsNotEmpty({ message: 'User is required' })
  @Validate(UserCodeValidator)
  user: string;

  @IsNotEmpty({ message: 'Event title is required.' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Date is required' })
  date: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;
}

export class EventsListingDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;

}

export class UpdateEventDto {
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
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Date is required' })
  date: string;

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