// import { PartialType } from '@nestjs/mapped-types';
// import { CreateBookingDto } from './create-booking.dto';

// export class UpdateBookingDto extends PartialType(CreateBookingDto) {}

import { IsDateString, IsOptional, IsNumber } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsNumber()
  cart_id?: number;
  @IsOptional()
  @IsDateString()
  createdAt?: Date;
  @IsOptional()
  @IsDateString()
  finished?: Date;
  @IsOptional()
  @IsNumber()
  payment_method_id?: number;
  @IsOptional()
  @IsNumber()
  delivery_method_id?: number;
  @IsOptional()
  @IsNumber()
  discount_coupon_id?: number;
  @IsOptional()
  @IsNumber()
  status_id?: number;
}
