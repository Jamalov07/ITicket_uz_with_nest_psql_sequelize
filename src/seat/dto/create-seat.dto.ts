import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSeatDto {
  @IsNotEmpty()
  @IsNumber()
  sector: number;
  @IsNotEmpty()
  @IsNumber()
  row_number: number;
  @IsNotEmpty()
  @IsNumber()
  number: number;
  @IsNotEmpty()
  @IsNumber()
  venue_id: number;
  @IsNotEmpty()
  @IsNumber()
  seat_type_id: number;
  @IsNotEmpty()
  @IsString()
  location_in_schema: string;
}
