import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsNumber()
  cart_id: number;
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
  @IsNotEmpty()
  @IsDateString()
  finished: Date;
  @IsNotEmpty()
  @IsNumber()
  payment_method_id: number;
  @IsNotEmpty()
  @IsNumber()
  delivery_method_id: number;
  @IsNotEmpty()
  @IsNumber()
  discount_coupon_id: number;
  @IsNotEmpty()
  @IsNumber()
  status_id: number;
}
