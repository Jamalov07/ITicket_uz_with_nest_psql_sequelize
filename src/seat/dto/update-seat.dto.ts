// import { PartialType } from '@nestjs/mapped-types';
// import { CreateSeatDto } from './create-seat.dto';

// export class UpdateSeatDto extends PartialType(CreateSeatDto) {}


import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateSeatDto {
  @IsOptional()
  @IsNumber()
  sector?: number;
  @IsOptional()
  @IsNumber()
  row_number?: number;
  @IsOptional()
  @IsNumber()
  number?: number;
  @IsOptional()
  @IsNumber()
  venue_id?: number;
  @IsOptional()
  @IsNumber()
  seat_type_id?: number;
  @IsOptional()
  @IsString()
  location_in_schema?: string;
}
