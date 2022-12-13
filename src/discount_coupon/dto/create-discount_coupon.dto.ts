import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiscountCouponDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
