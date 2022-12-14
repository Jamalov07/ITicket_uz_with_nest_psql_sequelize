import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  photo?: string;
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;
  @IsNotEmpty()
  @IsString()
  start_time: string;
  @IsNotEmpty()
  @IsDateString()
  finish_date: Date;
  @IsNotEmpty()
  @IsString()
  finish_time: string;
  @IsNotEmpty()
  @IsString()
  info: string;
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  event_type_id: number;
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  human_category_id: number;
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  venue_id: number;
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  lang_id: number;
  @IsNotEmpty()
  @IsDateString()
  release_date: Date;
}
