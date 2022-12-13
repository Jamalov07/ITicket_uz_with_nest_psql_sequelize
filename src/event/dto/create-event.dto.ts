import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  photo: string;
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
  event_type_id: number;
  @IsNotEmpty()
  @IsNumber()
  human_category_id: number;
  @IsNotEmpty()
  @IsNumber()
  venue_id: number;
  @IsNotEmpty()
  @IsNumber()
  lang_id: number;
  @IsNotEmpty()
  @IsDateString()
  release_date: Date;
}
