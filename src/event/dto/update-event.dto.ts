// import { PartialType } from '@nestjs/mapped-types';
// import { CreateEventDto } from './create-event.dto';

// export class UpdateEventDto extends PartialType(CreateEventDto) {}

import { IsDateString, IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  photo?: string;
  @IsOptional()
  @IsDateString()
  start_date?: Date;
  @IsOptional()
  @IsString()
  start_time?: string;
  @IsOptional()
  @IsDateString()
  finish_date?: Date;
  @IsOptional()
  @IsString()
  finish_time?: string;
  @IsOptional()
  @IsString()
  info?: string;
  @IsOptional()
  @IsNumber()
  event_type_id?: number;
  @IsOptional()
  @IsNumber()
  human_category_id?: number;
  @IsOptional()
  @IsNumber()
  venue_id?: number;
  @IsOptional()
  @IsNumber()
  lang_id?: number;
  @IsOptional()
  @IsDateString()
  release_date?: Date;
}
