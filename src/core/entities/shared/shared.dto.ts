import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsString, Min, Validate } from 'class-validator';
import { ArrayGeneralNoticesCodesValidator } from 'src/features/general-notice/general-notice.helper';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;
}

export class NewsletterGeneralNoticeDto {
  @IsArray()
  @Validate(ArrayGeneralNoticesCodesValidator)
  data: string[];

  @IsNotEmpty({ message: 'Title of newsletter is required.' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Description of newsletter is required.' })
  @IsString()
  description: string;
}
